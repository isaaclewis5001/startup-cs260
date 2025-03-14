import express, { NextFunction, Response } from 'express';
import { BadLoginErr, DBConfig, MongoDBClient, UsernameDupErr } from './db';
import { CreateAccountRequest as CreateUserRequest, LoginRequest, SessionResponse } from '../../shared/api/model';
import { ObjectId } from 'mongodb';


type Request = express.Request & {userId?: ObjectId};

export default function server(port: number, dbConfig: DBConfig) {
  const serv = express();
  const db = new MongoDBClient(dbConfig);
 
  async function authenticateRequest(req: Request, res: Response, next: NextFunction) {
    const auth = getAuthFromRequest(req);
    if (auth !== null) {
      const userId = await db.authenticateUser(auth);
      if (userId !== null) {
        req.userId = userId;
        return next();
      }
    }
    res.sendStatus(401);
  }

  serv.use(express.json());
  
  serv.use(async (err: any, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof StatusCodeError) {
      errorResponse(res, err.status, err.description);
    }
    else {
      errorResponse(res, 500, "internal server error");
    }
  });

  // --------------------------------------------------------------------------
  // CreateUser
  // 
  // POST /user
  // --------------------------------------------------------------------------
  serv.post("/user", enforceObjectBody, async (req, res) => {
    const rb: CreateUserRequest = {
      username: getBodyString(req.body, "username"),
      password: getBodyString(req.body, "password"),
      email: getBodyString(req.body, "email"),
    } 

    try {
      const token = await db.createUser(rb.username, rb.password, rb.email);
      const response: SessionResponse = { username: rb.username, token };
      res.send(response);
    }
    catch (err) {
      if (err instanceof UsernameDupErr) {
        errorResponse(res, 403, "username in use");
      }
      else {
        throw err;
      }
    }
  });

  // --------------------------------------------------------------------------
  // Login
  // 
  // POST /auth
  // --------------------------------------------------------------------------
  serv.post("/auth", enforceObjectBody, async (req, res) => {
    const rb: LoginRequest = {
      username: getBodyString(req.body, "username"),
      password: getBodyString(req.body, "password"),
    } 

    try {
      const token = await db.loginUser(rb.username, rb.password);
      const response: SessionResponse = { username: rb.username, token };
      res.send(response);
    }
    catch (err) {
      if (err instanceof BadLoginErr) {
        res.sendStatus(401);
        return;
      }
      throw err;
    }
  });
  
  // --------------------------------------------------------------------------
  // Logout
  // 
  // DELETE /auth
  //
  // Authenticated
  // --------------------------------------------------------------------------
  serv.delete("/auth", async (req, res) => {
    const auth = getAuthFromRequest(req);
    if (auth === null) {
      res.sendStatus(401);
      return
    }
    await db.logoutUser(auth);
    res.sendStatus(200);
  });

  serv.listen(port);
}

function enforceObjectBody(req: Request, res: Response, next: NextFunction) {
  if (typeof req.body !== "object") {
    errorResponse(res, 400, "request body missing or of incorrect type (expected object)");
    return;
  }
  next();
}

function getAuthFromRequest(req: Request): string | null {
  const hval = req.get("Authorization");
  if (hval === undefined) {
    return null;
  }
  return hval;
}

function getBodyString(body: object, key: string): string {
  const v = (body as any)[key];
  if (typeof v === "string") {
    return v;
  }
  throw new StatusCodeError(400, `field "${key}" missing or of incorrect type (expected string)`);
}

function errorResponse(res: Response, status: number, description: string) {
  res.status(status);
  res.send({
    error: description
  });
};

class StatusCodeError {
  status: number
  description: string

  constructor(status: number, description: string) {
    this.status = status;
    this.description = description;
  }
}
