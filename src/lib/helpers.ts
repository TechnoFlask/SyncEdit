export async function safePromise<T>(
  promise: Promise<T>,
): Promise<readonly [T, null] | [null, Error]> {
  try {
    const res = await promise;
    return [res, null];
  } catch (err) {
    return [null, err as Error];
  }
}
