import express from "express";
import session from "express-session";
import ProductContoller from "./src/controller/productController.js";
import UserController from "./src/controller/user.controller.js";
import path from "path";
import ejsLayouts from "express-ejs-layouts";
import validateRequestBody from "./src/middleware/validateRequest.js";
import { uploadFile } from "./src/middleware/fileUpload.js";
import { auth } from "./src/middleware/authenticate.js";
import cookieParser from "cookie-parser";
import { setLastVisit } from "./src/middleware/LastVisit.js";
const server = express();

//cookie
server.use(cookieParser());

//session

server.use(
  session({
    secret: "SecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
server.use(ejsLayouts);
server.use(express.urlencoded({ extended: true }));
server.use(express.static("src/view"));
server.use(express.static("public"));

server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "view"));

//instance of product controller
const productC = new ProductContoller();
const userC = new UserController();

server.get("/register", userC.getRegister);
server.get("/login", userC.getLogin);
server.get("/logout", userC.logout);
server.post("/register", userC.addUser);
server.post("/login", userC.login);

server.get("/", auth,setLastVisit, productC.getProduct);
server.get("/add-product", auth, productC.getaddProduct);
server.get("/Edit-Page/:id", auth, productC.editProductLoader);

server.post("/delete-product/:id", auth, productC.deleteProduct);
server.post(
  "/",
  auth,
  uploadFile.single("img"),
  validateRequestBody,
  productC.addProduct
);
server.post("/Edit-Page", auth, productC.editProduct);
export default server;
