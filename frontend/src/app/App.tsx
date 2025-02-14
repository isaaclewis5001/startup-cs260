import { useState } from 'react'
import './App.css'
import Header from './Header';
import AuthState from '../AuthState';
// import GameWindow from './GameWindow';
// import JungleGame from '../game/JungleGame';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { About } from './About';
import { Home } from './Home';
import { Login } from './Login';
import { Register } from './Register';

export default function App() {
  const [authState, _] = useState(new AuthState("bobberton1000", ""));
  
  return (
    <BrowserRouter>
      <Header authState={authState} />
      <nav>
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/laws">Laws</NavLink></li>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <footer>
        <span>&copy; 2025 Isaac Lewis</span>
        <span><a href="https://github.com/isaaclewis5001/startup-cs260">GitHub</a></span>
      </footer>
    </BrowserRouter>
  )
}
