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
import { TestCodesService } from './test-codes.service';
import { TestCodeEntity } from './entity/test-code.entity';
import { TestCodesSeeder } from './seeder/test-codes.seeder';

@Controller('test-codes')
export class TestCodesController {
  constructor(
    private readonly testCodesService: TestCodesService,
    private readonly testCodesSeeder: TestCodesSeeder,
  ) {}

  @Get('create-data')
  async createData(): Promise<TestCodeEntity[]> {
    await this.testCodesSeeder.seed();
    return this.testCodesService.findAll();
  }

  @Get()
  findAll(): Promise<TestCodeEntity[]> {
    return this.testCodesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<TestCodeEntity> {
    return this.testCodesService.findOne(id);
  }

  @Post()
  create(
    @Body() createTestCodeDto: CreateTestCodeDto,
  ): Promise<TestCodeEntity> {
    return this.testCodesService.create(createTestCodeDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTestCodeDto: UpdateTestCodeDto,
  ): Promise<TestCodeEntity> {
    return this.testCodesService.update(id, updateTestCodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.testCodesService.remove(id);
  }
}
