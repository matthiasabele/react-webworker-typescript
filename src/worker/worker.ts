/**
 * TODOC
 *
 * @param data - TODOC
 * @returns - a string with data
 */
export function processData(data: string): string {
	// Process the data without stalling the UI
	console.log("WORKER DATA", data);
	let x = 0;
	setInterval(() => {
		console.log("WORKER increase", x);
		x++;
	}, 1000);

	return data;
}

const draw = () => {
	/*if (!this.canvas)
		return;
	const ctx = this.canvas.getContext("2d");
	if (!ctx)
		return;
	const cx = this.canvas.width;
	const cy = this.canvas.height;

	setInterval(() => {
		this.counter++;
		ctx.clearRect(0, 0, cx, cy);
		ctx.font = "20px Arial";
		ctx.strokeText("Counter " + this.counter, 40, 40);
	}, 2);*/
}
