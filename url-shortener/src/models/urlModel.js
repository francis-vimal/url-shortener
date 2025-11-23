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

export async function getAllLinks() {
  const result = await pool.query(
    "SELECT * FROM urls ORDER BY created_at DESC"
  );

  return result.rows;
}

export async function getLink(shortCode) {
  const result = await pool.query(
    "SELECT * FROM urls WHERE shortcode = $1",
    [shortCode]
  );
  return result.rows[0]
}

export async function updateCount(shortCode) {
  await pool.query(
    "UPDATE urls SET click_count = click_count + 1, last_clicked = NOW() WHERE shortcode = $1",
    [shortCode]
  );
}

export async function deleteLink(shortCode) {
  const result = await pool.query(
    "DELETE FROM urls WHERE shortcode = $1 RETURNING *",
    [shortCode]
  );
  return result;
}
