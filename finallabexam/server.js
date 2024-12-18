const express = require("express");
const mongoose = require("mongoose");
var expressLayouts = require("express-ejs-layouts");
let server = express();
server.set("view engine", "ejs");
server.use(expressLayouts);

// Serve static files from 'public' and 'uploads' directories
server.use(express.static("public"));
server.use("/uploads", express.static("uploads"));  // This will help express bypass the file and get data needed

server.use(express.urlencoded());

// Import models
let Product = require("./models/product.model");  // Ensure it's required here
let Category = require("./models/category.model");  // Same here
let Order = require("./models/order.model")

// Routes
let adminProductsRouter = require("./routes/admin/products.controller");
server.use(adminProductsRouter);

let adminCategoriesRouter = require("./routes/admin/categories.controller");
server.use(adminCategoriesRouter);

const productsRouter = require("./routes/products");
server.use("/products", productsRouter);

let checkoutRouter = require("./routes/checkout.controller");
server.use("/checkout", checkoutRouter);

// Route to fetch products
server.get('/products', (req, res) => {
    // Fetch products from the database
    Product.find({}, (err, products) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error fetching products');
        }
        // Pass the products to the EJS template
        res.render('products', { products: products });
    });
});

// Home page route
server.get("/", async (req, res) => {
    // Fetch products and categories for the home page
    let products = await Product.find();
    let categories = await Category.find();

    return res.render("landingpage", { products, categories });
});

//cart route
server.post('/add-to-cart', (req, res) => {
  const { productId } = req.body;
  Product.findById(productId).then(product => {
    cart.push(product);
    res.redirect('/cart');
  }).catch(err => console.error(err));
});

// view cart
server.get('/cart', (req, res) => {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  res.render('cart', { cart, total });
});



// MongoDB connection
let connectionString = "mongodb+srv://hirabatool:feel.fab@cluster0.ckiqx.mongodb.net/";
mongoose
  .connect(connectionString, { useNewUrlParser: true })
  .then(() => console.log("Connected to Mongo DB Server: " + connectionString))
  .catch((error) => console.log(error.message));

// Start the server
server.listen(4500, () => {
  console.log(`Server Started at localhost:4500`);
});
