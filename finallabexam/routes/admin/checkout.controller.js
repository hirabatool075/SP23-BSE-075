
// Required Models
const Order = require('./models/Order');
const Product = require('./models/Product');
//tests for exam
const { validTestCase, invalidTestCase } = require('./tests/testcases');


// Cart (i did not make a session based cart)
let cart = [];

// View Checkout Page
exports.viewCheckout = (req, res) => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    res.render('checkout', { cart, total });
};

// Handle Checkout Form Submission
exports.processCheckout = async (req, res) => {
    const { customerName, address, city, postalCode } = req.body;

    // Validate Input
    if (!customerName || !address || !city || !postalCode) {
        return res.status(400).send('All fields are required!');
    }

    // Create Order
    const orderId = `ORD-${Date.now()}`;
    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

    const newOrder = new Order({
        orderId,
        customerName,
        address,
        city,
        postalCode,
        items: cart,
        totalAmount
    });

    // Save Order to Database
    await newOrder.save();

    // Clear Cart
    cart = [];

    // Redirect to Order Success Page
    res.redirect('/order-success');
};

// View Order Success Page
exports.viewOrderSuccess = (req, res) => {
    res.render('order-success');
};

// Add to Cart (Optional Helper)
exports.addToCart = (req, res) => {
    const { productId } = req.body;
    Product.findById(productId).then(product => {
        cart.push(product);
        res.redirect('/cart');
    }).catch(err => console.error(err));
};

// View Cart
exports.viewCart = (req, res) => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    res.render('cart', { cart, total });
};


//testing 
// Example function to validate the test cases
function validateTestCase(data) {
    const { customerName, address, city, postalCode } = data;

    if (!customerName || !address || !city || !postalCode) {
        console.log("Invalid data detected. Validation failed:", data);
        return false;
    }

    console.log("Valid data. Proceeding with order creation:", data);
    return true;
}

// Running the test cases
console.log("Testing valid test case:");
validateTestCase(validTestCase); 

console.log("Testing invalid test case:");
validateTestCase(invalidTestCase); 
