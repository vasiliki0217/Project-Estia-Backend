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

const getBusinessWithFeatures = async (req, res) => {
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
                a.id AS features_id, 
                a.category, 
                a.breakfast, 
                a.brunch, 
                a.lunch, 
                a.dinner, 
                a.snacks, 
                a.ice_cream,
                a.coffee,
                a.birthday_events,
                a.animateur,
                a.indoor_playground,
                a.outdoor_playground,
                a.wheelchair_access,
                a.pets_allowed,
                a.parking_space,
                a.opening_hours,
                a.stroller_friendly,
                a.parking_space,
                a.free_entrance,
                a.contact_number,
                a.contact_email
            FROM Business b
            LEFT JOIN Business_features a ON b.id = a.id_business
            WHERE b.id = $1;
        `;

        const result = await pool.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Business not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error fetching business with features:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getBusinessWithReviews = async (req, res) => {
    const { id } = req.params;

    try {
        const query = `
        SELECT
                b.id AS business_id, 
                b.name AS business_name, 
                b.rating AS business_rating, 
                a.id AS reviews_id, 
                a.user_comment,
                a.rating AS user_rating,
                a.created_at
            FROM Business b
            LEFT JOIN reviews a ON b.id = a.id_business
            WHERE b.id = $1;
        `;

        const result = await pool.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Business not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error fetching business with reviews:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getBusiness,
    getBusinessById,
    getBusinessWithAddress,
    getBusinessWithFeatures,
    getBusinessWithReviews
};
