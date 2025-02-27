import './App.css'
import Header from './Header';

// import GameWindow from './GameWindow';
// import JungleGame from '../game/JungleGame';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { About } from './About';
import { Home } from './Home';
import { Login } from './Login';
import { Laws } from './Laws';
import { Register } from './Register';
import AuthEffects from '../behavior/AuthEffects';
import LoginPageParams from '../behavior/LoginPageParams';
import GameWindow from './GameWindow';
import { useEffect, useState } from 'react';
import JungleGame from '../game/JungleGame';
import Game from '../game-interface/Game';

export default function App() {
  const authEffects = new AuthEffects();
  const loginParams = new LoginPageParams(authEffects);
  const [game, setGame] = useState<Game | null>(null);
  
  useEffect(() => {
    setGame(new JungleGame());
  }, [setGame])

  const focusMode = game !== null;
  
  return (
    <BrowserRouter>
      <Header authEffects={authEffects} loginInfoVisible={!focusMode}/>
      {
        focusMode ? null : (
          <nav>
            <ul>
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/about">About</NavLink></li>
              <li><NavLink to="/laws">Laws</NavLink></li>
            </ul>
          </nav>
        )
      }
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login loginParams={loginParams}/>} />
          <Route path="/register" element={<Register loginParams={loginParams}/>} />
          <Route path="/laws" element={<Laws />} />
          <Route path="/play" element={<GameWindow game={game}/>} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      <footer>
        <span>&copy; 2025 Isaac Lewis.</span>
        <span><a href="https://github.com/isaaclewis5001/startup-cs260">GitHub</a></span>
      </footer>
    </BrowserRouter>
  )
}

function NotFound() {
  return (<div className="main-content">
    <p className="center">
      <b>404:</b> The page you are looking for does not exist.
    </p>
  </div>)
}
