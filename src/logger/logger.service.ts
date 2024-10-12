/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { resolve } from "path";
import { createLogger, format, transports } from "winston";
import { Injectable, ConsoleLogger } from "@nestjs/common";

@Injectable()
export class LoggerService extends ConsoleLogger {
  public debug(message: string, context?: string, ...rest: unknown[]): void {
    this.writeLog(this.context || "UnknownContext").debug(message);
    super.debug.apply(this, arguments);
  }

  public error(message: string, stack?: unknown, context?: string, ...rest: unknown[]): void {
    this.writeLog(this.context || "UnknownContext").error(message);
    super.error.apply(this, arguments);
  }

  private writeLog(label: string) {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    const date = dd + "-" + mm + "-" + yyyy;
    const file = resolve(__dirname, `../../logs/log-${date}.log`);
    const logFormat = format.printf(({ level, message, label, timestamp }) => {
      return `${timestamp} [${label}] ${level.toUpperCase()}: ${message}`;
    });
    return createLogger({
      format: format.combine(format.timestamp(), format.label({ label }), logFormat),
      transports: [new transports.File({ filename: file, level: "debug" })],
    });
  }
}
