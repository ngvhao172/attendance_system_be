import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from "@nestjs/common";
import { CreateLeaveRequestDto } from "./dto/create-leave-request.dto";
import { UpdateLeaveRequestDto } from "./dto/update-leave-request.dto";
import { LeaveRequestService } from "./leave_request.service";
import { ELeaveRequest } from "src/utils/enums/leave_request.enum";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiBearerAuth("token")
@ApiTags("Leave Requests")
@Controller("leave-requests")
export class LeaveRequestController {
  constructor(private readonly leaveRequestService: LeaveRequestService) {}

  @Post()
  async create(@Body() createLeaveRequestDto: CreateLeaveRequestDto) {
    return this.leaveRequestService.create(createLeaveRequestDto);
  }

  @Get()
  async findAll() {
    return this.leaveRequestService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: number) {
    return this.leaveRequestService.findOne(id);
  }

  @Put(":id")
  async update(
    @Param("id") id: number,
    @Body() updateLeaveRequestDto: UpdateLeaveRequestDto,
  ) {
    return this.leaveRequestService.update(id, updateLeaveRequestDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: number) {
    return this.leaveRequestService.remove(id);
  }

  @Put(":id/reject")
  async reject(@Param("id") id: number) {
    return this.leaveRequestService.changeLeaveRequestStatus(
      id,
      ELeaveRequest.Rejected,
    );
  }

  @Put(":id/approve")
  async approve(@Param("id") id: number) {
    return this.leaveRequestService.changeLeaveRequestStatus(
      id,
      ELeaveRequest.Approved,
    );
  }
}
