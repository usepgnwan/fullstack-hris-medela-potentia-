import { Absensi } from '../../absensi/entities/absensi.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity('karyawan')
export class Karyawan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nama: string;

  @Column({ unique: true })
  username: string;

    @Column({ type: 'text' })
    password: string;

  @Column()
  jabatan: string;

  @Column()
  role: string;

  @CreateDateColumn()
  created_at: Date;
  
  @UpdateDateColumn()
  update_at: Date;

  @OneToMany(() => Absensi, (log) => log.karyawan)
  absensi: Absensi[];
}