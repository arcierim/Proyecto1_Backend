module.exports = {
  mongoURI: process.env.MONGO_URI || "tu_url_de_conexión_a_MongoDB",
  jwtSecret: process.env.JWT_SECRET || "tu_secreto_para_firmar_tokens_JWT",
};
