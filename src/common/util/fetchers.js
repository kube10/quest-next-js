import axios from "axios";

export async function fetchClientToken() {
  const url = `${process.env.WHISE_BASE_URL}/token`;
  const headers = {
    "Content-Type": "application/json",
  };
  const body = {
    username: process.env.WHISE_USER,
    password: process.env.WHISE_PASS,
  };
  const resp = await axios.post(url, body, {
    headers: headers,
  });
  const data = await resp.data;

  const urlClient = `${process.env.WHISE_BASE_URL}/v1/admin/clients/token`;
  const headersClient = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${data.token}`,
  };
  const bodyClient = {
    ClientId: parseInt(process.env.WHISE_CLIENT_ID),
    OfficeId: parseInt(process.env.WHISE_OFFICE_ID),
  };
  const respClient = await axios.post(urlClient, bodyClient, {
    headers: headersClient,
  });

  const respData = await respClient.data;

  return respData;
}

export async function fetchAllEstates(clientToken) {
  const url = `${process.env.WHISE_BASE_URL}/v1/estates/list`;
  2;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${clientToken}`,
  };
  const body = {};

  const resp = await axios.post(url, body, {
    headers: headers,
  });
  const respData = await resp.data;
  return respData;
}

export async function fetchEstateById(clientToken, id) {
  const url = `${process.env.WHISE_BASE_URL}/v1/estates/list`;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${clientToken}`,
  };
  const body = {
    Filter: {
      EstateIds: [id],
    },
  };
  const resp = await axios.post(url, body, {
    headers: headers,
  });
  const respData = await resp.data;
  return respData;
}
