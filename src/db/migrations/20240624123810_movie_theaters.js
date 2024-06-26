exports.up = async function(knex) {
  const exists = await knex.schema.hasTable("movies_theaters");
  if (!exists) {
    return knex.schema.createTable("movies_theaters", (table) => {
      table.integer("movie_id").unsigned().notNullable().references("movie_id").inTable("movies").onDelete("CASCADE");
      table.integer("theater_id").unsigned().notNullable().references("theater_id").inTable("theaters").onDelete("CASCADE");
      table.boolean("is_showing").defaultTo(false);
      table.timestamps(true, true);
    });
  }
};

exports.down = async function(knex) {
  const exists = await knex.schema.hasTable("movies_theaters");
  if (exists) {
    return knex.schema.dropTable("movies_theaters");
  }
};
