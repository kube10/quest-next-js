import axios from "axios";

export default async function handler(req, res) {
  const url = `https://api.whise.eu/v1/admin/clients/token`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${req.headers.token}`,
  };
  const body = {
    ClientId: 6980,
    OfficeId: 9159,
  };
  try {
    const resp = await axios.post(url, body, {
      headers: headers,
    });
    const data = {
      clientToken: resp.data.token,
    };
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
