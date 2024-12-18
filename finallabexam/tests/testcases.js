const validTestCase = {
    customerName: "John Doe",
    address: "123 Maple Street",
    city: "Springfield",
    postalCode: "12345",
    items: [
      { name: "sofa", price: 50, description: "sofa" },
      { name: "chair", price: 100, description: "chair" },
    ],
    totalAmount: 150,
  };
  
  const invalidTestCase = {
    customerName: "", // Missing name
    address: "456 Elm Street",
    city: "", // Missing city
    postalCode: "67890",
    items: [
      { name: "table", price: 75, description: "table" },
    ],
    totalAmount: 75,
  };
  
  module.exports = { validTestCase, invalidTestCase };
  