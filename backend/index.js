const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const businessRoutes = require('./routes/business');
const usersRoutes = require('./routes/users')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Estia Project API!');
});

app.use('/api/v1/business', businessRoutes);
app.use('/api/v1/users', usersRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

//app.listen(process.env.Port || 3000)
