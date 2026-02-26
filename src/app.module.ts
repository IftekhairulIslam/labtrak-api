import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestCodesModule } from './test-codes/test-codes.module';

@Module({
  imports: [TestCodesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
