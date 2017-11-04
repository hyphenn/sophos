const Winston = require('winston');
const config = require('config');

const logger = new(Winston.Logger)({
  colors: {
    trace: 'magenta',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'white',
    debug: 'blue',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    error: 'red'
  },
  transports: [
    new(Winston.transports.Console)({
      timestamp: true,
      colorize: true,
      json: false,
      prettyPrint: true,
      handleExceptions: config.get("server.logs.unhandledExceptions")
    }),
    new(Winston.transports.File)({
      name: "file.logger.warn",
      timestamp: true,
      filename: config.get("server.logs.path") + "warn" + "-" + config.get("name") + ".json",
      level: "warn",
      maxSize: config.get("server.logs.maxSize"),
      maxFiles: config.get("server.logs.maxFiles"),
      json: config.get("server.logs.jsonFormated"),
      handleExceptions: config.get("server.logs.unhandledExceptions")
    }),
    new(Winston.transports.File)({
      name: "file.logger.error",
      timestamp: true,
      filename: config.get("server.logs.path") + "error" + "-" + config.get("name") + ".json",
      level: "error",
      maxSize: config.get("server.logs.maxSize"),
      maxFiles: config.get("server.logs.maxFiles"),
      json: config.get("server.logs.jsonFormated"),
      handleExceptions: config.get("server.logs.unhandledExceptions")
    })
  ]
});

module.exports = logger;