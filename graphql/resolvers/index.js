const eventResolver = require("./event");
const authResolver = require("./auth");
const rootResolver = {
  Query: {
    events: eventResolver.events
  },
  Mutation: {
    login: authResolver.login,
    createEvent: eventResolver.createEvent
  }
};
module.exports = rootResolver;
