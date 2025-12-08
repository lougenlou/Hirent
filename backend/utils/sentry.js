const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");

const initSentry = (app) => {
  Sentry.init({
    dsn: process.env.SENTRY_DSN || "https://4beba6eeb3bd4b3d340965d717bb4c8c@o4510497984544768.ingest.us.sentry.io/4510497994047488",
    sendDefaultPii: true,
  });

  // Request Handler — Sentry will capture requests
  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());

  // Error Handler — Sentry captures errors
  app.use(Sentry.Handlers.errorHandler());
};

module.exports = initSentry;
