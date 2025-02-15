import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEmployeeAndCompanyTables1735011400615
  implements MigrationInterface
{
  name = "CreateEmployeeAndCompanyTables1735011400615";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`company\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`userId\` int NULL, UNIQUE INDEX \`REL_c41a1d36702f2cd0403ce58d33\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`employee\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`position\` varchar(255) NOT NULL, \`baseWage\` decimal NOT NULL, \`userId\` int NULL, \`companyId\` int NULL, UNIQUE INDEX \`REL_f4b0d329c4a3cf79ffe9d56504\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`company\` ADD CONSTRAINT \`FK_c41a1d36702f2cd0403ce58d33a\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`employee\` ADD CONSTRAINT \`FK_f4b0d329c4a3cf79ffe9d565047\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`employee\` ADD CONSTRAINT \`FK_26c3d513e0832e5abbbdd3d2a88\` FOREIGN KEY (\`companyId\`) REFERENCES \`company\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`employee\` DROP FOREIGN KEY \`FK_26c3d513e0832e5abbbdd3d2a88\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`employee\` DROP FOREIGN KEY \`FK_f4b0d329c4a3cf79ffe9d565047\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`company\` DROP FOREIGN KEY \`FK_c41a1d36702f2cd0403ce58d33a\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_f4b0d329c4a3cf79ffe9d56504\` ON \`employee\``,
    );
    await queryRunner.query(`DROP TABLE \`employee\``);
    await queryRunner.query(
      `DROP INDEX \`REL_c41a1d36702f2cd0403ce58d33\` ON \`company\``,
    );
    await queryRunner.query(`DROP TABLE \`company\``);
  }
}
