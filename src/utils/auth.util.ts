import { UnauthorizedException } from '@nestjs/common';
import _ from 'lodash';
import { User } from 'src/modules/user/user.entity';


export function getUser(req: Request): User {
  const user = _.get(req, 'user');

  if (!user) {
    throw new UnauthorizedException('Unable to get user');
  }

  return user;
}
