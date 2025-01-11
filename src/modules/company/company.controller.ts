import { Controller, Get, Post, Body, Param, Put, Delete, Res, Req, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { Company } from './company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SuccessResponse } from 'src/utils/response';
import { Request, Response } from 'express';
import { CalculateSalaryDto } from './dto/calculate-salary.dto';
import { RequestHasUserDTO } from 'src/utils/request-has-user.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { ERole } from 'src/utils/enums/role.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiBearerAuth("token")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles([ERole.Company])
@ApiTags("Companies")
@Controller('companies') 
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async create(@Body() createCompanyDto: CreateCompanyDto, @Res() res: Response): Promise<Company> {
    await this.companyService.create(createCompanyDto);
    return new SuccessResponse({data: null, message: "company created"}).send(res);
  }

  @Get()
  async findAll(): Promise<Company[]> {
    return this.companyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Company> {
    return this.companyService.findOne(id);
  }

  @Put(':id')
  async update(
    @Req() req: RequestHasUserDTO & Request,
    @Param('id') id: number,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    const {user} = req;
    return this.companyService.update(user.id, id, updateCompanyDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.companyService.remove(id);
  }

  @Post(":id/calculateSalary")
  async calculateSalary(@Req() req: RequestHasUserDTO & Request, 
  @Body() updateCompanyDto: CalculateSalaryDto, 
  @Res() res: Response): Promise<number> {
    const {user} = req;
    const salary = this.companyService.calculateSalary(user.id, updateCompanyDto.employeeId, updateCompanyDto.month, updateCompanyDto.year);
    return new SuccessResponse({data: salary, message: `Salary of employee in ${updateCompanyDto.month} ${updateCompanyDto.year}`}).send(res);
  }
}
