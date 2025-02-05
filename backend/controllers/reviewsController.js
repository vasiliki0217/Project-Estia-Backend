const pool = require('../db');

const getReviewsByBusinessId = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM Reviews WHERE id_bussiness = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Review not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getReviewsByBusinessId
};