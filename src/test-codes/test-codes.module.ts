import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestCodesController } from './test-codes.controller';
import { TestCodesService } from './test-codes.service';
import { TestCodeEntity } from './test-code.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TestCodeEntity])],
  controllers: [TestCodesController],
  providers: [TestCodesService],
  exports: [TestCodesService],
})
export class TestCodesModule {}
