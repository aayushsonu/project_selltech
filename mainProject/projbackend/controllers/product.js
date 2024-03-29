const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const { sortBy } = require("lodash");
const category = require("../models/category");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, prod) => {
      if (err || !prod) {
        return res.status(400).json({
          error: "Product Not Found!",
        });
      }
      req.product = prod;
      next();
    });
};

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  // Parsing the image
  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Problem With Image",
      });
    }

    console.log(fields); // just for checking what inside the fields

    // destructuring the fields
    const { name, description, category, stock, price } = fields;

    // restriction on field
    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        error: "Please include all fields",
      });
    }

    // create a new product in database
    let product = new Product(fields);

    // handling the file
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    // save to DB
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Not able to save this product",
        });
      }
      res.json(product);
    });
  });
};

exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

exports.deleteProduct = (req, res) => {
  const product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete",
      });
    }
    return res.json({
      message: "Successfully Deleted",
      deletedProduct,
    });
  });
};

exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  // Parsing the image
  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Problem With Image",
      });
    }

    // grab the product from database through params and update using loadash
    let product = req.product;
    product = _.extend(product, fields);

    // handling the file
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    // save to DB
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Updation of Product failed",
        });
      }
      res.json(product);
    });
  });
};

// product Listing
exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 100;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
      if (err || !products) {
        return res.status(400).json({
          error: "NO product Found",
        });
      }
      res.json(products);
    });
};

exports.getAllUniqueCategories = (req, res) => {
  Product.distinct("category", {}, (err, category) => {
    if (err) {
      return res.status(400).json({
        error: "NO category found",
      });
    }
    res.json(category);
  });
};

exports.updateStock = (req, res, next) => {
  let myOperation = req.body.order.products.map((prod) => {
    prod.count = 1;
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -prod.count, sold: +prod.count } },
      },
    };
  });

  Product.bulkWrite(myOperation, {}, (err, products) => {
    console.log(err);
    if (err) {
      return res.status(400).json({
        error: "BULK operation failed",
      });
    }
    next();
  });
};

// get products by using categoryId

exports.getproductsByCategoryId = (req, res) => {
  Product.find()
    .select("-photo")
    .exec((err, prod) => {
      if (err || !prod) {
        return res.status(400).json({
          error: "NO product Found",
        });
      }
      const prodArr = [];
      prod.forEach((p) => {
        if (req.category.id == p.category) {
          // res.json(p._id)
          prodArr.push(p.id);
        }
      });
      Product.find({
        _id: { $in: prodArr },
      })
        .select("-photo")
        .exec((err, prodByCate) => {
          if (err || !prodByCate) {
            return res.status(400).json({
              error: "NO product Found",
            });
          }
          res.json(prodByCate);
        });
    });
};

// get random products by count

exports.getRandomProduct = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 4;

  Product.aggregate([
    { $sample: { size: limit } },
    { $project: { photo: 0 } }, // Exclude the 'photo' field
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category",
      },
    },
  ])
    // .select("-photo")
    // .populate("category")
    // .limit(limit)
    .exec((err, products) => {
      if (err || !products) {
        return res.status(400).json({
          error: "NO product Found",
        });
      }
      res.json(products);
    });
};
