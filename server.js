const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');

const app = express();
const port = 3000;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/labDB')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});