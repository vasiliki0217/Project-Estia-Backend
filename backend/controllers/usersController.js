const pool = require('../db');
const bcrypt = require('bcrypt');

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

module.exports = {
    getUsers,
    getUserById,
    registerUser,
    loginUser
}