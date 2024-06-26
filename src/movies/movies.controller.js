const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(request, response, next) {
  const { movieId } = request.params;
  const movie = await service.read(movieId);

  if (movie) {
    response.locals.movie = movie;
    return next();
  }
  return next({ status: 404, message: `Movie not found: ${movieId}` });
}

async function read(request, response) {
  const { movie: data } = response.locals;
  response.json({ data });
}


async function list(request, response) {
  const is_showing = request.query.is_showing === "true";
  const data = await service.list(is_showing);
  response.json({ data });
} 

async function listTheaters(request, response) {
  const { movieId } = request.params;
  const data = await service.listTheaters(movieId);
  response.json({ data });
}

async function listReviews(request, response) {
  const { movieId } = request.params;
  const data = await service.listReviews(movieId);
  response.json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
  listTheaters: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listTheaters)],
  listReviews: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listReviews)],
};
