import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LeaveRequest } from "./leave_request.entity";
import { LeaveRequestController } from "./leave_request.controller";
import { LeaveRequestService } from "./leave_request.service";

@Module({
  imports: [TypeOrmModule.forFeature([LeaveRequest])],
  controllers: [LeaveRequestController],
  providers: [LeaveRequestService],
})
export class LeaveRequestModule {}
