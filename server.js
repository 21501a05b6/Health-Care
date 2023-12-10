const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path'); // Add this line to import the path module

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
// MySQL connectiong
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'nodeuser', // new username
  password: 'nodeuser@1234', // new password
  database: 'appointments' // new database
});
app.use(express.static(__dirname));

// Connect to MySQL
connection.connect(err => {
  if (err) throw err;
  console.log('Connected to the MySQL server.');
});

// app.use(express.static(__dirname));

// Serve static files
// app.use(express.static(__dirname));
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/Homee.html'); // Replace 'appointment.html' with your file name
//   });
  
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Homee.html'));
  });


// API endpoint for form submission
app.post('/submit-appointment', (req, res) => {
  const { name, age, selectedDoctor, appointmentDate } = req.body;

  // Basic validation
  if (!name || !age || !selectedDoctor || !appointmentDate) {
    return res.status(400).send('All fields are required.');
  }

  // Insert into database
  const query = 'INSERT INTO oplist (name, age, selectedDoctor, appointmentDate) VALUES (?, ?, ?, ?)';
  connection.query(query, [name, age, selectedDoctor, appointmentDate], (err, results) => {
    if (err) {
      return res.status(500).send('Error in database operation');
    }
    res.send('Appointment booked successfully!');
  });
});
// ... previous code ...
// Start server
app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
  console.log(`Server running at http://localhost:${port}/`);
});
