import { Module } from '@nestjs/common';
import { TestCodesController } from './test-codes.controller';
import { TestCodesService } from './test-codes.service';

@Module({
  controllers: [TestCodesController],
  providers: [TestCodesService],
  exports: [TestCodesService],
})
export class TestCodesModule {}
