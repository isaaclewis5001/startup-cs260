
export function Home() {
  return (<>
    <div className="horiz-card-set">
      <div className="formcard">
        <input type="text" placeholder="Room ID"></input>
        <button>Join Room</button>
      </div>
      <div className="formcard">
        <input type="text" placeholder="Game Question"></input>
        <input type="text" placeholder="Answer 1"></input>
        <input type="text" placeholder="Answer 2"></input>
        <button>Create Room</button>
      </div>
    </div>
    <p>
      I might make some fun background visuals later using this canvas if I get the time.
      Shouldn't be too bad since I can reuse all the rendering code.
    </p>
    <canvas></canvas>
  </>)
}
