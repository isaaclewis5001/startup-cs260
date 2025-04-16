import './App.css'
import Header from './Header';

import { BrowserRouter, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { About } from './About';
import { Home } from './Home';
import { Laws } from './Laws';
import { Register } from './Register';
import { Login } from './Login';
import GameWindow from './GameWindow';
import AuthEffects from "../behavior/AuthEffects";
import LoginPageParams from '../behavior/LoginPageParams';
import { useEffect, useState } from 'react';
import Game from '../game-interface/Game';
import { AuthState } from '../model/AuthState';

function AppContent() {

  const [authState, authUpdate] = useState<null | AuthState>(null);
  const [game, setGame] = useState<Game | null>(null);
  
  const location = useLocation();
  const navigator = useNavigate();
  useEffect(() => {
    if (location.pathname === "/play" && !game) {
      navigator("/")
    }
    if (location.pathname === "/" && !authEffects.state) {
      navigator("/login");
    }
  }, [location, navigator, game, authState]);

  const authEffects = new AuthEffects(authState, authUpdate);
  const loginParams = new LoginPageParams(authEffects, undefined, navigator);

  const focusMode = location.pathname === "/play" || location.pathname === "/login" || location.pathname === "/register";

  return (<>
    <Header authEffects={authEffects} loginButtonVisible={!focusMode}/>
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
        <Route path="/" element={<Home setGameFn={setGame} authState={authEffects.state}/>} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login loginParams={loginParams}/>} />
        <Route path="/register" element={<Register loginParams={loginParams}/>} />
        <Route path="/laws" element={<Laws />} />
        <Route path="/play" element={<GameWindow game={game}/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
    <footer>
      <span>&copy; 2025 Isaac Lewis.</span>
      <span><a href="https://github.com/isaaclewis5001/startup-cs260">GitHub</a></span>
    </footer>
  </>);
}

export default function App() {
    return (
    <BrowserRouter>
      <AppContent />
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
