const curryLast = (fn: (...args: any[]) => any, args: any[]) =>
  args.length === 1 ? (data: any) => fn(data, ...args.slice(-1)) : fn(...args);

export default curryLast;
