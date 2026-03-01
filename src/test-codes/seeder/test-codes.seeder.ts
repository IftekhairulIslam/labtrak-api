import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TestCodeEntity } from '../entity/test-code.entity';
import * as fs from 'fs';
import * as path from 'path';
import { TestCode } from '../interface/test-code.interface';

@Injectable()
export class TestCodesSeeder {
  private readonly logger = new Logger(TestCodesSeeder.name);

  constructor(
    @InjectRepository(TestCodeEntity)
    private readonly testCodesRepository: Repository<TestCodeEntity>,
  ) {}

  async seed(): Promise<void> {
    try {
      const existingCount = await this.testCodesRepository.count();

      if (existingCount > 0) {
        this.logger.log('✓ Test codes already exist. Skipping seed.');
        return;
      }

      this.logger.log('🌱 Starting to seed test codes...');

      // Read JSON file from dist folder or src folder
      let jsonPath = path.join(__dirname, '../data/test-codes.json');

      // If file doesn't exist in dist, try src location
      if (!fs.existsSync(jsonPath)) {
        jsonPath = path.join(
          __dirname,
          '../../test-codes/data/test-codes.json',
        );
      }

      if (!fs.existsSync(jsonPath)) {
        throw new Error(`test-codes.json not found at ${jsonPath}`);
      }

      const jsonData = fs.readFileSync(jsonPath, 'utf-8');
      const testCodesData = JSON.parse(jsonData) as TestCode[];

      if (!Array.isArray(testCodesData)) {
        throw new Error('Test codes data must be an array');
      }

      // Bulk insert for better performance
      await this.testCodesRepository.insert(testCodesData);

      this.logger.log(
        `✅ Successfully seeded ${testCodesData.length} test codes.`,
      );
    } catch (error) {
      this.logger.error('❌ Error seeding test codes:', error);
      throw error;
    }
  }
}
