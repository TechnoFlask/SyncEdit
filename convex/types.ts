type Success<S> = { success: true; value: S };
type Failure<F, V = unknown> = { success: false; cause: F; value?: V };

export type Result<S, F, FV = unknown> = Success<S> | Failure<F, FV>;
