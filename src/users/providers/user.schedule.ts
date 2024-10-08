import { Injectable, Logger } from "@nestjs/common";
import { Cron, Interval } from "@nestjs/schedule";

@Injectable()
export class UserSchedule {
  private readonly logger = new Logger("UserSchedule");

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
    this.logger.debug("Called when the current second is 45");
  }

  @Interval(10000) // ms
  public handleInterval() {
    this.logger.debug("Called every 10 seconds");
  }
}
