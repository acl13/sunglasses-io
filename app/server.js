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

// const authenticate = (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1]; // Bearer <token>
//     const decoded = jwt.verify(token, "secretKey");
//     req.userId = decoded.userId;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Authentication failed" });
//   }
// };

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

  if (filteredProducts.length === 0) {
    response.status(404);
    response.send({ message: "No products found" });
    return response.end();
  } else {
    response.send(filteredProducts);
    return response.end();
  }
});

let token = jwt.sign("user", "secretKey");
console.log(token);

app.post("/login", (request, response) => {
  const { username, password } = request.body;

  const user = users.find((user) => {
    return user.login.username == username && user.login.password == password;
  });

  if (!username || !password) {
    response.status(401);
    response.send({ message: "Both a username and password are required" });
    return response.end();
  }

  if (user) {
    let token = jwt.sign({ user }, "secretKey", { expiresIn: "1hr" });
    response.status(200);
    response.set("Authorization", token);
    response.send(user);
    return response.end();
  } else {
    response.status(401);
    response.send({ message: "Incorrect username or password" });
    return response.end();
  }
});

// Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
