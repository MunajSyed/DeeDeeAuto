/*'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose; // const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
});
const Users = mongoose.model('users', userSchema);

/*const commentSchema = new Schema({
  body: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  }
});
//const Comment = mongoose.model('comments', commentSchema);

const url = 'mongodb://localhost:27017/DeeDeeAutomotive';

mongoose.connect(url, { useNewUrlParser: true })
  .then(async () => {
    console.log(`Connected to server: ${url}`);

     const myFriend = new Users({
       firstName: 'Reese',
       lastName: 'Wimbly',
       email: 'e@e.com'
     });
     const friendDoc = await myFriend.save();
    const users = await Users.find();
    console.log(users);

    /*const myComment = new Comment({
      body: "I think you're awesome!",
      // date: '',
      user: '5ca0d434007d744f5f1d5a2b',
    });
    const commentDoc = await myComment.save();

    const comments = await Comment.find();
    console.log(comments);
  })
  .catch((err) => {
    console.error(err);
    throw err;
  });*/

'use strict';

const tokenService = require('../utils/tokenService');
const { HTTP401Error } = require('../utils/httpErrors');

module.exports = async (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    next(new HTTP401Error());
  } else {
    try {
      /* eslint-disable-next-line */
      const [prefix, token] = authHeader.split(' ');
      const decoded = await tokenService.verify(token);

      if (decoded) {
        req.token = decoded;
        next();
      } else {
        next(new HTTP401Error());
      }
    } catch (e) {
      next(e);
    }
  }
};