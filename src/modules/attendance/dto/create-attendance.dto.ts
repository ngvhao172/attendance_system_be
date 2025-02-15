import {
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsNumber,
} from "class-validator";

export class CreateAttendanceDto {
  @IsNotEmpty()
  @IsDateString()
  checkInTime: string;

  @IsOptional()
  @IsDateString()
  checkOutTime?: string;

  @IsOptional()
  @IsNumber()
  hoursWorked?: number;

  @IsNotEmpty()
  @IsDateString()
  date: string;
}
