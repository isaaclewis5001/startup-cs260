import { useEffect, useState } from "react"
import "./Laws.css"
import { GameOutcome } from "../../../shared/api/model";


async function getLaws(): GameOutcome[] {
  const response = fetch("");
}

function Law({outcome}: {outcome: GameOutcome}) {
  let win, lose;
  if (outcome.winner1) {
    win = outcome.answer1;
    lose = outcome.answer2;
  }
  else {
    win = outcome.answer2;
    lose = outcome.answer1;
  }

  return (
    <li>
      <div className="law">
        <p>{outcome.question}</p>
        <p>Answer: {win}</p>
        <p>Wrong: {lose}</p>
        <p>{outcome.location}</p>
      </div>
    </li>
  )
}

export function Laws() {
  const [laws, updateLaws] = useState<GameOutcome[]>([]);
  useEffect(() => {
    updateLaws(getLaws())
  }, [updateLaws])
  return (
    <div className="main-content">
      <div>
        Database content stored here.
        Third party API calls are used to obtain the location information (from the IP address of the user who created the game).
        For the sake of user privacy, this IP to location conversion is done before storing
        the game outcome in the database, rather than for each individual client who views this page.
        <ul className="laws">
          {laws.map(
            (x, idx) => (<Law outcome={x} key={idx}/>)
          )}
        </ul>
      </div>
    </div>
  )
}
