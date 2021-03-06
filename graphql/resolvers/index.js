const eventResolver = require("./event");
const authResolver = require("./auth");
const rootResolver = {
  Query: {
    events: eventResolver.events
  },
  Mutation: {
    login: authResolver.login,
    createEvent: eventResolver.createEvent,
    creatUser: authResolver.creatUser
  }
};
module.exports = rootResolver;
