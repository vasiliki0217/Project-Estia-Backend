const { error } = require("console");
const pool = require("../db");
const path = require("path");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getBusiness = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Business");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getBusinessById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM Business WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Business not found" });
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
      return res.status(404).json({ error: "Business not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching business with address:", err);
    res.status(500).json({ error: "Internal Server Error" });
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
      return res.status(404).json({ error: "Business not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching business with features:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

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
      return res.status(404).json({ error: "Business not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching business with reviews:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const uploadImageToBusiness = async (req, res) => {
  const { idBusiness, isPrimary } = req.query;
  const { file } = req;

  let errors = [];

  if (!idBusiness) {
    errors.push("No idBusiness provided!");
  }

  //start checking if the provided id is a valid business id
  if (errors.length === 0) {
    try {
      const result = await pool.query("SELECT * FROM Business WHERE id = $1", [
        idBusiness,
      ]);
      if (result.rows.length === 0) {
        errors.push(`Business with id = ${idBusiness} not found in database!`);
      }
    } catch (err) {
      errors.push({ error: err.message });
    }
  }
  // end  checking if the provided id is a valid business id

  if (isPrimary !== "0" && isPrimary !== "1" && isPrimary) {
    errors.push(`Invalid value for isPrimary! Must be 0 or 1 (for primary)`);
  }

  if (!file) {
    errors.push({ field: "picture", message: "No picture uploaded!" });
  } else if (
    ![".jpg", ".jpeg", ".png"].includes(
      path.extname(file.originalname).toLowerCase()
    )
  ) {
    errors.push("Invalid file type. Only JPG, JPEG, and PNG are allowed.");
  }

  if (errors.length === 0) {
    const uploadResultCloudinary = await cloudinary.uploader.upload(file.path, {
      folder: "Estia Project",
    });

    try {
      const result = await pool.query(
        "insert into images (id_business, is_primary, file_path) values ($1, $2, $3) RETURNING *",
        [
          idBusiness,
          isPrimary ? isPrimary : 0,
          uploadResultCloudinary.secure_url,
        ],
        (error, results) => {
          if (error) {
            cloudinary.api.delete_resources(
              [uploadResultCloudinary.public_id],
              { type: "upload", resource_type: "image" }
            );

            errors.push(error);
            return res.status(500).json(errors);
          } else {
            return res.status(200).json({ message: "OK", error: "" });
          }
        }
      );
    } catch (err) {
      errors.push(err);
      return res.status(500).json(errors);
    }
  } else {
    return res.status(500).json(errors);
  }
};

const addBusiness = async (req, res) => {
  const {
    name,
    description,
    country,
    city,
    streetName,
    streetNbr,
    postalCode,
  } = req.body;

  let errors = [];

  if (!name) {
    errors.push("No name provided");
  }

  if (!description) {
    errors.push("No description provided");
  }
  if (!country) {
    errors.push("No country provided");
  }

  if (!city) {
    errors.push("No city provided");
  }

  if (!streetName) {
    errors.push("No streetName provided");
  }

  if (!streetNbr) {
    errors.push("No streetNbr provided");
  }

  if (!postalCode) {
    errors.push("No postalCode provided");
  }

  if (errors.length > 0) {
    res.status(500).json(errors);
  } else {
    // insert the address
    try {
      const result = await pool.query(
        "insert into address (road_name, number, postal_code, city, country, latitude, longitude) values ($1, $2, $3, $4, $5, $6, $7) RETURNING * ",
        [streetName, streetNbr, postalCode, city, country, 50.8503, 4.3517],
        async (error, result) => {
          if (error) {
            res.status(500).json(error);
          } else {
            const idAddress = result.rows[0].id;

            /// writting the business
            try {
              const result = await pool.query(
                "insert into business (name, description, created_at, id_address) values ($1, $2, $3, $4) ",
                [name, description, new Date().toLocaleDateString(), idAddress],
                (error, result) => {
                  if (error) {
                    res.status(500).json(error);
                  } else {
                    res.status(200).json("Succes");
                  }
                }
              );
            } catch (err) {
              res.status(500).json(error);
            }
          }
        }
      );
    } catch (err) {
      res.status(500).json("Error writing the address", err);
    }
  }
};

const updateBusiness = async (req, res) => {
  const { idBusiness } = req.params;

  // Log the incoming business ID for debugging
  console.log("Updating Business ID:", idBusiness);

  // Extract request body values
  const {
    name,
    description,
    country,
    city,
    streetName,
    streetNbr,
    postalCode,
  } = req.body;

  // Validate required fields
  const errors = [];

  if (!name) errors.push("No name provided");
  if (!description) errors.push("No description provided");
  if (!country) errors.push("No country provided");
  if (!city) errors.push("No city provided");
  if (!streetName) errors.push("No streetName provided");
  if (!streetNbr) errors.push("No streetNbr provided");
  if (!postalCode) errors.push("No postalCode provided");
  if (!idBusiness) errors.push("No idBusiness provided!");

  let idAddress;

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    // Verify if the business exists
    const result = await pool.query("SELECT * FROM Business WHERE id = $1", [
      idBusiness,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: `Business with id = ${idBusiness} not found in database!`,
      });
    }

    idAddress = result.rows[0].idaddress;

    // Use transactions
    await pool.query("BEGIN");

    await pool.query(
      "UPDATE business SET name = $1, description = $2, updated_at = $3 WHERE id = $4",
      [name, description, new Date().toISOString(), idBusiness]
    );

    await pool.query(
      "UPDATE address SET road_name = $1, number = $2, postal_code = $3, city = $4, country = $5 WHERE id = $6",
      [streetName, streetNbr, postalCode, city, country, idAddress]
    );

    await pool.query("COMMIT");

    res.status(200).json({ message: "Business updated successfully" });
  } catch (err) {
    await pool.query("ROLLBACK");
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getBusiness,
  getBusinessById,
  getBusinessWithAddress,
  getBusinessWithFeatures,
  getBusinessWithReviews,
  uploadImageToBusiness,
  addBusiness,
  updateBusiness,
};
