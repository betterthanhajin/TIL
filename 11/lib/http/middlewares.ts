export const widthTimeout = (ms) => (next) => async (req) => {
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), ms);
  try {
    return await next({...req, signal: ctrl.signal});
  } finally {
    clearTimeout(id);
  }
}