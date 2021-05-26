import React from 'react';
import Worker from "./worker/worker";

function App() {

  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const canvasRef2 = React.useRef<HTMLCanvasElement>(null);
  let counter = 0;

  const loadWorker = (): void => {
    if (canvasRef.current) {
      // const offscreen = canvasRef.current.transferControlToOffscreen();
      const workerCanvas = new Worker();
      workerCanvas.postMessage({ test: 1 });
      // workerCanvas.postMessage(offscreen, [offscreen]);
      workerCanvas.onmessage = (message: Event) => {
        console.log("message from worker", message);
      }
    }
  }

  const draw = (): void => {
    if (!canvasRef2.current)
      return;
    const ctx = canvasRef2.current.getContext("2d");
    if (!ctx)
      return;
    const cx = canvasRef2.current.width;
    const cy = canvasRef2.current.height;

    setInterval(() => {
      console.log("counter", counter);
      counter ++;
      ctx.clearRect(0, 0, cx, cy);
      ctx.font = "20px Arial";
      ctx.strokeText("Counter " + counter, 40, 40);
    }, 2);
  }

  const loadCanvas = (): void => {
    requestAnimationFrame(draw);
  }

  return (
    <div className="App">
      <button onClick={() => {loadWorker();}}>Click me worker</button>
      <button onClick={() => {loadCanvas();}}>Click me canvas</button>
      <canvas className="noiseCanvas" ref={canvasRef}/>
      <canvas className="noiseCanvas" ref={canvasRef2}/>
      <div className="overlay">
      </div>
    </div>
  );
}

export default App;
