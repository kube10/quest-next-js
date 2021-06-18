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

    const urlClient = `${process.env.WHISE_BASE_URL}/v1/admin/clients/token`;
    const headersClient = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data.token}`,
    };
    const bodyClient = {
      ClientId: parseInt(process.env.WHISE_CLIENT_ID),
      OfficeId: parseInt(process.env.WHISE_OFFICE_ID),
    };
    try {
      const respClient = await axios.post(urlClient, bodyClient, {
        headers: headersClient,
      });
      const dataClient = {
        clientToken: respClient.data.token,
      };
      res.status(200).send(dataClient);
    } catch (err) {
      res.status(500).send(err.message);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}
