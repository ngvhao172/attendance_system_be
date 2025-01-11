import { IEntity } from "src/interfaces/IEntity";
import { Column, Entity, ManyToOne } from "typeorm";
import { Employee } from "../employee/employee.entity";

@Entity('attendance')
export class Attendance extends IEntity{

  @Column({ type: 'timestamp' })
  checkInTime: Date;

  @Column({ type: 'timestamp', nullable: true })
  checkOutTime: Date | null;

  @Column({ type: 'float', default: 0 })
  hoursWorked: number;

  @Column({ type: 'date' })
  date: Date;

  @ManyToOne(() => Employee, (employee) => employee.attendances)
  employee: Employee;
}