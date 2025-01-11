import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ERole } from 'src/utils/enums/role.enum';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsEnum(ERole)
  role?: ERole;
}
