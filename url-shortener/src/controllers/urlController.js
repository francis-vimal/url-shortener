import { createUrl, findByShortCode, getAllLinks, updateCount, deleteLink, getLink } from "../models/urlModel.js";
import { generateShortCode } from "../utils/generateCode.js";

export async function shortenUrl(req, res) {
  const { longUrl, customCode } = req.body;

  try {
    try {
      new URL(longUrl);
    } catch {
      return res.status(400).json({ error: "Invalid URL format" });
    }

    let shortcode = customCode || generateShortCode();
    const exists = await findByShortCode(shortcode);
    if (exists) {
      return res.status(409).json({ error: "Shortcode already taken" });
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

  await updateCount(shortcode);

  return res.status(302).redirect(data.long_url);
}

export async function allUrls(req, res) {
  const data = await getAllLinks();

  if (!data)
    return res.status(404).json({ error: "URLs are not found" });

  return res.json(data);
}

export async function getOneUrl(req, res) {
  const shortCode = req.params.code;
  const data = await getLink(shortCode);

  if (!data)
    return res.status(404).sjon({ error: "URL is not found" });

  return res.json(data);
}

export async function deleteUrl(req, res) {
  const { code } = req.params;
  console.log("code: ", code)
  try {
    const result = deleteLink(code);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Link not found" });
    }

    return res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export function healthCheck(req, res) {
  res.status(200).json({
    ok: true,
    version: "1.0",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
}