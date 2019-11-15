const Event = require("../../models/Event");
const User = require("../../models/User");

const { user } = require("./merge");

// context: ({ req, res }) => {
//   if (req.query.accessToken)
//     req.headers = { Authorization: `Apikey ${req.query.accessToken}` };

// };

module.exports = {
  events: _ => {
    return Event.find()
      .then(events => {
        return events.map(event => {
          return {
            ...event._doc
          };
        });
      })
      .catch(err => {
        console.log(err);
      });
  },

  createEvent: (_, args, req) => {
    if (!req.req.isAuth) {
      throw new Error("You need to auth");
    }
    console.log(req.req.userId);

    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      creator: req.req.userId
    });
    let createdEvent;
    return event
      .save()
      .then(result => {
        createdEvent = {
          ...result._doc,
          creator: user.bind(this, result._doc.creator)
        };
        return User.findById(req.req.userId);
      })
      .then(user => {
        if (!user) {
          throw new Error("user not find");
        }
        user.createdEvents.push(event);
        return user.save();
      })
      .then(result => {
        return createdEvent;
      })
      .catch(err => {
        throw err;
      });
  }
};
