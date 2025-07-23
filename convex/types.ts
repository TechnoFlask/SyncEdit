type Success<S> = { success: true; value: S };
type Failure<F> = { success: false; cause: F };

export type Result<S, F> = Success<S> | Failure<F>;
