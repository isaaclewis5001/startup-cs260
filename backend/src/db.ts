import { MongoClient, ObjectId, WriteError } from "mongodb"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { ActiveGameRecord, GameRecord } from "./model";
import { ActiveGameResponse, GameOutcome } from "./shared/api/model";

export type DBConfig = {
  hostname: string,
  username: string,
  password: string,
  dbname: string,
  jwtSecret: string,
}


export interface DBClient {
  createUser(
    username: string,
    password: string,
    email: string
  ): Promise<string | UsernameDupErr>;
  loginUser(username: string, password: string): Promise<string>;
  logoutUser(token: string): Promise<void>;
  authenticateUser(token: string): Promise<ObjectId | null>;
  fetchGames(): Promise<GameOutcome[]>;
  joinGame(code: string): Promise<ActiveGameResponse | null>;
}

const MONGO_ERR_DUP = 11000;

export class UsernameDupErr extends Object {
  override toString() {
    return "username in use"
  }
}

export class BadLoginErr extends Object {
  override toString() {
    return "bad login"
  }
}

export class MongoDBClient implements DBClient {
  private mongo
  private db
  private users
  private auths
  private games
  private activeGames
  private outcomes
  private jwtSecret
  private outcomesCache: GameOutcome[]
  private outcomesCacheExpiresTime

  constructor(config: DBConfig) {
    const url = `mongodb+srv://${config.username}:${config.password}@${config.hostname}`;
    this.mongo = new MongoClient(url);
    this.db = this.mongo.db(config.dbname);
    
    this.users = this.db.collection("users");
    this.users.createIndex("username", { unique: true });

    this.auths = this.db.collection("auths");
    this.auths.createIndex("userId");
    this.auths.createIndex("token", { unique: true });

    this.games = this.db.collection("games");

    this.activeGames= this.db.collection("activeGames");
    this.activeGames.createIndex("code", {unique: true});

    this.outcomes = this.db.collection("gameOutcomes");
    this.outcomes.createIndex("time")

    this.jwtSecret = config.jwtSecret;

    this.outcomesCache = [];
    this.outcomesCacheExpiresTime = 0;
  }

  async createUser(username: string, password: string, email: string) {
    const hashedPass = await bcrypt.hash(password, 10);
    let insertResult;
    try {
      insertResult = await this.users.insertOne({username, email, password: hashedPass});
    }
    catch (err) {
      if (err instanceof WriteError) {
        if (err.code === MONGO_ERR_DUP) {
          throw new UsernameDupErr();
        }
      }
      throw err;
    }
    return await this.addAuth(insertResult.insertedId);
  }
  
  async loginUser(username: string, password: string) {
    let fetchResult: any;
    fetchResult = await this.users.findOne({username}, {projection: {_id: 1, password: 1}});
    if (fetchResult !== null) {
      let hashedPassword: string = fetchResult.password;
      if (await bcrypt.compare(password, hashedPassword)) {
        return await this.addAuth(fetchResult._id);
      }
    }
    throw new BadLoginErr();
  }

  async logoutUser(token: string): Promise<void> {
    try {
      await this.auths.deleteOne({token})
    }
    catch (err) {
      // ignore
    }
  }

  async authenticateUser(token: string): Promise<ObjectId | null> {
    const authRecord = await this.auths.findOne({token}, {projection: {_id: 1}});
    return authRecord?._id;
  }

  private async addAuth(userId: ObjectId): Promise<string> {
    const time = new Date().getTime();
    const token = jwt.sign({userId, time}, this.jwtSecret);
    this.auths.insertOne({userId, token, time});
    return token;
  }

  async addGame(game: GameRecord, serverUrl: string): Promise<string> {
    const _id = (await this.games.insertOne(game)).insertedId;
    try {
      this.outcomes.insertOne({_id, winner1: false, time: Date.now()});
    } catch {
      // ignore
    }
    while (true) {
      const activeRecord: ActiveGameRecord & {_id: ObjectId} = {serverUrl, code: generateGameCode(), _id};
      try {
        (await this.activeGames.insertOne(activeRecord))
        return activeRecord.code;
      }
      catch (err) {
        if (err.code === MONGO_ERR_DUP) {
          continue;
        }
        throw err;
      }
      
    }
  }

  async joinGame(code: string): Promise<ActiveGameResponse | null> {

    const activeGame = await this.activeGames.findOne({code}, {projection: {_id: 1, serverUrl: 1}})
    if (activeGame === null) {
      return null;
    }
    const game = await this.activeGames.findOne({_id: activeGame._id}, {projection: {_id: 0, question: 1, answer1: 1, answer2: 1, location: 1}});
    if (game === null) {
      return null;
    }
    return {
      question: game.question,
      answer1: game.answer1,
      answer2: game.answer2,
      serverUrl: game.serverUrl,
      code
    };

  }
  
  async fetchGames(): Promise<GameOutcome[]> {
    const time = new Date().getTime();
    if (this.outcomesCacheExpiresTime < time) {
      try {
        const cursor = this.outcomes.aggregate(
          [
            {$sort: {
              time: -1,
            }},
            {$limit: 25},
            {$lookup: {
              from: "games",
              localField: "_id",
              foreignField: "_id",
              as: "game",
            }},
            {$set: {
              "game": {$first: "$game"},
            }},
            {$project: {
              "question": "$game.question",
              "answer1": "$game.answer1",
              "answer2": "$game.answer2",
              "location": "$game.location",
              _id: false,
            }}
          ]
        )
        const outcomes: any[] = await cursor.toArray();
        this.outcomesCache = outcomes;
        this.outcomesCacheExpiresTime = time + 10000;
      }
      catch {
        console.log("failed to fetch from db")
        // skip
      }
    }
    return this.outcomesCache;
  }
}


function generateGameCode() {
  // 36 ^ 8 - 1
  return Math.floor((Math.random() * 2821109907455)).toString(36);
}
