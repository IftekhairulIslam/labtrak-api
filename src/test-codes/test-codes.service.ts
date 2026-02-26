import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTestCodeDto } from './dto/create-test-code.dto';
import { UpdateTestCodeDto } from './dto/update-test-code.dto';
import { TestCodeWithId } from './test-code.interface';

@Injectable()
export class TestCodesService {
  private testCodes: Map<string, TestCodeWithId> = new Map();

  findAll(): TestCodeWithId[] {
    return Array.from(this.testCodes.values());
  }

  findOne(id: string): TestCodeWithId {
    const item = this.testCodes.get(id);
    if (!item) {
      throw new NotFoundException(`Test code with id "${id}" not found`);
    }
    return item;
  }

  create(dto: CreateTestCodeDto): TestCodeWithId {
    const id = crypto.randomUUID();
    const item: TestCodeWithId = { id, ...dto };
    this.testCodes.set(id, item);
    return item;
  }

  update(id: string, dto: UpdateTestCodeDto): TestCodeWithId {
    const existing = this.findOne(id);
    const updated: TestCodeWithId = { ...existing, ...dto };
    this.testCodes.set(id, updated);
    return updated;
  }

  remove(id: string): void {
    if (!this.testCodes.has(id)) {
      throw new NotFoundException(`Test code with id "${id}" not found`);
    }
    this.testCodes.delete(id);
  }
}
