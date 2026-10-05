// React 19 only flushes react-test-renderer when this flag is set.
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const originalConsoleError = console.error;
console.error = (...args) => {
  const message = args.map((part) => (typeof part === "string" ? part : "")).join(" ");
  if (message.includes("react-test-renderer is deprecated")) {
    return;
  }
  originalConsoleError.apply(console, args);
};
