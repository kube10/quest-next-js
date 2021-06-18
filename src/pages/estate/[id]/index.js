import Link from "next/link";
import styles from "../../../styles/Home.module.css";
import Cookies from "cookies";
import fetchTokens from "../../../common/util/fetchTokens";

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
    const id = context.params.id;

    const token = await fetchTokens(req, res);

    const estateRes = await fetch(
      `${process.env.API_BASE_URL}/api/estates/${id}`,
      {
        headers: {
          client: token.clientToken,
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
