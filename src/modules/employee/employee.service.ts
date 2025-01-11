import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>, 
  ) {}

  async findAll(companyId: number): Promise<Employee[]> {
    console.log(companyId)
    return this.employeeRepository.find({where: {company: {id: companyId}}});
  }

  async findOne(id: number): Promise<Employee> {
    return this.employeeRepository.findOne({where: {id}, relations: ["attendances"]});
  }

  async create(employeeData: Partial<Employee>): Promise<Employee> {
    const employee = this.employeeRepository.create(employeeData);  
    return this.employeeRepository.save(employee);
  }

  async update(id: number, employeeData: Partial<Employee>): Promise<Employee> {
    await this.employeeRepository.update(id, employeeData); 
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.employeeRepository.delete(id);
  }
}
