import { IEntity } from "src/interfaces/IEntity";
import { ELeaveRequest, ELeaveType } from "src/utils/enums/leave_request.enum";
import { Column, Entity, ManyToOne } from "typeorm";
import { Employee } from "../employee/employee.entity";

@Entity('leave_requests')
export class LeaveRequest extends IEntity {

  @Column({ type: 'enum', enum: ELeaveType })
  leaveType: ELeaveType;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @Column({ type: 'enum', enum: ELeaveRequest })
  status: ELeaveRequest;

  @ManyToOne(() => Employee, (employee) => employee.leaveRequests)
  employee: Employee
}