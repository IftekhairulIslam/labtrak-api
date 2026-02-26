import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTestCodeDto } from './dto/create-test-code.dto';
import { UpdateTestCodeDto } from './dto/update-test-code.dto';
import type { TestCodeWithId } from './test-code.interface';
import { TestCodesService } from './test-codes.service';

@Controller('test-codes')
export class TestCodesController {
  constructor(private readonly testCodesService: TestCodesService) {}

  @Get()
  findAll(): TestCodeWithId[] {
    return this.testCodesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): TestCodeWithId {
    return this.testCodesService.findOne(id);
  }

  @Post()
  create(@Body() createTestCodeDto: CreateTestCodeDto): TestCodeWithId {
    return this.testCodesService.create(createTestCodeDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTestCodeDto: UpdateTestCodeDto,
  ): TestCodeWithId {
    return this.testCodesService.update(id, updateTestCodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    return this.testCodesService.remove(id);
  }
}
