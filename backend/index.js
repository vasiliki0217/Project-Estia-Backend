const express = require('express');
const cors = require('cors');
const businessRoutes = require('./routes/business');
const usersRoutes = require('./routes/users');
const addressRoutes = require('./routes/address');
const authRoutes = require('./routes/auth');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
// const allowedOrigins = [
//     'http://localhost:3000',
//     '--frontend url--'
// ];
// app.use(cors({
//     origin: (origin, callback) => {
//         if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     }
// }));
//to limit the access

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Estia Project API!');
}); //testing

app.use('/api/v1/business', businessRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/address', addressRoutes)
app.use('/api/v1/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



