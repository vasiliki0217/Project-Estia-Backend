const pool = require('../db');

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

const addReview = async (req, res) => {
    const { user_comment, rating } = req.body;

    //if user is loggedin(to do)
    if (!user_comment || !rating) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try {
        const result = await pool.query(
            'INSERT INTO reviews (user_comment,rating, id_users, id_business) VALUES ($1, $2, $3, $4) RETURNING *',
            [user_comment, rating, id_users, id_business]
        );

        res.status(201).json({
            message: 'Review added successfully',
            review: {
                id: result.rows[0].id,
                user_comment: result.rows[0].user_comment,
                rating: result.rows[0].rating,
                created_at: result.rows[0].created_at,
                id_users: result.rows[0].id_users,
                id_bussiness: result.rows[0].id_business
            }
        });
    } catch (err) {
        console.error('Error adding review:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }


};

module.exports = {
    getUsers,
    getUserById,
    addReview
}