import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class TransformUrl1705159623316 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'transform_url',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            generationStrategy: 'increment',
          },
          {
            name: 'original_url',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'short_url',
            type: 'varchar',
            length: '255',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'user_id',
            type: 'integer',
          },
          {
            name: 'createdtime',
            type: 'timestamptz',
            default: 'NOW()',
          },
          {
            name: 'createdby',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
        ],
      }),
    );
    await queryRunner.createForeignKeys('transform_url', [
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedTableName: 'user',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('transform_url');
  }
}
