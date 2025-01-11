import { IsNotEmpty } from 'class-validator';
import { User } from 'src/modules/user/user.entity';


export class RequestHasUserDTO {
  @IsNotEmpty({ message: 'User must be provided.' })
  user: User;

  constructor(user: User) {
    this.user = user;
  }
}
