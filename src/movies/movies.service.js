const db = require("../db/connection");

async function list(is_showing) {
  return db("movies")
    .select("movies.*")
    .modify((queryBuilder) => {
      if (is_showing) {
        queryBuilder
          .join(
            "movies_theaters",
            "movies.movie_id",
            "movies_theaters.movie_id"
          )
          .where({ "movies_theaters.is_showing": true })
          .groupBy("movies.movie_id");
      }
    });
}

async function read(movie_id) {
  return db("movies").select("*").where({ movie_id }).first();
}

async function listTheaters(movie_id) {
  return db("theaters")
    .join("movies_theaters", "theaters.theater_id", "movies_theaters.theater_id")
    .select("theaters.*", "movies_theaters.is_showing", "movies_theaters.movie_id")
    .where({ "movies_theaters.movie_id": movie_id });
}

async function listReviews(movie_id) {
  const reviews = await db("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select(
      "r.*",
      "c.critic_id as critic:critic_id",
      "c.preferred_name as critic:preferred_name",
      "c.surname as critic:surname",
      "c.organization_name as critic:organization_name",
      "c.created_at as critic:created_at",
      "c.updated_at as critic:updated_at"
    )
    .where({ "r.movie_id": movie_id });

  return reviews.map((review) => {
    const critic = {
      critic_id: review["critic:critic_id"],
      preferred_name: review["critic:preferred_name"],
      surname: review["critic:surname"],
      organization_name: review["critic:organization_name"],
      created_at: review["critic:created_at"],
      updated_at: review["critic:updated_at"]
    };
    delete review["critic:critic_id"];
    delete review["critic:preferred_name"];
    delete review["critic:surname"];
    delete review["critic:organization_name"];
    delete review["critic:created_at"];
    delete review["critic:updated_at"];
    return { ...review, critic };
  });
}

module.exports = {
  list,
  read,
  listTheaters,
  listReviews,
};