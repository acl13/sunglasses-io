const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml"); // Replace './swagger.yaml' with the path to your Swagger file
const app = express();

app.use(bodyParser.json());

// Importing the data from JSON files
const users = require("../initial-data/users.json");
const brands = require("../initial-data/brands.json");
const products = require("../initial-data/products.json");

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/brands", (request, response) => {
  response.send(brands);
  return response.end();
});

app.get("/products", (request, response) => {
  response.send(products);
  return response.end();
});

app.get("/brands/:id/products", (request, response) => {
  // Get all products that match the brand id
  // The sample data provided has a categoryId property that aligns with the brand id numbers - I think it would be better named "brandId" but chose not to change the existing data
  const filteredProducts = products.filter((product) => {
    return product.categoryId == request.params.id;
  });

  response.send(filteredProducts);
  return response.end();
});

// Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
