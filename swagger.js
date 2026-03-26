const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Students and Courses API',
    description: 'Student and Course Management API'
  },
  host: 'localhost:3003',
  schemes: ['https', 'http']
};

const outputFile = './swagger.json';
const endPointFile = ['./routes/index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, endPointFile, doc);