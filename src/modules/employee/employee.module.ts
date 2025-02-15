import { Module } from "@nestjs/common";
import { EmployeeController } from "./employee.controller";
import { EmployeeService } from "./employee.service";
import { Company } from "../company/company.entity";
import { User } from "../user/user.entity";
import { Employee } from "./employee.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CompanyService } from "../company/company.service";
import { UserModule } from "../user/user.module";

@Module({
  imports: [TypeOrmModule.forFeature([Employee, User, Company]), UserModule],
  controllers: [EmployeeController],
  providers: [EmployeeService, CompanyService],
})
export class EmployeeModule {}
