'use strict';

const express = require('express');
const http = require('http');
const mongoose = require('mongoose').set('debug', true);
const bodyParser = require('body-parser');
const path = require('path');
// 1. Create main express intance
const router = express();

// 2. Require utility function for adding middleware
const { applyMiddleware } = require('./utils');

// 3a. Require general middleware
const middleWare = require('./middleware');
// 3b. Require error handling middleware
const errorHandlers = require('./middleware/errorHandlers');

// 4. Require routes
const { router: userRoutes } = require('./routes/users/userRoute');
const { router: carRoutes } = require('./routes/cars/carRoute');
const { router: dealerRoutes } = require('./routes/dealers/dealerRoute');

// 5. Require conatants
const { PORT, URL } = require('./utils/constants');

// 6. Apply general middleware
applyMiddleware(middleWare, router);

const publicFolder = path.resolve(__dirname, '..', 'build')
router.use('/', express.static(publicFolder));

// 7. Utilise routes
router.use('/api/users', userRoutes);
router.use('/api/cars', carRoutes);
router.use('/api/dealers', dealerRoutes);

router.use('/*', (req,res,next) => {
  const indexFile = path.resolve(publicFolder, 'index.html');
  res.sendFile(indexFile);
})
// 8. Apply error handling middleware (meaningfully last)
applyMiddleware(errorHandlers, router);

// 9. Create a server from express instance
const server = http.createServer(router);

// 10. Start server
mongoose.connect(URL, { useNewUrlParser: true })
  .then(async () => {
    await require('./utils/seed').truncate();
    await require('./utils/seed').seed();
    server.listen(PORT, () => {
      console.log(`Server is running on PORT:${PORT}`);
      if (process.send) {
        // NOTE: process is being run by pm2
        process.send('ready');
      }
    })
  })
  .catch((err) => {
    console.log(err);
    throw err;
  })

