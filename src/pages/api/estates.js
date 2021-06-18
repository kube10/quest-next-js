import axios from "axios";

export default async function handler(req, res) {
  const url = `${process.env.WHISE_BASE_URL}/v1/estates/list`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${req.headers.client}`,
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
    const data = {
      estates: resp.data.estates,
    };
    res.status(200).send(data);
  } catch (err) {
    const error = {
      error: err.message,
    };
    res.status(500).send(error);
  }
}
