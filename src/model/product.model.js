export default class ProductModel {
  constructor(_id, _name, _desc, _price, _imageUrl) {
    this.id = _id;
    this.name = _name;
    this.desc = _desc;
    this.price = _price;
    this.imageUrl = _imageUrl;
  }
  static get() {
    return products;
  }
  static add(productObj, img) {
    let id = products.length + 1;
    let newProduct = new ProductModel(
      id,
      productObj.name,
      productObj.description,
      productObj.price,
      img
    );
    products.push(newProduct);
  }
  static searchProduct(id) {
    const index = products.findIndex((item) => {
      return id == item.id;
    });
    return products[index];
  }
  static edit(body) {
    const index = products.findIndex((item) => {
      return body.id == item.id;
    });
    let newProduct = new ProductModel(
      body.id,
      body.name,
      body.description,
      body.price,
      body.img
    );
    products[index] = newProduct;
  }

  static delete(id) {
    const index = products.findIndex((item) => {
      return id == item.id;
    });
    products.splice(index)
  }
}

var products = [
  new ProductModel(
    1,
    "Product 1",
    "Description for Product 1",
    19.99,
    "https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg"
  ),
  new ProductModel(
    2,
    "Product 2",
    "Description for Product 2",
    29.99,
    "https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg"
  ),
  new ProductModel(
    3,
    "Product 3",
    "Description for Product 3",
    39.99,
    "https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg"
  ),
];
