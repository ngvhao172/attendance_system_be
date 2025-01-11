import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLeaveRequestDto } from './dto/create-leave-request.dto';
import { LeaveRequest } from './leave_request.entity';
import { UpdateLeaveRequestDto } from './dto/update-leave-request.dto';
import { ELeaveRequest } from 'src/utils/enums/leave_request.enum';

@Injectable()
export class LeaveRequestService {
  constructor(
    @InjectRepository(LeaveRequest)
    private readonly leaveRequestRepository: Repository<LeaveRequest>,
  ) {}

  async create(createLeaveRequestDto: CreateLeaveRequestDto): Promise<LeaveRequest> {
    const leaveRequest = this.leaveRequestRepository.create(createLeaveRequestDto);
    return this.leaveRequestRepository.save(leaveRequest);
  }

  async findAll(): Promise<LeaveRequest[]> {
    return this.leaveRequestRepository.find({ relations: ['employee'] });
  }

  async findOne(id: number): Promise<LeaveRequest> {
    const leaveRequest = await this.leaveRequestRepository.findOne({ 
      where: {id},
      relations: ['employee'],
    });
    if (!leaveRequest) {
      throw new NotFoundException(`Leave request with ID ${id} not found`);
    }
    return leaveRequest;
  }

  async update(
    id: number,
    updateLeaveRequestDto: UpdateLeaveRequestDto,
  ): Promise<LeaveRequest> {
    await this.leaveRequestRepository.update(id, updateLeaveRequestDto);
    return this.leaveRequestRepository.findOne({where: {id}});
  }

  async remove(id: number): Promise<void> {
    const result = await this.leaveRequestRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Leave request with ID ${id} not found`);
    }
  }

  async changeLeaveRequestStatus(id: number, status: ELeaveRequest): Promise<LeaveRequest> {
    const leaveRequest = await this.leaveRequestRepository.findOne({where: {id}});

    if (!leaveRequest) {
      throw new NotFoundException(`Leave request with ID ${id} not found`);
    }

    leaveRequest.status = status;
    return this.leaveRequestRepository.save(leaveRequest);
  }
}
