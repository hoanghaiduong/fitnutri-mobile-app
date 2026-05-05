export const isObject = (o: unknown): o is Record<string, unknown> => {
  return o === Object(o) && !Array.isArray(o) && typeof o !== 'function' && !(o instanceof FormData);
};

const toCamel = (str: string) => {
  return str.replace(/([-_][a-z])/ig, ($1) => {
    return $1.toUpperCase()
      .replace('-', '')
      .replace('_', '');
  });
};

const toSnake = (str: string) => {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
};

export const snakeToCamel = (obj: unknown): unknown => {
  if (isObject(obj)) {
    const n: Record<string, unknown> = {};
    Object.keys(obj).forEach((k) => {
      n[toCamel(k)] = snakeToCamel(obj[k]);
    });
    return n;
  } else if (Array.isArray(obj)) {
    return obj.map((i) => snakeToCamel(i));
  }
  return obj;
};

export const camelToSnake = (obj: unknown): unknown => {
  if (isObject(obj)) {
    const n: Record<string, unknown> = {};
    Object.keys(obj).forEach((k) => {
      n[toSnake(k)] = camelToSnake(obj[k]);
    });
    return n;
  } else if (Array.isArray(obj)) {
    return obj.map((i) => camelToSnake(i));
  }
  return obj;
};

export const apiAdapter = {
  toFrontend: <T>(data: unknown): T => snakeToCamel(data) as T,
  toBackend: <T>(data: unknown): T => camelToSnake(data) as T,
};
