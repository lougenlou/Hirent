// utils/sentry.js
const Sentry = require("@sentry/node");

const initSentry = () => {
  Sentry.init({
    dsn: process.env.SENTRY_DSN || "https://4beba6eeb3bd4b3d340965d717bb4c8c@o4510497984544768.ingest.us.sentry.io/4510497994047488",
    tracesSampleRate: 1.0,
    sendDefaultPii: true,
  });
};

module.exports = initSentry;
