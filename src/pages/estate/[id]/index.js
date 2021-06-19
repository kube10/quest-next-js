import Link from "next/link";
import styles from "../../../styles/Home.module.css";
import { useRouter } from "next/router";
import {
  fetchClientToken,
  fetchAllEstates,
  fetchEstateById,
} from "../../../common/util/fetchers";

export default function estate({ estate, error }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div className={styles.container}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      {!error ? <p>{estate.address}</p> : <p>{estate.error}</p>}
      <Link href="/">Back</Link>
    </div>
  );
}

export const getStaticProps = async (context) => {
  try {
    const clientToken = await fetchClientToken();

    let estate, error;

    if (clientToken.isValidRequest) {
      const res = await fetchEstateById(clientToken.token, context.params.id);
      estate = res.estates[0];
      error = null;
    } else {
      estate = {};
      error = "Not authenticated";
    }

    return {
      props: {
        estate,
        error,
        revalidate: 60 * 60,
      },
    };
  } catch (err) {
    console.log(err.message);
    return {
      props: {
        estate: {},
        error: "An error occured.",
      },
    };
  }
};

export const getStaticPaths = async () => {
  const clientToken = await fetchClientToken();

  let paths;

  if (clientToken.isValidRequest) {
    const res = await fetchAllEstates(clientToken.token);

    const ids = res.estates.map((estate) => estate.id);

    paths = ids.map((id) => ({ params: { id: id.toString() } }));
  } else {
    paths = [];
    console.log("clientToken not valid.");
  }

  return {
    paths,
    fallback: true,
  };
};
