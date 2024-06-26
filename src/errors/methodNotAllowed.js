function methodNotAllowed(request, response, next) {
  const error = {
    status: 405,
    message: `${request.method} not allowed for ${request.originalUrl}`,
  };
  response.status(405).json({ error: error.message });
}

module.exports = methodNotAllowed;