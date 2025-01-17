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

const getBusinessWithAddress = async (req, res) => {
    const { id } = req.params;

    try {
        const query = `
            SELECT 
                b.id AS business_id, 
                b.name AS business_name, 
                b.description, 
                b.rating, 
                b.created_at, 
                b.updated_at, 
                a.id AS address_id, 
                a.road_name, 
                a.number, 
                a.postal_code, 
                a.city, 
                a.country, 
                a.latitude, 
                a.longitude
            FROM Business b
            LEFT JOIN Address a ON b.id_Address = a.id
            WHERE b.id = $1;
        `;

        const result = await pool.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Business not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error fetching business with address:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getBusiness,
    getBusinessById,
    getBusinessWithAddress
};
