const pool = require("./config.js");
const express = require("express");
const router = express.Router();

// Menampilkan seluruh list film
router.get("/film", (req, res) => {
  const query = "SELECT * FROM film";
  pool.query(query, (err, result) => {
    if (err) throw err;

    res.send(result.rows);
  });
});

// Menampilkan film tertentu berdsarkan request film_id
router.get("/film/:film_id", (req, res) => {
  const { film_id } = req.params;
  const findQuery = "SELECT * FROM film WHERE film_id = $1";

  pool.query(findQuery, [film_id], (err, response) => {
    if (err) throw err;

    res.status(200).json(response.rows[0]);
  });
});

// Menampilkan data list Category
router.get("/category", (req, res) => {
  const query = "SELECT * FROM category";
  pool.query(query, (err, result) => {
    if (err) throw err;

    res.send(result.rows);
  });
});

// Menampilkan data list film berdsarkan category
router.get("/film_id/genre", (req, res) => {
  const query = "SELECT * FROM film_category INNER JOIN category ON film_category.category_id = category.category_id";
  pool.query(query, (err, result) => {
    if (err) throw err;

    res.send(result.rows);
  });
});


module.exports = router;
