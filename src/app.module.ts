import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./modules/user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CompanyModule } from "./modules/company/company.module";
import { EmployeeModule } from "./modules/employee/employee.module";
import { AuthModule } from "./modules/auth/auth.module";
import { AttendanceModule } from "./modules/attendance/attendance.module";
import dataSource from "db/data-source";
import { LeaveRequestModule } from "./modules/leave_request/leave_request.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSource.options),
    UserModule,
    CompanyModule,
    EmployeeModule,
    AuthModule,
    LeaveRequestModule,
    AttendanceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
