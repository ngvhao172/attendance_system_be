import { IEntity } from 'src/interfaces/IEntity';
import { Entity, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { Employee } from '../employee/employee.entity';

@Entity() 
export class Company extends IEntity {
  @Column()
  name: string;

  @Column()
  address: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User

  @OneToMany(() => Employee, (employee) => employee.company)
  employees: Employee[];
}
