import "./Laws.css"

export function Laws() {
  return (
    <div className="main-content">
      <div>
        Database content stored here.
        Third party API calls are used to obtain the location information (from the IP address of the user who created the game).
        For the sake of user privacy, this IP to location conversion is done before storing
        the game outcome in the database, rather than for each individual client who views this page.
        <ul className="laws">
          <li>
            <div className="law">
              <p>Does pineapple go on pizza?</p>
              <p>No!</p>
              <p>Florence, Italy</p>
            </div>
          </li>
          <li>
            <div className="law">
              <p>Summer or winter?</p>
              <p>Winter</p>
              <p>Salt Lake City, Utah</p>
            </div>
          </li>
          <li>
            <div className="law">
              <p>Football or basketball?</p>
              <p>Football</p>
              <p>La Paz, Bolivia</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}
