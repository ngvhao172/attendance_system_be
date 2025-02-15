import { IsOptional, IsEnum, IsDateString } from "class-validator";
import { ELeaveType, ELeaveRequest } from "src/utils/enums/leave_request.enum";

export class UpdateLeaveRequestDto {
  @IsOptional()
  @IsEnum(ELeaveType)
  leaveType?: ELeaveType;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsEnum(ELeaveRequest)
  status?: ELeaveRequest;

  @IsOptional()
  employeeId?: string;
}
