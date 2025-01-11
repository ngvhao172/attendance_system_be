import { IsString, IsNotEmpty } from 'class-validator';
import { IsValidEmail } from 'src/decorators/is-valid-email.decorator';

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  @IsValidEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}