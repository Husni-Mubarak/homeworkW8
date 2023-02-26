const pool = require("./config.js");
const express = require("express");
const router = express.Router();

// http://localhost:3000/film
// Menampilkan seluruh list film
router.get("/film", (req, res) => {
  const query = "SELECT * FROM film";
  pool.query(query, (err, result) => {
    if (err) throw err;

    res.send(result.rows);
  });
});

// http://localhost:3000/film/1
// Menampilkan film tertentu berdsarkan request :film_id
router.get("/film/:film_id", (req, res) => {
  const { film_id } = req.params;
  const findQuery = "SELECT * FROM film WHERE film_id = $1";

  pool.query(findQuery, [film_id], (err, response) => {
    if (err) throw err;

    res.status(200).json(response.rows[0]);
  });
});

// http://localhost:3000/category
// Menampilkan data list Category
router.get("/category", (req, res) => {
  const query = "SELECT * FROM category";
  pool.query(query, (err, result) => {
    if (err) throw err;

    res.send(result.rows);
  });
});

// http://localhost:3000/category/Action
// Menampilkan data list film berdsarkan request :category
router.get("/category/:category", (req, res) => {
  const query = `SELECT * FROM film_category fc 
                  INNER JOIN film f ON fc.film_id = f.film_id 
                  INNER JOIN category c ON fc.category_id = c.category_id WHERE c.name = '${req.params.category}'`;
  pool.query(query, (err, result) => {
    if (err) throw err;

    res.send(result.rows);
  });
});

module.exports = router;
