import { useState } from 'react'
import './App.css'
import Header from '../header/Header';
import AuthState from '../AuthState';
import GameWindow from '../game-window/GameWindow';
import JungleGame from '../game/JungleGame';

export default function App() {
  const [authState, _] = useState(new AuthState("bobberton1000", ""));
  
  return (
    <>
      <Header authState={authState} />
      <main>
        <GameWindow game={new JungleGame()}/>
      </main>
    </>
  )
}
