import supertest from "supertest";
import { expect } from "chai";

const requester = supertest("http://localhost:8080");

describe("test de carts", function () {
  before(async function () {
    const userResponse = await requester.post("/api/auth/register").send({
      first_name: "Prueba",
      last_name: "test",
      email: "algo9@test.com",
      role: "admin",
      age: 20,
      password: "12345678",
    });

    this.userId = userResponse.body;

    const loginResponse = await requester.post("/api/auth/login").send({
      email: "algo9@test.com",
      password: "12345678",
    });

    this.token = loginResponse.headers["set-cookie"][0]
      .split(";")[0]
      .split("=")[1];

    const ProductResponse = await requester
      .post("/api/products")
      .set("Cookie", [`token=${this.token}`]) // <-- usar cookie
      .send({
        title: "Producto de prueba",
        description: "Descripción de prueba",
        price: 100,
        code: "A29",
        status: true,
        stock: 10,
        category: "test",
        thumbnail: ["https://via.placeholder.com/150"],
      });
    if (ProductResponse.body.status === "success") {
      this.productId = ProductResponse.body.data;
    } else {
      console.warn("No se creó el producto:", ProductResponse.body.message);
    }
  });

  after(async function () {
    if (this.productId) {
      await requester
        .delete(`/api/products/${this.productId}`)
        .set("Cookie", [`token=${this.token}`]);
    }

    if (this.userId.data) {
      await requester
        .delete(`/api/users/${this.userId.data}`)
        .set("Cookie", [`token=${this.token}`]);
    }
  });

  it("deberia crear un carrito", async function () {
    const cartResponse = await requester
      .post("/api/carts")
      .set("Cookie", [`token=${this.token}`]);
    expect(cartResponse.status).to.equal(201);
    expect(cartResponse.body.status).to.equal("success");
    expect(cartResponse.body.message).to.equal("Carrito creado correctamente");
    expect(cartResponse.body.data).to.be.an("string");
    this.cartId = cartResponse.body.data;
  });

  it("deberia actualizar un carrito", async function () {
    const cartResponse = await requester
      .put(`/api/carts/${this.cartId}`)
      .set("Cookie", [`token=${this.token}`])
      .send({
        products: [
          {
            product: this.productId,
            quantity: 2,
          },
        ],
      });
    expect(cartResponse.status).to.equal(200);
    expect(cartResponse.body.status).to.equal("success");
    expect(cartResponse.body.data).to.be.an("object");
  });

  it("deberia obtener todos los carritos", async function () {
    const cartResponse = await requester
      .get("/api/carts")
      .set("Cookie", [`token=${this.token}`]);
    expect(cartResponse.status).to.equal(200);
    expect(cartResponse.body.status).to.equal("success");
    expect(cartResponse.body.data).to.be.an("array");
  });

  it("deberia obtener un carrito por id", async function () {
    const cartResponse = await requester
      .get(`/api/carts/${this.cartId}`)
      .set("Cookie", [`token=${this.token}`]);
    expect(cartResponse.status).to.equal(200);
    expect(cartResponse.body.status).to.equal("success");
    expect(cartResponse.body.message).to.equal(
      "Carrito obtenido correctamente"
    );
    expect(cartResponse.body.data).to.be.an("object");
  });

  it("deberia agregar un producto al carrito", async function () {
    const cartResponse = await requester
      .post(`/api/carts/${this.cartId}/product/${this.productId}`)
      .set("Cookie", [`token=${this.token}`])
      .send({
        products: [
          {
            quantity: 1,
          },
        ],
      });
    expect(cartResponse.status).to.equal(201);
    expect(cartResponse.body.status).to.equal("success");
    expect(cartResponse.body.message).to.equal("Producto agregado al carrito");
    expect(cartResponse.body.data).to.be.an("object");
  });

  it("deberia comprar un carrito", async function () {
    const cartResponse = await requester
      .post(`/api/carts/purchase/${this.cartId}`)
      .set("Cookie", [`token=${this.token}`]);
    expect(cartResponse.status).to.equal(201);
    expect(cartResponse.body.status).to.equal("success");
    expect(cartResponse.body.message).to.equal("Compra finalizada");
    expect(cartResponse.body.data).to.be.an("object");
    expect(cartResponse.body.deletedProducts).to.be.an("array");
  });
});
