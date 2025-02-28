import { ReactNode } from "react"
import "./cards.css"
import "./forms.css"
import { Form, FormAction, FormWrapper, getFieldById } from "./FormWrapper"
import { NavigateFunction } from "react-router-dom";

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

  url = "";
  submitButtonText = "Join Game";
}

class CreateGameForm implements Form<null> {
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
    const answer2 = getFieldById("input_answer1");

    if (!question) {
      return { errMsg: "Question required" };
    }
    else if (!answer1) {
      return { errMsg: "Answer 1 required" };
    }
    else if (!answer2) {
      return { errMsg: "Answer 2 required" };
    }

    return {
      payload: { question, answer1, answer2 },
      context: null,
    }   
  }
  url = "";
  submitButtonText = "Create Game";
}

class JoinGameAction implements FormAction<null> {
  async act(_context: null, _response: Response, navigator: NavigateFunction): Promise<string | null> {
    navigator("/play");
    return null;
  }
}

export function Home() {
  const action = new JoinGameAction();
  return (
    <div className="main-content">
      <div className="horiz-card-set">
        <FormWrapper form={new JoinByIDForm()} action={action}/>
        <FormWrapper form={new CreateGameForm()} action={action}/>
      </div>
    </div>
  )
}
