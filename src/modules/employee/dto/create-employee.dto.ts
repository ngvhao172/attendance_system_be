import {
  IsString,
  IsDecimal,
  IsNotEmpty,
  IsOptional,
  IsNumber,
} from "class-validator";

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  position: string;

  @IsDecimal()
  @IsNotEmpty()
  baseWage: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsOptional()
  companyId?: number;
}

export class UpdateEmployeeDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  position?: string;

  @IsDecimal()
  @IsOptional()
  baseWage?: number;
}
