import { IsString, IsDecimal, IsOptional } from "class-validator";

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
