import "babel-polyfill";
import express from "express";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import bodyParser from "body-parser";
import schema from "./data/schema";
import cors from "cors";
import path from "path";

import scrape from "./scraper";

scrape();

const GRAPHQL_PORT = 3000;

const graphQLServer = express();
graphQLServer.use(cors());

graphQLServer.use(express.static(path.join(__dirname, "build")));

graphQLServer.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));
graphQLServer.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));
graphQLServer.use("/", function(req, res) {
  res.sendFile("build/index.html", {root: __dirname});
});

graphQLServer.listen(GRAPHQL_PORT);
