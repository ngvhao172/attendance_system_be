import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { ERole } from "src/utils/enums/role.enum";

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsEnum(ERole)
  role: ERole;
}
