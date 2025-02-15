import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Req,
  UseGuards,
  Res,
} from "@nestjs/common";
import { EmployeeService } from "./employee.service";
import { Employee } from "./employee.entity";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Request, Response } from "express";
import { RequestHasUserDTO } from "src/utils/request-has-user.dto";
import { Roles } from "src/decorators/roles.decorator";
import { ERole } from "src/utils/enums/role.enum";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { SuccessResponse } from "src/utils/response";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { CompanyService } from "../company/company.service";

@ApiBearerAuth("token")
@ApiTags("Employees")
@Controller("employees")
export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly companyService: CompanyService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([ERole.Company])
  @Get()
  async findAll(
    @Req() req: RequestHasUserDTO & Request,
    @Res() res: Response,
  ): Promise<Employee[]> {
    const { user } = req;
    const companyId = await this.companyService.getCompanyIdByUserId(user.id);
    const employees = await this.employeeService.findAll(companyId);
    return new SuccessResponse({
      data: employees,
      message: "Get employees",
    }).send(res);
  }

  @Get(":id")
  async findOne(@Param("id") id: number): Promise<Employee> {
    return this.employeeService.findOne(id);
  }

  @Post()
  async create(@Body() employeeDto: CreateEmployeeDto): Promise<Employee> {
    return this.employeeService.create(employeeDto);
  }

  @Put(":id")
  async update(
    @Param("id") id: number,
    @Body() employeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    return this.employeeService.update(id, employeeDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: number): Promise<void> {
    return this.employeeService.remove(id);
  }
}
