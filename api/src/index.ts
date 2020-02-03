import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as cors from "cors";
import routes from "./routes";

//Connects to the Database -> then starts the express
createConnection()
  .then(async connection => {
    // Create a new express application instance
    const app = express();

    const expressSwagger = require("express-swagger-generator")(app);
    let options = {
      swaggerDefinition: {
        info: {
          description: "NodeJS + ExpressJS + TypeScript + TypeORM + Swagger",
          title: "TS-Express-Boilerplate",
          version: "1.0.0"
        },
        host: "localhost:3030",
        basePath: "",
        produces: ["application/json", "application/xml"],
        schemes: ["http"],
        securityDefinitions: {
          JWT: {
            type: "apiKey",
            in: "header",
            name: "Authorization",
            description: ""
          }
        }
      },
      basedir: __dirname, //app absolute path
      files: ["./routes/*.ts"] //Path to the API handle folder
    };
    expressSwagger(options);

    // Call midlewares
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());

    //Set all routes from routes folder
    app.use("/", routes);

    app.listen(3030, () => {
      console.log("API started on port 3030!");
    });
  })
  .catch(error => console.log(error));
