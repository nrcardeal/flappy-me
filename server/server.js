const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors')

const app = express();
const filePath = path.join(__dirname, 'ratings.json');

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON body
app.use(express.json());

// Route to get the data
app.get('/ratings', (req, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(200).json(JSON.parse(data));
  });
});

// Route to add data
app.post('/ratings', (req, res) => {
  const newData = req.body;
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(500).send('Internal Server Error');
      return;
    }
    const dataArray = JSON.parse(data);
    dataArray.push(newData);
    fs.writeFile(filePath, JSON.stringify(dataArray, null, 2), err => {
      if (err) {
        res.status(500).send('Internal Server Error');
        return;
      }
      res.status(201).send('Data appended successfully');
    });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
