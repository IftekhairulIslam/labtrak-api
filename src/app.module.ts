import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestCodesModule } from './test-codes/test-codes.module';
import { TestCodeEntity } from './test-codes/test-code.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST ?? 'localhost',
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
      username: process.env.DB_USER ?? 'user_name',
      password: process.env.DB_PASSWORD ?? 'user_password',
      database: process.env.DB_NAME ?? 'labtrak',
      entities: [TestCodeEntity],
      synchronize: false,
    }),
    TestCodesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    console.log(process.env);
  }
}
