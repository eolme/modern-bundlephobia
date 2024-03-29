const never = () => Promise.reject({});

const noop = () => {
  // Noop
};

const forceTrue = () => true;
const forceFalse = () => false;

const bridge = {
  send: never,
  sendPromise: never,
  subscribe: noop,
  unsubscribe: noop,
  isWebView: forceTrue,
  isIframe: forceFalse,
  isEmbedded: forceTrue,
  isStandalone: forceFalse
};

bridge.default = bridge;

export { bridge, bridge as default };
