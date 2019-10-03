const Event = require("../../models/Event");
const User = require("../../models/User");

const { user } = require("./merge");

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
    if (!req.isAuth) {
      throw new Error("You need to auth");
    }
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      creator: req.userId
    });
    let createdEvent;
    return event
      .save()
      .then(result => {
        createdEvent = {
          ...result._doc,
          creator: user.bind(this, result._doc.creator)
        };
        return User.findById(req.userId);
      })
      .then(user => {
        if (!user) {
          throw new Error("user not find");
        }
        user.createdEvents.push(event);
        return user.save();
      })
      .then(result => {
        console.log(result);
        return createdEvent;
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  }
};
