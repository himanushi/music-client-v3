// ref: https://stackoverflow.com/questions/42214743/declare-a-clone-function-to-make-readonly-properties-writable-in-typescript
export type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};
