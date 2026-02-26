import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTestCodeDto } from './dto/create-test-code.dto';
import { UpdateTestCodeDto } from './dto/update-test-code.dto';
import { TestCodeEntity } from './entity/test-code.entity';

@Injectable()
export class TestCodesService {
  constructor(
    @InjectRepository(TestCodeEntity)
    private readonly testCodesRepository: Repository<TestCodeEntity>,
  ) {}

  findAll(): Promise<TestCodeEntity[]> {
    return this.testCodesRepository.find();
  }

  async findOne(id: string): Promise<TestCodeEntity> {
    const item = await this.testCodesRepository.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Test code with id "${id}" not found`);
    }
    return item;
  }

  create(dto: CreateTestCodeDto): Promise<TestCodeEntity> {
    const entity = this.testCodesRepository.create(dto);
    return this.testCodesRepository.save(entity);
  }

  async update(id: string, dto: UpdateTestCodeDto): Promise<TestCodeEntity> {
    const existing = await this.findOne(id);
    const updated = this.testCodesRepository.merge(existing, dto);
    return this.testCodesRepository.save(updated);
  }

  async remove(id: string): Promise<void> {
    const existing = await this.findOne(id);
    await this.testCodesRepository.remove(existing);
  }
}
