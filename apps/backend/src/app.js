const express = require("express");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const os = require("os");
const formData = require("express-form-data");
const httpStatus = require("http-status");

const config = require("./config/config");
const morgan = require("./config/morgan");
// const { authLimiter } = require("./middlewares/rateLimiter");
// const routes = require("./routes/v1");
const { errorConverter, errorHandler } = require("./middlewares/error");
const ApiError = require("./utils/ApiError");
const cors = require("cors");
const { readdirSync } = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();

if (config.env !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

app.use(helmet());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(mongoSanitize());
app.use(compression());

const options = {
  uploadDir: os.tmpdir(),
  autoClean: true,
};

app.use(formData.parse(options));

app.use(cors());
app.options("*", cors());

app.set("trust proxy", true);

//   if (config.env !== "production") {
//     app.use("/v1/auth", authLimiter);
//   }

app.use("/public", express.static(path.join(__dirname, "public")));

const routesPath = path.join(__dirname, "routes");
readdirSync(routesPath).map((r) => app.use("/api", require("./routes/" + r)));

app.use(function (req, res) {
  res.send({ test: "hello world!" });
});

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});
app.use(errorConverter);
app.use(errorHandler);

module.exports = app;
