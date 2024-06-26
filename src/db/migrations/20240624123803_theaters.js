exports.up = async function(knex) {
  const exists = await knex.schema.hasTable("theaters");
  if (!exists) {
    return knex.schema.createTable("theaters", (table) => {
      table.increments("theater_id").primary();
      table.string("name").notNullable();
      table.string("address_line_1").notNullable();
      table.string("address_line_2");
      table.string("city").notNullable();
      table.string("state").notNullable();
      table.string("zip").notNullable();
      table.timestamps(true, true);
    });
  }
};

exports.down = async function(knex) {
  const exists = await knex.schema.hasTable("theaters");
  if (exists) {
    return knex.schema.dropTable("theaters");
  }
};
