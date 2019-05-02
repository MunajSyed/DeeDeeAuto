'use strict';

const { model: User } = require('../routes/users/userModel');

exports.truncate = async () => {
    await User.deleteMany();
  };

  exports.seed = async () => {
    try {
      const userData = [
        {
          email: 'admin@admin.com',
          password: 'admin',
        },
      ];
      const userPromises = userData.map(async (data) => {
        try {
          const user = new User(data);
          return await user.save();
        } catch (e) {
          throw e;
        }
      });
      await Promise.all(userPromises);
  
      console.log('Seeding completed.');
    } catch (e) {
      console.error('Seeding failed...');
      throw e; // This `throw` will be caught in the server.js file
    }
  };