import { Controller, Post } from '@nestjs/common';
import { Roles } from './role.decorator';
import { Role } from './role.enum';

@Controller('users')
export class UsersController {
  @Post()
  @Roles(Role.Admin)
  assignAdminRole() {
    return 'This method will change the user role to admin';
  }
}
