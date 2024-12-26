const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'yourpassword',
    database: 'aura_pazhamometer',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

// API to add score
app.post('/add-score', (req, res) => {
    const { name, score } = req.body;
    const query = 'INSERT INTO leaderboard (name, score) VALUES (?, ?)';
    db.query(query, [name, score], (err) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Error inserting data.');
        } else {
            res.send('Score added successfully.');
        }
    });
});

// API to get leaderboard
app.get('/leaderboard', (req, res) => {
    const query = 'SELECT * FROM leaderboard ORDER BY score DESC';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Error fetching data.');
        } else {
            res.json(results);
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
