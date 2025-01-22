const pool = require('../db');
const bcrypt = require('bcrypt');

//login,register to add

const getUsers = async (req, res) => {
    try {
        const result = await pool.query('SELECT id, email, username, is_verified FROM Users');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT id, email, username, is_verified FROM Users WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const userExists = await pool.query('SELECT * FROM Users WHERE email = $1', [email]);

        if (userExists.rows.length > 0) {
            return res.status(400).json({ error: 'Email is already in use' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const result = await pool.query(
            'INSERT INTO Users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
            [username, email, hashedPassword]
        );

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: result.rows[0].id,
                username: result.rows[0].username,
                email: result.rows[0].email
            }
        });
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    getUsers,
    getUserById,
    registerUser
}