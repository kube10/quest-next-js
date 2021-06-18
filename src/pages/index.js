import styles from "../styles/Home.module.css";
import Estates from "../common/components/Estates";
import fetchTokens from "../common/util/fetchTokens";

//Import token calls

export default function Home({ estates, errors }) {
  return (
    <div className={styles.container}>
      {!errors ? <Estates estates={estates} /> : "An error occured!"}
    </div>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  try {
    const token = await fetchTokens(req, res);

    const estatesRes = await fetch(`${process.env.API_BASE_URL}/api/estates`, {
      headers: {
        client: token.clientToken,
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
