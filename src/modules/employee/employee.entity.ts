import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "../user/user.entity";
import { Company } from "../company/company.entity";
import { IEntity } from "src/interfaces/IEntity";
import { LeaveRequest } from "../leave_request/leave_request.entity";
import { Attendance } from "../attendance/attendance.entity";

@Entity()
export class Employee extends IEntity {
  @Column()
  name: string;

  @Column()
  position: string;

  @Column("decimal")
  baseWage: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Company, (company) => company.employees)
  @JoinColumn()
  company: Company;

  @OneToMany(() => LeaveRequest, (leaveRequest) => leaveRequest.employee)
  leaveRequests: LeaveRequest[];

  @OneToMany(() => Attendance, (attendance) => attendance.employee)
  attendances: Attendance[];
}
