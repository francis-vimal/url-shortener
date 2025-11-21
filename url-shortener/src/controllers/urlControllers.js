import { createUrl, findByShortCode } from "../models/urlModel.js";
import { generateShortCode } from "../utils/generateCode.js";

export async function shortenUrl(req, res) {
  const { longUrl, customCode } = req.body;

  try {
    // Validate URL
    try {
      new URL(longUrl);
    } catch {
      return res.status(400).json({ error: "Invalid URL format" });
    }

    // If custom code exists → check uniqueness
    let shortcode = customCode || generateShortCode();

    const exists = await findByShortCode(shortcode);
    if (exists) {
      return res.status(400).json({ error: "Shortcode already taken" });
    }

    const newUrl = await createUrl(shortcode, longUrl);

    return res.json({
      short: `${process.env.BASE_URL}/${newUrl.shortcode}`,
      long: newUrl.long_url,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

export async function redirectUrl(req, res) {
  const shortcode = req.params.code;

  const data = await findByShortCode(shortcode);
  if (!data) {
    return res.status(404).json({ error: "Short URL not found" });
  }

  return res.redirect(data.long_url);
}
