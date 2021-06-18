import Cookies from "cookies";

export default async function fetchTokens(req, res) {
  try {
    const cookies = new Cookies(req, res);

    let clientToken;

    if (!cookies.get("client")) {
      const res = await fetch(`${process.env.API_BASE_URL}/api/token`);
      const data = await res.json();
      const token = data.token;

      const clientTokenRes = await fetch(
        `${process.env.API_BASE_URL}/api/clientToken`,
        {
          headers: {
            token: token,
          },
        }
      );
      const clientTokenData = await clientTokenRes.json();
      clientToken = clientTokenData.clientToken;

      cookies.set("client", clientToken, {
        sameSite: "strict",
      });
    } else {
      clientToken = cookies.get("client");
      console.log(`token from cookie: ${clientToken}`);
    }

    return { clientToken, error: null };
  } catch (err) {
    console.log(err);
    return { clientToken: "", error: err.message };
  }
}
