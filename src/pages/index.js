import styles from "../styles/Home.module.css";
import Estates from "../common/components/Estates";
import { fetchClientToken, fetchAllEstates } from "../common/util/fetchers";

export default function Home({ estates, error }) {
  return (
    <div className={styles.container}>
      {!error ? <Estates estates={estates} /> : <p>{error}</p>}
    </div>
  );
}

export const getStaticProps = async ({ req, res }) => {
  try {
    const clientToken = await fetchClientToken();

    let estates, error;

    if (clientToken.isValidRequest) {
      const res = await fetchAllEstates(clientToken.token);
      estates = res.estates;
      error = null;
    } else {
      estates = [];
      error = `Not authenticated.`;
    }

    return {
      props: {
        estates: estates,
        error: error,
        revalidate: 60 * 60,
      },
    };
  } catch (err) {
    console.log(err.message);
    return {
      props: {
        estates: [],
        error: `An error occured`,
      },
    };
  }
};
