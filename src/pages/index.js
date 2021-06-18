import styles from "../styles/Home.module.css";
import Estates from "../common/components/Estates";
<<<<<<< HEAD
import fetchTokens from "../common/util/fetchTokens";
=======
>>>>>>> cookies

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
<<<<<<< HEAD
    const token = await fetchTokens(req, res);
=======
    const clientTokenRes = await fetch(
      `${process.env.API_BASE_URL}/api/clientToken`
    );

    const clientTokenData = await clientTokenRes.json();
    const clientToken = clientTokenData.clientToken;
>>>>>>> cookies

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
