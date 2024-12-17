// Import required packages
const express = require('express');
//const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const fs = require('fs');

// Initialize the Express app

const app = express();
const PORT = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Configure express-ejs-layouts
//app.use(expressLayouts);

// Set the directory for EJS views
app.set('views', path.join(__dirname, 'views'));

// Set the default layout file
//app.set('layout', 'layouts/main');

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('landingpage', { title: 'Landing Page' });
});

app.get('/cv', (req, res) => {
  const textFilesDir = path.join(__dirname, 'public/cv/textfiles');
  const textFiles = ['sem1.txt', 'sem2.txt', 'sem3.txt', 'sem4.txt'];
  const textData = textFiles.map(file => fs.readFileSync(path.join(textFilesDir, file), 'utf-8'));

  res.render('cv', { title: 'Curriculum Vitae', textData });
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
