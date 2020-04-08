export type ICallback =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (...args: any[]) => void;
export type ITriggerCallback =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (eventName: string, ...args: any[]) => void;
