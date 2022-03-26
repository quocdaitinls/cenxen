type X = {
  [name: string]: any;
};

export const isUndefined = (value: any) => value === undefined;

export const isNull = (value: any) => value === null;

export const isObject = (value: any) => value instanceof Object;

export const clone = (obj: any) => {
  if (!isObject(obj)) return obj;
  return Object.assign({}, obj);
};

export const toArray = <T = any>(input: T | T[]): T[] => {
  return Array.isArray(input) ? input : [input];
};

export const deleteProps = (obj: X, paths: string | string[]) => {
  let result = clone(obj);
  paths = toArray(paths);

  paths.forEach((path) => {
    const parts = path.split(".");
    let current = result;
    let last = parts.pop();
    for (let part of parts) {
      current = current[part];
      if (!current) return;
    }
    delete current[last];
  });

  return result;
};
