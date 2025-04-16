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
    getLaws().then((lawsResponse) => {
      
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
