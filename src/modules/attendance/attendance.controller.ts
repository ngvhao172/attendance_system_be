import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from "@nestjs/common";
import { AttendanceService } from "./attendance.service";
import { CreateAttendanceDto } from "./dto/create-attendance.dto";
import { UpdateAttendanceDto } from "./dto/update-attendance.dto";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Roles } from "src/decorators/roles.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { ERole } from "src/utils/enums/role.enum";

@ApiBearerAuth("token")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles([ERole.Employee])
@Controller("attendance")
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  async create(@Body() createAttendanceDto: CreateAttendanceDto) {
    return this.attendanceService.create(createAttendanceDto);
  }

  @Get()
  async findAll() {
    return this.attendanceService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: number) {
    return this.attendanceService.findOne(id);
  }

  @Put(":id")
  async update(
    @Param("id") id: number,
    @Body() updateAttendanceDto: UpdateAttendanceDto,
  ) {
    return this.attendanceService.update(id, updateAttendanceDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: number) {
    return this.attendanceService.remove(id);
  }
}
