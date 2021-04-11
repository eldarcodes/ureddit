import { Migration } from "@mikro-orm/migrations";

export class Migration20210410220450 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "user" add column "email" text not null;');
    this.addSql(
      'alter table "user" drop constraint if exists "user_created_at_check";'
    );
    this.addSql(
      'alter table "user" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));'
    );
    this.addSql(
      'alter table "user" alter column "created_at" set default \'NOW()\';'
    );
    this.addSql(
      'alter table "user" drop constraint if exists "user_updated_at_check";'
    );
    this.addSql(
      'alter table "user" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));'
    );
    this.addSql(
      'alter table "user" alter column "updated_at" set default \'NOW()\';'
    );
    this.addSql(
      'alter table "user" add constraint "user_email_unique" unique ("email");'
    );

    this.addSql(
      'alter table "post" drop constraint if exists "post_created_at_check";'
    );
    this.addSql(
      'alter table "post" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));'
    );
    this.addSql(
      'alter table "post" alter column "created_at" set default \'NOW()\';'
    );
    this.addSql(
      'alter table "post" drop constraint if exists "post_updated_at_check";'
    );
    this.addSql(
      'alter table "post" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));'
    );
    this.addSql(
      'alter table "post" alter column "updated_at" set default \'NOW()\';'
    );

    this.addSql('alter table "user" drop constraint "user_password_unique";');
  }
}
