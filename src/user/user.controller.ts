import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthCredentialsDTO } from './user.dto';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  createUser(@Body() authCredentialsDTO: AuthCredentialsDTO): Promise<User> {
    return this.userService.createUser(authCredentialsDTO);
  }

  @Post('/signin')
  signin(
    @Body() authCredentialsDTO: AuthCredentialsDTO,
  ): Promise<{ accessToken: string }> {
    return this.userService.signin(authCredentialsDTO);
  }
}
