import axios from "axios";

export default async function handler(req, res) {
  const url = `https://api.whise.eu/v1/estates/list`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${req.headers.clientToken}`,
  };
  const body = {
    Page: {
      Limit: 5,
      Offset: 0,
    },
  };
  try {
    const resp = await axios.post(url, body, {
      headers: headers,
    });
    res.status(200).send(resp.data.estates);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
