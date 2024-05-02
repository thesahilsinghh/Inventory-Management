import { body, validationResult } from "express-validator";

const validateRequestBody = async (req, res, next) => {
  
  const rules = [
    body("name").notEmpty().withMessage("Name is required"),
    body("description")
      .notEmpty()
      .isLength({ gt: 10 })
      .withMessage("Description should contain at least 10 characters"),
    body("price").isFloat({ gt: 0 }).withMessage("Price cannot be less than 1"),
    body("img").custom((value,{req})=>{
      if(!req.file){
        throw new Error('Image is Required');
      }
      return true;
    }),
  ];

  //2. run those rules

  await Promise.all(rules.map((rule) => rule.run(req)));

  //3. check for error messages after running rules

  let validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    // let status = false;
    return res.status(401).render("addProduct", {
      error: validationErrors.array()[0].msg,
    });
  } else {
    next();
  }
};

export default validateRequestBody;
