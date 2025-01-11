import { IsNotEmpty, IsEnum, IsDateString } from 'class-validator';
import { ELeaveType, ELeaveRequest } from 'src/utils/enums/leave_request.enum';

export class CreateLeaveRequestDto {
  @IsNotEmpty()
  @IsEnum(ELeaveType)
  leaveType: ELeaveType;

  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @IsNotEmpty()
  @IsDateString()
  endDate: string;

  @IsNotEmpty()
  @IsEnum(ELeaveRequest)
  status: ELeaveRequest;
}

