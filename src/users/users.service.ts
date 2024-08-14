import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval } from '@nestjs/schedule';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'password',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
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
  @Cron('45 * * * * *')
  handleCron() {
    this.logger.debug('Called when the current second is 45');
  }

  @Interval(10000) // ms
  handleInterval() {
    this.logger.debug('Called every 10 seconds');
  }
}
