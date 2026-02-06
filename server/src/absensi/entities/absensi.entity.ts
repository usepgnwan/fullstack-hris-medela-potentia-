import { IsOptional } from 'class-validator';
import { Karyawan } from '../../karyawan/entities/karyawan.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('absensi')
export class Absensi {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Karyawan, (karyawan) => karyawan.absensi, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'karyawan_id' })
  karyawan: Karyawan;
  
  @Column()
  karyawan_id: string;
  
  @IsOptional()
  @Column({ type: 'text' })
  address: string;

  @IsOptional()
  @Column({ type: 'text', nullable: true })
  catatan: string;

  @IsOptional()
  @Column({ type: 'date' })
  date: string;

  @IsOptional()
  @Column({ type: 'text', nullable: true })
  file: string;

  @IsOptional()
  @Column({ type: 'decimal', precision: 10, scale: 7 })
  lat: number;

  @IsOptional()
  @Column({ type: 'decimal', precision: 10, scale: 7 })
  lng: number;

  @IsOptional()
  @Column({ type: 'time' })
  time: string;

  @IsOptional()
  @Column()
  type: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}
