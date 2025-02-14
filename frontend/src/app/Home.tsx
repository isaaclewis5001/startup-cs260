import "./cards.css"
import "./forms.css"

export function Home() {
  return (
    <div className="horiz-card-set">
      <div className="formcard">
        <div className="formitem">
          <label htmlFor="input_room_id">Room ID</label>
          <input type="text" placeholder="123456" id="input_room_id"></input>
        </div>
        <button>Join Room</button>
      </div>
      <div className="formcard">
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
        <button>Create Room</button>
      </div>
    </div>
  )
}
