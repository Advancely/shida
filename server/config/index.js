module.exports = {
  port: 27017,
  mongodb: {
    url: "mongodb://localhost:27017/ffcreator",
    options: {}
  },
  middleware: ["handlerError"],
  jwt: { secret: "ffcreator" },
  crypto: { secret: "#*#*ffcreator*#*#" },
  baseUrl: ""
};
