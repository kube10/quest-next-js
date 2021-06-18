import axios from "axios";

export default async function handler(req, res) {
  const url = `${process.env.WHISE_BASE_URL}/token`;
  const headers = {
    "Content-Type": "application/json",
  };
  const body = {
    username: process.env.WHISE_USER,
    password: process.env.WHISE_PASS,
  };
  try {
    const resp = await axios.post(url, body, {
      headers: headers,
    });
    const data = {
      token: resp.data.token,
    };
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
