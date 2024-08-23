import BookRepository from "../model/books/product.model.js";
import ProductModel from "../model/books/product.model.js";

export default class ProductContoller {
  bookRepo = new BookRepository();
  //get requests
  getaddProduct(req, res) {
    res.render("addProduct", { error: null, userEmail: req.session.userEmail });
  }

  async getAll(req, res) {
    const product = await this.bookRepo.getAll();
    res.render("product", {
      products: product,
      userEmail: req.session.userEmail,
    });
  }

  //posts and other requests

  async addProduct(req, res, next) {
    try {
      const img = "images/" + req.file.filename;
      await this.bookRepo.add(req.body, img);
      const product = ProductModel.get();
      res.render("product", {
        products: product,
        userEmail: req.session.userEmail,
      });
    } catch (err) {
      console.log(err);
      next();
    }
  }

  async editProductLoader(req, res, next) {
    try {
      const id = req.params.id;
      const product = await this.bookRepo.searchBook(id);
      if (product) {
        res.render("Edit-Page", {
          product: product,
          status: true,
          userEmail: req.session.userEmail,
        });
      } else {
        res.status(404).send("product not found");
      }
    } catch (err) {
      console.log(err);
      next();
    }
  }
  async editProduct(req, res, next) {
    try {
      await this.bookRepo.update(req.body);
      const product = await this.bookRepo.getAll();
      res.render("product", {
        products: product,
        userEmail: req.session.userEmail,
      });
    } catch (err) {
      console.log(err);
      next();
    }
  }
  async deleteProduct(req, res, next) {
    const id = req.params.id;
    await this.bookRepo.delete(id);
    const product = await this.bookRepo.getAll();
    res.render("product", {
      products: product,
      userEmail: req.session.userEmail,
    });
  }
}
