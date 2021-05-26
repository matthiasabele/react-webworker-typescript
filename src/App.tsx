import React from "react";
import "./App.css";
// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from "worker-loader!./webworker/worker";
interface IHTMLCanvasElementWithCapture extends HTMLCanvasElement {
  captureStream(frameRate?: number): MediaStream;
}

function App() {
  const canvasRefOffScreen = React.useRef<HTMLCanvasElement>(null);
  const canvasRefOnScreen = React.useRef<HTMLCanvasElement>(null);
  const videoRefOffScreen = React.useRef<HTMLVideoElement>(null);
  const videoRefOnScreen = React.useRef<HTMLVideoElement>(null);
  const [streamOffScreen, setStreamOffScreen] = React.useState<MediaStream | null>(null);
  const [streamOnScreen, setStreamOnScreen] = React.useState<MediaStream | null>(null);
  let counter = 0;

  const loadWorker = (): void => {
    const worker = new Worker();
    worker.onmessage = (event) => {
      console.log("Receive message from worker", event);
    };
    worker.addEventListener("message", (event) => {});
    if (canvasRefOffScreen.current) {
      const offscreen = canvasRefOffScreen.current.transferControlToOffscreen();
      worker.postMessage(offscreen, [offscreen]);
      const canvas = canvasRefOffScreen.current as IHTMLCanvasElementWithCapture;
      setStreamOffScreen(canvas.captureStream());
    }
  }

  React.useEffect(() => {
    if (streamOffScreen && videoRefOffScreen.current) {
      videoRefOffScreen.current.srcObject = streamOffScreen;
      videoRefOffScreen.current.play();
    }
  }, [streamOffScreen]);

  React.useEffect(() => {
    if (streamOnScreen && videoRefOnScreen.current) {
      videoRefOnScreen.current.srcObject = streamOnScreen;
      videoRefOnScreen.current.play();
    }
  }, [streamOnScreen]);

  const draw = (): void => {
    if (!canvasRefOnScreen.current)
      return;
    const ctx = canvasRefOnScreen.current.getContext("2d");
    if (!ctx)
      return;
    const cx = canvasRefOnScreen.current.width;
    const cy = canvasRefOnScreen.current.height;

    setInterval(() => {
      // console.log("counter", counter);
      counter ++;
      ctx.clearRect(0, 0, cx, cy);
      ctx.font = "20px Arial";
      ctx.strokeText("Counter " + counter, 40, 40);
    }, 2);
  }

  const loadCanvas = (): void => {
    const canvas = canvasRefOnScreen.current as IHTMLCanvasElementWithCapture;
    setStreamOnScreen(canvas.captureStream());
    requestAnimationFrame(draw);
  }

  return (
    <div className="App">
      <div className="section">
        <button onClick={() => {loadWorker();}}>WEB WORKER</button>
        <span className="title">Canvas:</span><canvas className="offline" ref={canvasRefOffScreen}/>
        <span className="title">Video:</span><video className="offline" playsInline autoPlay ref={videoRefOffScreen} />
      </div>
      <div className="section">
        <button onClick={() => {loadCanvas();}}>ON SCREEN CANVAS</button>
        <span className="title">Canvas:</span><canvas className="online" ref={canvasRefOnScreen}/>
        <span className="title">Video:</span><video className="online" playsInline autoPlay ref={videoRefOnScreen} />
      </div>
    </div>
  );
}

export default App;
