/*!
 * @copyright FLYACTS GmbH 2019
 */

import { MigrationInterface, QueryRunner, Table } from 'typeorm';
// tslint:disable-next-line
import { TableColumnOptions } from 'typeorm/schema-builder/options/TableColumnOptions';

/**
 * The initial migrations
 */
export class Init1549024990655 implements MigrationInterface {
    public async up(queryRunner: QueryRunner) {
        const baseEntitySchema: TableColumnOptions[] = [
            {
                name: 'id',
                isPrimary: true,
                type: 'integer',
                isGenerated: true,
                generationStrategy: 'increment',
            },
            {
                name: 'createdAt',
                type: 'datetime',
                default: 'datetime(\'now\')',
            },
            {
                name: 'updatedAt',
                type: 'datetime',
                default: 'datetime(\'now\')',
            },
        ];

        const ownable: TableColumnOptions[] = [
            {
                name: 'created_by',
                type: 'integer',
                isNullable: true,
            },
            {
                name: 'updated_by',
                type: 'integer',
                isNullable: true,
            },
        ];

        const media = new Table({
            name: 'media',
            columns: [
                ...baseEntitySchema,
                ...ownable,
                {
                    name: 'model',
                    type: 'varchar',
                    length: '255',
                },
                {
                    name: 'model_id',
                    type: 'integer',
                },
                {
                    name: 'collection',
                    type: 'string',
                    length: '255',
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
            ],
        });
        await queryRunner.createTable(media, true);

        const file = new Table({
            name: 'files',
            columns: [
                ...baseEntitySchema,
                ...ownable,
                {
                    name: 'media_id',
                    type: 'integer',
                },
                {
                    name: 'variant',
                    type: 'varchar',
                    length: '255',
                },
                {
                    name: 'content_type',
                    type: 'string',
                    length: '255',
                },
                {
                    name: 'size',
                    type: 'integer',
                },
                {
                    name: 'hash',
                    type: 'varchar',
                    length: '64',
                },
            ],
        });

        await queryRunner.createTable(file, true);
    }

    // tslint:disable-next-line:no-empty
    public async down() { }
}