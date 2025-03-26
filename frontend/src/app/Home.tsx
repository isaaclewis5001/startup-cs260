import { ReactNode, useEffect, useState } from "react"
import "./cards.css"
import "./forms.css"
import { Form, FormAction, FormWrapper, getFieldById } from "./FormWrapper"
import { NavigateFunction } from "react-router-dom";
import Game from "../game-interface/Game";
import JungleGame from "../game/JungleGame";
import config from "../config";
import { AuthState } from "../model/AuthState";

class JoinByIDForm implements Form<null> {
  create({ children }: { children: ReactNode }): ReactNode {
    return (<>
      <div className="formitem">
        <label htmlFor="input_room_id">Room ID</label>
        <input type="text" placeholder="123456" id="input_room_id"></input>
      </div>
      { children }
    </>);
  }

  getPayloadOrError(): { errMsg: string } | { payload: any; context: null } {
    const roomId = getFieldById("input_room_id");
    if (!roomId) {
      return { errMsg: "Room ID required" };
    }
    return { payload: {roomId}, context: null }
  }

  url = config.service + "/api/join";
  submitButtonText = "Join Game";
}

class CreateGameForm implements Form<null> {

  location: string | null

  constructor(location: string | null) {
    this.location = location;
  }

  
  create({ children }: { children: ReactNode; }): ReactNode {
    return (<>
      <div className="formitem">
        <label htmlFor="input_game_question">Game Question</label>
        <input type="text" placeholder="What kind?" id="input_game_question"></input>
      </div>
      <div className="formitem">
        <label htmlFor="input_answer1">Answer 1</label>
        <input type="text" placeholder="African" id="input_answer1"></input>
      </div>
      <div className="formitem">
        <label htmlFor="input_answer2">Answer 2</label>
        <input type="text" placeholder="European" id="input_answer2"></input>
      </div>
      { children }
    </>)
  }

  getPayloadOrError(): { errMsg: string; } | { payload: any; context: null; } {
    const question = getFieldById("input_game_question");
    const answer1 = getFieldById("input_answer1");
    const answer2 = getFieldById("input_answer2");

    console.log(this.location);
    if (!question) {
      return { errMsg: "Question required" };
    }
    else if (!answer1) {
      return { errMsg: "Answer 1 required" };
    }
    else if (!answer2) {
      return { errMsg: "Answer 2 required" };
    }
    else if (!this.location) {
      return { errMsg: "Not yet ready" };
    }

    console.log(JSON.stringify({ question, answer1, answer2, location: this.location }));
    return {
      payload: { question, answer1, answer2, location: this.location },
      context: null,
    }   
  }
  url = config.service + "/api/game";
  submitButtonText = "Create Game";
}

type SetGameFn = (game: Game) => void;

class JoinGameAction implements FormAction<null> {
  private setGame: SetGameFn;

  constructor(setGameFn: SetGameFn) {
    this.setGame = setGameFn;
  }
  
  async act(_context: null, response: Response, navigator: NavigateFunction): Promise<string | null> {
    if (response.status !== 200) {
      return "Error: " + response.statusText;
    }
    navigator("/play");
    this.setGame(new JungleGame());
    return null;
  }
}

export function Home({setGameFn, authState}: {setGameFn: SetGameFn, authState?: AuthState | null}) {
  const [location, setLocation] = useState<string | null>(null);
  useEffect(() => {
    fetch("https://api.country.is/").then(async (response) => {
      const body = JSON.parse(await response.json());
      setLocation(body["country"]);
    }).catch(() => {
      setLocation("unknown");
    });  
  }, [setLocation])
  const action = new JoinGameAction(setGameFn);
  return (
    <div className="main-content">
      <div className="horiz-card-set">
        <FormWrapper form={new JoinByIDForm()} action={action} authState={authState} />
        <FormWrapper form={new CreateGameForm(location)} action={action} authState={authState} />
      </div>
    </div>
  )
}
