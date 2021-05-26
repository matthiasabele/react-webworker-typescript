/* eslint-disable-next-line no-restricted-globals */
const ctx: Worker = self as any;
let counter = 0;
let canvas: OffscreenCanvas;

const draw = (): void => {
  if (!canvas)
    return;
  const ctx = canvas.getContext("2d");
  if (!ctx)
    return;
  const cx = canvas.width;
  const cy = canvas.height;

  setInterval(() => {
    counter++;
    console.log("counter", counter);
    ctx.clearRect(0, 0, cx, cy);
    ctx.font = "20px Arial";
    ctx.strokeText("Counter " + counter, 40, 40);
  }, 2);
}

// Post data to parent thread
ctx.postMessage({ foo: "foo" });

// Respond to message from parent thread
ctx.addEventListener("message", (event) => {
  console.log(event);
  canvas = event.data;
  requestAnimationFrame(draw);
});


export default ctx;
