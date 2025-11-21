import pool from "../config/db.js";

export async function createUrl(shortcode, longUrl) {
  const query = `
    INSERT INTO urls (shortcode, long_url)
    VALUES ($1, $2)
    RETURNING shortcode, long_url;
  `;
  const values = [shortcode, longUrl];

  const result = await pool.query(query, values);
  return result.rows[0];
}

export async function findByShortCode(shortcode) {
  const result = await pool.query(
    "SELECT * FROM urls WHERE shortcode = $1",
    [shortcode]
  );
  return result.rows[0];
}
