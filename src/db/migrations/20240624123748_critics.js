exports.up = async function(knex) {
  const exists = await knex.schema.hasTable("critics");
  if (!exists) {
    return knex.schema.createTable("critics", (table) => {
      table.increments("critic_id").primary();
      table.string("preferred_name").notNullable();
      table.string("surname").notNullable();
      table.string("organization_name").notNullable();
      table.timestamps(true, true);
    });
  }
};

exports.down = async function(knex) {
  const exists = await knex.schema.hasTable("critics");
  if (exists) {
    return knex.schema.dropTable("critics");
  }
};
