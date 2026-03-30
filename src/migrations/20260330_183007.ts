import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`posts\` ADD \`_order\` text;`)
  await db.run(sql`CREATE INDEX \`posts__order_idx\` ON \`posts\` (\`_order\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP INDEX \`posts__order_idx\`;`)
  await db.run(sql`ALTER TABLE \`posts\` DROP COLUMN \`_order\`;`)
}
