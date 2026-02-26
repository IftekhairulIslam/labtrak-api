import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'test_codes' })
export class TestCodeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  code: string;

  @Column({ length: 255 })
  name: string;

  @Column({ name: 'dep_name', length: 255 })
  depName: string;

  @Column({ length: 255 })
  synonym: string;
}
