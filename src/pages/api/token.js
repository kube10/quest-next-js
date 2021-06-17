import axios from "axios";

const baseURL = "https://api.whise.eu/";
const user = "nemo@bonfirestudio.be";
const pass = "brugsezotten12";

async function getToken() {
  let url = baseURL + "token";
  let headers = {
    "Content-Type": "application/json",
  };
  let body = {
    username: user,
    password: pass,
  };

  try {
    let resp = await axios.post(url, body, {
      headers: headers,
    });

    if (resp && resp.data && resp.data.token) {
      console.log(resp.data.token);
    }
  } catch (e) {
    console.log(e);
  }
}

export default getToken;
