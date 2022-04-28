const swaggerAutogen = require("swagger-autogen")();

let doc;
if(process.env.NODE_ENV === 'DEV'){
  doc = {
    info: {
      title: "Document upload api",
      description: "Description",
    },
    host: "localhost:3000",
    schemes: ["http"],
  };
}else{
  doc = {
    info: {
      title: "Document upload api",
      description: "Description",
    },
    host: "iim-node-equipe1.herokuapp.com",
    schemes: ["https"],
  };
}

const outputFile = "./docs/swagger.json";
const endpointsFiles = ["./app.js"];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
