const pool = require('../db');

const getBusiness = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Business');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getBusinessById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM Business WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Business not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getBusinessAddressId = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT id_Address FROM Business WHERE id= $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Business not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getBusiness,
    getBusinessById,
    getBusinessAddressId
};
