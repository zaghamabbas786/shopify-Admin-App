import { createLogger, format, transports } from "winston";
const { combine, timestamp, printf, errors } = format;

// Custom log format
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

// Create a Winston logger
const logger = createLogger({
  level: "info", // Log level
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }), // Log the stack trace for errors
    logFormat,
  ),
  transports: [
    new transports.File({ filename: "error.log", level: "error" }), // Error logs
    new transports.File({ filename: "combined.log" }), // All logs
  ],
});

// If we're not in production, log to the console as well
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: combine(format.colorize(), format.simple()),
    }),
  );
}

export default logger;
