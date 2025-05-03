import { ProductDao } from "../dao/repositories/product.dao.js";

const productDao = new ProductDao();
export class ProductController {
  async getAll(req, res) {
    let { limit, page, sort } = req.query;

    try {
      const products = await productDao.getAll(limit, page, sort);
      res.send({ status: "success", data: products });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req, res) {
    const { pid } = req.params;
    try {
      const product = await productDao.getById(pid);
      res.send({ status: "success", data: product });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async create(req, res) {
    const product = req.body;

    try {
      const newProduct = await productDao.create(product);

      if (!newProduct) {
        return res
          .status(400)
          .json({ status: "error", message: "No se pudo crear el producto" });
      }

      if (newProduct._id === undefined) {
        return res
          .status(400)
          .json({ status: "error", message: "No se pudo crear el producto" });
      }

      res
        .status(201)
        .json({ status: "success", data: newProduct._id.toString() });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({
          status: "error",
          message: "Ya existe un producto con ese código",
        });
      }

      res.status(500).json({ message: error.message });
    }
  }

  async update(req, res) {
    const { pid } = req.params;
    const product = { ...req.body };
  
    delete product.code;
    delete product._id;
  
    try {
      const updatedProduct = await productDao.update(pid, product);
      res.send({ status: "success", data: updatedProduct });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  

  async delete(req, res) {
    const { pid } = req.params;
    try {
      if (!pid || pid === "undefined") {
        return res
          .status(400)
          .json({
            status: "error",
            message: "No se pudo eliminar el producto",
          });
      }
      await productDao.delete(pid);
      res.send({
        status: "success",
        message: "Producto eliminado correctamente",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
