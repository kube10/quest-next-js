import Link from "next/link";
import styles from "../../../styles/Home.module.css";
import Cookies from "cookies";

export default function estate({ estate, error }) {
  return (
    <div className={styles.container}>
      {!error ? <p>{estate.address}</p> : <p>{estate.error}</p>}
      <Link href="/">Back</Link>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  try {
    const { req, res } = context;
    const cookies = new Cookies(req, res);
    const id = context.params.id;

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
    } else {
      clientToken = cookies.get("client");
    }

    const estateRes = await fetch(
      `${process.env.API_BASE_URL}/api/estates/${id}`,
      {
        headers: {
          client: clientToken,
        },
      }
    );

    const estateData = await estateRes.json();
    const estate = estateData.estates;
    return {
      props: {
        error: null,
        estate: estate[0],
      },
    };
  } catch (err) {
    return {
      props: {
        error: `Error occured: ${err.message}`,
        estate: {},
      },
    };
  }
};
