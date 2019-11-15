const user = require("./user");
const event = require("./event");
const authData = require("./auth");
module.exports = `



${user}
${authData}
${event}




type Query {
  events:[Event!]!
  
}
type Mutation {
    login(email: String, password: String): AuthData
    creatUser(userInput:UserInput): User
    createEvent(eventInput:EventInput):Event
   
}


schema {
  query: Query
  mutation: Mutation
}
`;
