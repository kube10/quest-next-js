import axios from "axios";

const baseURL = "https://api.whise.eu/";
const user = "nemo@bonfirestudio.be";
const pass = "brugsezotten12";
const clientId = 6980;
const officeId = 9159;

async function getToken() {
  const url = baseURL + "token";
  const headers = {
    "Content-Type": "application/json",
  };
  const body = {
    username: user,
    password: pass,
  };

  try {
    const resp = await axios.post(url, body, {
      headers: headers,
    });

    if (resp && resp.data && resp.data.token) {
      return resp.data.token;
    }
  } catch (e) {
    console.log(e);
  }
}

async function getClientToken() {
  const url = baseURL + "v1/admin/clients/token";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${await getToken()}`,
  };
  const body = {
    ClientId: clientId,
    OfficeId: officeId,
  };
  try {
    const resp = await axios.post(url, body, {
      headers: headers,
    });

    if (resp && resp.data && resp.data.token) {
      return resp.data.token;
    }
  } catch (e) {
    console.log(e);
  }
}

export default async function handler(req, res) {
  let url = baseURL + "v1/estates/list";
  let headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${await getClientToken()}`,
  };
  let body = {
    Page: {
      Limit: 5,
      Offset: 0,
    },
  };

  try {
    let resp = await axios.post(url, body, {
      headers: headers,
    });

    if (resp && resp.data && resp.data.estates) {
      res.status(200).send(resp.data.estates);
    }
  } catch (e) {
    console.log(e);
  }
}
