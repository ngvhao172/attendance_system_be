import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { Employee } from '../employee/employee.entity';
import { EmployeeService } from '../employee/employee.service';

@Module({
  imports: [TypeOrmModule.forFeature([Company, User, Employee])],
  controllers: [CompanyController],
  providers: [CompanyService, UserService, EmployeeService],
})
export class CompanyModule {}
