import { Injectable } from "@nestjs/common";
import { Cron, Interval } from "@nestjs/schedule";
import { LoggerService } from "@/@core/logger/logger.service";

@Injectable()
export class UserSchedule {
  public constructor(private loggerService: LoggerService) {
    this.loggerService.setContext(UserSchedule.name);
  }

  /**
   * https://docs.nestjs.com/techniques/task-scheduling#task-scheduling
   *
   *    * * * * * * *
   *    | | | | | |
   *    | | | | | day of week
   *    | | | | months
   *    | | | day of month
   *    | | hours
   *    | minutes
   *    seconds
   *
   */
  @Cron("45 * * * * *")
  public handleCron() {
    this.loggerService.debug("Called when the current second is 45");
  }

  @Interval(10000) // ms
  public handleInterval() {
    this.loggerService.debug("Called every 10 seconds");
  }
}
