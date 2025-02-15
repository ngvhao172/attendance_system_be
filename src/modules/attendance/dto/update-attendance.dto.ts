import { IsOptional, IsDateString, IsNumber } from "class-validator";

export class UpdateAttendanceDto {
  @IsOptional()
  @IsDateString()
  checkInTime?: string;

  @IsOptional()
  @IsDateString()
  checkOutTime?: string;

  @IsOptional()
  @IsNumber()
  hoursWorked?: number;

  @IsOptional()
  @IsDateString()
  date?: string;
}
