import { Controller, Post } from "@nestjs/common";
import { Roles } from "./providers/role.decorator";
import { Role } from "./configs/role.enum";

@Controller("users")
export class UserController {
  @Post()
  @Roles(Role.Admin)
  public assignAdminRole() {
    return "This method will change the user role to admin";
  }
}
