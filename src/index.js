const app = require('./app');
// const config = require('./config/config');
// const logger = require('./config/logger');

const exitHandler = () => {
  // if (server) {
  //   server.close(() => {
  //     logger.info('Server closed');
  //     process.exit(1);
  //   });
  // } else {
  // }
  process.exit(1);
};

// const unexpectedErrorHandler = (error) => {
//   logger.error(error);
//   exitHandler();
// };
// process.on('uncaughtException', unexpectedErrorHandler);
// process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  // if (server) {
  //   server.close();
  // }
});

// NEW
// const db = require('./queries')
// const dbItems = require('./items-queries')
const port = 3000
//
// app.get('/', (request, response) => {
//   response.json({ info: 'Node.js, Express, and Postgres API' })
// })
//
// app.get('/items', dbItems.getItems)
// app.get('/items/:id', dbItems.getItemById)
// app.post('/items', dbItems.createItem)
// app.put('/items/:id', dbItems.updateItem)
// app.delete('/items/:id', dbItems.deleteItem)
//
// app.get('/users', db.getUsers)
// app.get('/users/:id', db.getUserById)
// app.post('/users', db.createUser)
// app.put('/users/:id', db.updateUser)
// app.delete('/users/:id', db.deleteUser)
//

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
