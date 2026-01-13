// 1) 기본 타입
type ID = string | number;

type User = {
  id: ID;
  name: string;
  age?: number;
}


function identity<T>(value: T): T {
  return value;
}

function isString(x: unknown): x is string {
  return typeof x === "string";
}

type OK<T> = { ok: true; value: T };
type Err = { ok: false; error: string };
type Result<T> = OK<T> | Err;

function ok<T>(value: T): OK<T> {
  return { ok: true, value };
}

function err(error: string): Err {
    return { ok:false, error};
}

function assertEqual<T>(actual: T, expected: T, name: string): void {
  const pass = Object.is(actual, expected);
}

