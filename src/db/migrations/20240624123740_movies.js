exports.up = async function(knex) {
  const exists = await knex.schema.hasTable("movies");
  if (!exists) {
    return knex.schema.createTable("movies", (table) => {
      table.increments("movie_id").primary();
      table.string("title").notNullable();
      table.integer("runtime_in_minutes").notNullable();
      table.enum("rating", ["G", "PG", "PG-13", "R", "NC-17", "NR"]).notNullable();
      table.text("description").notNullable();
      table.string("image_url").notNullable();
      table.timestamps(true, true);
    });
  }
};

exports.down = async function(knex) {
  const exists = await knex.schema.hasTable("movies");
  if (exists) {
    return knex.schema.dropTable("movies");
  }
};
