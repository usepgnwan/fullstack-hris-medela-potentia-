import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1770398475729 implements MigrationInterface {
    name = 'Init1770398475729'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "absensi" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "karyawan_id" uuid NOT NULL, "address" text NOT NULL, "catatan" text, "date" date NOT NULL, "file" text, "lat" numeric(10,7) NOT NULL, "lng" numeric(10,7) NOT NULL, "time" TIME NOT NULL, "type" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_518518f9aeb10970130bbe30e8f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "karyawan" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nama" character varying NOT NULL, "username" character varying NOT NULL, "password" text NOT NULL, "jabatan" character varying NOT NULL, "role" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_5259c7c947b59c330765c613f41" UNIQUE ("username"), CONSTRAINT "PK_fdb8d1ca3cdb99f669a0d9085a9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "absensi" ADD CONSTRAINT "FK_53ed6bfdb8d23838c6fa2b48853" FOREIGN KEY ("karyawan_id") REFERENCES "karyawan"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "absensi" DROP CONSTRAINT "FK_53ed6bfdb8d23838c6fa2b48853"`);
        await queryRunner.query(`DROP TABLE "karyawan"`);
        await queryRunner.query(`DROP TABLE "absensi"`);
    }

}
