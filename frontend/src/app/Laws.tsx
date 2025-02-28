import { useEffect, useState } from "react"
import "./Laws.css"
import GameOutcome from "../../../model/GameOutcome"


function getLaws(): GameOutcome[] {
  return [
    new GameOutcome(0, "Does pineapple go on pizza?", "No!", "Florence, Italy"),
    new GameOutcome(1, "Summer or winter?", "Winter", "Salt Lake City, Utah"),
    new GameOutcome(2, "Football or basketball?", "Football", "La Paz, Bolivia"),
  ]
}

function Law({outcome}: {outcome: GameOutcome}) {
  return (
    <li>
      <div className="law">
        <p>{outcome.question}</p>
        <p>{outcome.answer}</p>
        <p>{outcome.settledIn}</p>
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
            x => (<Law outcome={x} key={x.id}/>)
          )}
        </ul>
      </div>
    </div>
  )
}
