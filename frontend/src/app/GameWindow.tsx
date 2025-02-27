import { useEffect, useRef } from "react"
import Game from "../game-interface/Game"
import GameResources from "../game-interface/GameResources";

export default function GameWindow({game}: {game: Game | null} ) {
  // We need imperative access to our canvases
  const primaryCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const secondaryCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(
    () => {
      // This code gets called whenever the component is loaded or the game changes
      if (!game || !primaryCanvasRef.current) {
        return;
      }
      const resources = new GameResources(primaryCanvasRef.current, secondaryCanvasRef.current);
      const gameState = game.start(resources);

      if (gameState === null) {
        return;
      }

      const isTouchscreen = /iPad|iPhone|Android/i.test(navigator.userAgent);

      let detachController;

      if (isTouchscreen) {
        const controller = gameState.getTouchController();
        if (controller == null) {
          gameState.stop();
          return;
        }
        detachController = () => {};
      }
      else {
        const controller = gameState.getKeyboardController();
        if (controller === null) {
          gameState.stop();
          return;
        }
        const controllerNonNull = controller;
        
        function onKeyDown(event: KeyboardEvent) {
          if (event.defaultPrevented) {
            return;
          }
          if (controllerNonNull.keyDown(event)) {
            event.preventDefault();
          }
        }        

        function onKeyUp(event: KeyboardEvent) {
          controllerNonNull.keyUp(event)
        }
        
        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('keyup', onKeyUp);

        detachController = () => {
          window.removeEventListener('keydown', onKeyDown);
          window.removeEventListener('keyup', onKeyUp);
        };
      }

      return () => {
        detachController();
        gameState.stop();
      }
    }, [game]
  );
  
  return (
    <div>
      <canvas ref={primaryCanvasRef} />
    </div>
  )
}
