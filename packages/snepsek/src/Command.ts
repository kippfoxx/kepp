export type CommandHandler = (ctx: Context) => Promise<void>;
export type ModuleCommandHandler = (ctx: Context) => Promise<void>;

export interface Context {}

export interface CommandOptions {
	disabled: boolean;
}

const DEFAULT_COMMAND_OPTIONS: CommandOptions = {
	disabled: false
};

/**
 * A class representing a user-runnable command.
 */
export class Command {
	readonly options: CommandOptions = DEFAULT_COMMAND_OPTIONS;

	constructor(
		readonly name: string,
		readonly handler: CommandHandler | ModuleCommandHandler,
		opts: CommandOptions = DEFAULT_COMMAND_OPTIONS
	) {
		this.options = { ...DEFAULT_COMMAND_OPTIONS, ...opts };
	}

	/**
	 * Run the command in the given context.
	 */
	async execute(ctx: Context) {
		this.handler(ctx);
	}

	/**
	 * Dynamically disable a command.
	 */
	disable() {
		return (this.options.disabled = true);
	}

	/**
	 * Dynamically enable a command.
	 */
	enable() {
		return (this.options.disabled = false);
	}
}