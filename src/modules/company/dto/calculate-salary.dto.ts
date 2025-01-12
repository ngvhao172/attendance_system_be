import { IsNotEmpty, IsNumber } from "class-validator";

export class CalculateSalaryDto {
  @IsNumber()
  @IsNotEmpty()
  employeeId: number;

  @IsNumber()
  @IsNotEmpty()
  month: number;

  @IsNumber()
  @IsNotEmpty()
  year: number;
}
