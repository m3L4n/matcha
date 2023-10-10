const express = require("express");
const app = express();
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { deletedataExpiredFromToken } = require("./db/updateExpiredData");
const userRouter = require("./routes/users/users");
const matchRouter = require("./routes/match");
const tagsRouter = require("./routes/tags");
const swaggerDocument = require("./swagger.json");
app.use(express.json());

app.use(cors({ credentials: true, origin: ["http://localhost:3000"] }));

app.use(cookieParser());
app.use(morgan("dev"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/users", userRouter);
app.use("/match", matchRouter);
app.use("/tags", tagsRouter);
app.use(function (_, res, next) {
  res.header("content-type", "application/json;charset=utf-8");
  res.header("access-control-allow-credentials", true);
  res.header("access-control-allow-headers", "origin, x-requested-with, content-type, accept");
  next();
});
setInterval(deletedataExpiredFromToken, 60 * 60 * 1000);

module.exports = app;
