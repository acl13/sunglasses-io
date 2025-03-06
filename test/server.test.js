const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app/server"); // Adjust the path as needed

const should = chai.should();
chai.use(chaiHttp);

// TODO: Write tests for the server

describe("Brands", () => {
  describe("/GET brands", () => {
    it("should GET all the brands", (done) => {
      chai
        .request(server)
        .get("/brands")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("array");
          res.body.length.should.be.eql(5);
          done();
        });
    });
  });

  describe("/GET brands/:id/products", () => {
    it("should GET all the products for a specific brand", (done) => {
      chai
        .request(server)
        .get("/brands/1/products")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("array");
          res.body.length.should.be.eql(3);
          done();
        });
    });
  });
});

describe("Products", () => {
  describe("/GET products", () => {
    it("should GET all the products", (done) => {
      chai
        .request(server)
        .get("/products")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("array");
          res.body.length.should.be.eql(11);
          done();
        });
    });
  });
});

describe("Login", () => {
  // describe("/POST login", () => {
  //   it("logs in an authenticated user", (done) => {
  //get login info from request params
  //     //Write test logic here
  //     done();
  //   });
  // });
});

describe("Cart", () => {
  // describe('/GET me/cart', () => {
  //   it('gets the cart for an authenticated user', () => {
  //     //arrange: login user/get user cart
  //     // write test logic here
  //     done()
  //   })
  // })
  //
  //
  //
  // describe("/POST me/cart", () => {
  //   it("adds an item to user's cart", (done) => {
  //     //arrange: login user, need product id in request body?
  //     //write test logic here
  //     done();
  //   });
  // });
  //
  //
  //
  // describe("/POST me/cart/:productId", () => {
  //   it("Updates the quantity of a particular item in the user's cart", (done) => {
  //     // arrange: login user
  //     // will need to check cart quantity?
  //     // write test logic here
  //     done();
  //   });
  // });
  //
  //
  //
  // describe("/DELETE me/cart/:productId", () => {
  //   it("deletes an item from the cart", (done) => {
  //     // arrange: login user
  //     // write test logic here
  //     done();
  //   });
  // });
});
