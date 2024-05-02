import ProductModel from "../model/product.model.js";

export default class ProductContoller {
  getProduct(req, res) {
    const product = ProductModel.get();
    res.render("product", { products: product,userEmail:req.session.userEmail });
  }


  getaddProduct(req, res) {
    res.render("addProduct", { error:null,userEmail:req.session.userEmail});
  }

  
  addProduct(req, res) {
    const img = "images/" + req.file.filename;
    ProductModel.add(req.body,img);
    const product = ProductModel.get();
    res.render("product", { products: product,userEmail:req.session.userEmail });
  }

  editProductLoader(req, res) {
    const id = req.params.id;
    const product = ProductModel.searchProduct(id);
    if (product) {
      res.render("Edit-Page", { product: product, status: true ,userEmail:req.session.userEmail});
    } else {
      res.status(401).send("product not found");
    }
  }
  editProduct(req, res) {
    console.log(req.body);
    ProductModel.edit(req.body);
    const product = ProductModel.get();
    res.render("product", { products: product ,userEmail:req.session.userEmail});
  }
  deleteProduct(req, res) {
    const id = req.params.id;
    ProductModel.delete(id);
    const product = ProductModel.get();
    res.render("product", { products: product ,userEmail:req.session.userEmail});
  }
}
