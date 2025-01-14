const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const businessRoutes = require('./routes/business');
const usersRoutes = require('./routes/users')
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/business', businessRoutes);
app.use('/users', usersRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

//app.listen(process.env.Port || 3000)
