import { useEffect, useState } from "react"
import "./Laws.css"
import { GameOutcome } from "../../../shared/api/model";


async function getLaws(): Promise<GameOutcome[]> {
  const response = await fetch("/api/outcomes");
  return await response.json();
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
        <p>Question: <i>{outcome.question}</i></p>
        <p>Winning Answer: <i>{win}</i></p>
        <p>Loser: <i>{lose}</i></p>
        <p>Location: <i>{outcome.location}</i></p>
      </div>
    </li>
  )
}

export function Laws() {
  const [laws, updateLaws] = useState<GameOutcome[]>([]);
  useEffect(() => {
    getLaws().then((lawsResponse) => {
      updateLaws(lawsResponse)
    }).catch()
  }, [updateLaws])
  return (
    <div className="main-content">
      <div>
        <ul className="laws">
          {laws.map(
            (x, idx) => (<Law outcome={x} key={idx}/>)
          )}
        </ul>
      </div>
    </div>
  )
}
