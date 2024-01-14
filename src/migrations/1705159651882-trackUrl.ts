import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class TrackUrl1705159651882 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'url_track',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            generationStrategy: 'increment',
          },
          {
            name: 'id_url',
            type: 'integer',
          },
          {
            name: 'count',
            type: 'integer',
            isNullable: false,
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
          {
            name: 'updatedtime',
            type: 'timestamptz',
            default: 'NOW()',
          },
        ],
      }),
    );
    await queryRunner.createForeignKeys('url_track', [
      new TableForeignKey({
        columnNames: ['id_url'],
        referencedColumnNames: ['id'],
        referencedTableName: 'transform_url',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('url_track');
  }
}
