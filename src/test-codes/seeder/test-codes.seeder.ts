import { Injectable } from '@nestjs/common';
import { TestCodesService } from '../test-codes.service';
import * as testCodesData from '../data/test-codes.json';

@Injectable()
export class TestCodesSeeder {
  constructor(private readonly testCodesService: TestCodesService) {}

  async seed(): Promise<void> {
    try {
      const existingCount = (await this.testCodesService.findAll()).length;

      if (existingCount > 0) {
        console.log('Test codes already exist. Skipping seed.');
        return;
      }

      console.log('Seeding test codes...');

      for (const testCode of testCodesData) {
        await this.testCodesService.create(testCode);
      }

      console.log(`Successfully seeded ${testCodesData.length} test codes.`);
    } catch (error) {
      console.error('Error seeding test codes:', error);
      throw error;
    }
  }
}
