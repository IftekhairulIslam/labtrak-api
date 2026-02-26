import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { TestCodesSeeder } from '../test-codes/seeder/test-codes.seeder';

@Injectable()
export class SeedCommand {
  constructor(private readonly testCodesSeeder: TestCodesSeeder) {}

  @Command({
    command: 'seed:test-codes',
    describe: 'Seed test codes from JSON file',
  })
  async seed() {
    await this.testCodesSeeder.seed();
  }
}
