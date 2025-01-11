import { IsString, IsDecimal, IsOptional, IsNumber } from 'class-validator';

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
