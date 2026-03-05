import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestCodesController } from './test-codes.controller';
import { TestCodesService } from './test-codes.service';
import { TestCodeEntity } from './entity/test-code.entity';
import { TestCodesSeeder } from './seeder/test-codes.seeder';

@Module({
  imports: [TypeOrmModule.forFeature([TestCodeEntity])],
  controllers: [TestCodesController],
  providers: [TestCodesService, TestCodesSeeder],
  exports: [TestCodesService],
})
export class TestCodesModule {
  constructor() {}
}
