import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Transaction } from 'typeorm';
import { Company } from './company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ERole } from 'src/utils/enums/role.enum';
import { EmployeeService } from '../employee/employee.service';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    private userService: UserService,
    private employeeService: EmployeeService,
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const queryRunner = this.companyRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    const createUserDto: CreateUserDto = { ...createCompanyDto, role: ERole.Company }

    try {
      const user = await this.userService.create(
        createUserDto,
        queryRunner,
      );

      const companyDto: Partial<Company> = {...createCompanyDto};
      companyDto.user = user;
      const savedCompany = await queryRunner.manager.save(Company, companyDto);
      await queryRunner.commitTransaction();
      return savedCompany;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException((error as Error).message, HttpStatus.BAD_REQUEST);
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<Company[]> {
    return this.companyRepository.find({ relations: ['user', 'employees'] });
  }

  async findOne(id: number): Promise<Company> {
    return this.companyRepository.findOne({
      where: { id },
      relations: ['user', 'employees'],
    });
  }

  async update(userId: number, id: number, updateCompanyDto: UpdateCompanyDto): Promise<Company> {
    await this.companyRepository.update(id, updateCompanyDto);
    return this.companyRepository.findOne({ where: { id: id, user: {id: userId} } });
  }

  async remove(id: number): Promise<void> {
    await this.companyRepository.delete(id);
  }

  async calculateSalary(companyId: number, employeeId: number, month: number, year: number): Promise<number> {
    const employee = await this.employeeService.findOne(employeeId);

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${employeeId} not found`);
    }

    const attendances = employee.attendances.filter(
      (attendance) => 
        attendance.date.getFullYear() === year && 
        attendance.date.getMonth() + 1 === month,
    );

    if (attendances.length === 0) {
      throw new BadRequestException(`No attendance records found for the given month and year`);
    }

    const totalHoursWorked = attendances.reduce((sum, attendance) => sum + attendance.hoursWorked, 0);
    const hourlyRate = employee.baseWage;
    return totalHoursWorked * hourlyRate;
  }

  async getCompanyIdByUserId(userId: number): Promise<number> {
    const company = await this.companyRepository.findOne({where: {user: {id: userId}}});
    return company.id;
  }
}
