/* eslint-disable @typescript-eslint/no-unused-vars */

import { AbstractLogger, LogLevel, LogMessage, QueryRunner } from "typeorm";
import { resolve } from "path";
import { createLogger, format, transports, Logger } from "winston";

export class DatabaseLogger extends AbstractLogger {
  private readonly logger: Logger;

  constructor() {
    super("all");
    const label = "TypeORM";
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    const date = `${dd}-${mm}-${yyyy}`;
    const file = resolve(__dirname, `../../../logs/db-${date}.log`);
    const logFormat = format.printf(({ level, message, label, timestamp }) => {
      return `${timestamp} [${label}] ${level.toUpperCase()}: ${message.trim().replace(/\s+/g, " ")}`;
    });

    this.logger = createLogger({
      format: format.combine(format.timestamp(), format.label({ label }), logFormat),
      transports: [new transports.File({ filename: file, level: "debug" })],
    });
  }

  protected writeLog(
    level: LogLevel,
    logMessage: LogMessage | LogMessage[],
    _queryRunner?: QueryRunner,
  ) {
    const messages = this.prepareLogMessages(logMessage, { highlightSql: false });

    for (const message of messages) {
      switch (message.type ?? level) {
        case "log":
        case "schema-build":
        case "migration":
        case "info":
        case "query":
          this.logger.info(message.message);
          break;

        case "warn":
        case "query-slow":
          this.logger.warn(message.message);
          break;

        case "error":
        case "query-error":
          this.logger.error(message.message);
          break;
      }
    }
  }
}
