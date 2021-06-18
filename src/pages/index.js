import styles from "../styles/Home.module.css";
import Estates from "../common/components/Estates";
import Cookies from "cookies";

//Master branch

export default function Home({ estates, errors }) {
  return (
    <div className={styles.container}>
      {!errors ? <Estates estates={estates} /> : "An error occured!"}
    </div>
  );
}

export const getServerSideProps = async ({ req, res }) => {
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
    }

    const estatesRes = await fetch(`${process.env.API_BASE_URL}/api/estates`, {
      headers: {
        client: clientToken,
      },
    });

    const estatesData = await estatesRes.json();
    const estates = estatesData.estates;

    return {
      props: {
        estates: estates,
        errors: null,
      },
    };
  } catch (err) {
    return {
      props: {
        estates: [],
        errors: `An error occured: ${err.message}`,
      },
    };
  }
};
