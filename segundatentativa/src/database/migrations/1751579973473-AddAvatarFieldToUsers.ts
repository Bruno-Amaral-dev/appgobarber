import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export default class AddAvatarFieldToUsers1751579973473 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('users', new TableColumn({
            name: 'avatar',
            type: 'varchar',
            isNullable: true, // Allow null values for existing users
            default: null // Default value for new users
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'avatar');

    }

}
