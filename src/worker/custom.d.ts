declare module "comlink-loader!*" {
	/**
	 *
	 */
	class WebpackWorker extends Worker {
		public constructor();

		// Add any custom functions to this class.
		// Make note that the return type needs to be wrapped in a promise.
		public processData(data: string): Promise<string>;
	}

	export = WebpackWorker;
}
