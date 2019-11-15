const express = require("express");
const bodyParser = require("body-parser");
const { ApolloServer } = require("apollo-server-express");

const mongoose = require("mongoose");

const constants = require("./config/constants");
const typeDefs = require("./graphql/schema/index");
const resolvers = require("./graphql/resolvers/index");
const isAuth = require("./middleware/isAuth");

const app = express();

app.use(bodyParser.json());

app.use(isAuth);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: error => {
    return error;
  },
  context: ({ req, res }) => {
    return {
      req,
      res
    };
  }
});

server.applyMiddleware({ app });

//DB config
const db = constants.DB_URL;
const port = constants.PORT;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("mongo connected");
    app.listen(port, () =>
      console.log(
        `🚀 Server ready at http://localhost:${port}${server.graphqlPath} `
      )
    );
  })
  .catch(err => {
    console.log(err);
  });
