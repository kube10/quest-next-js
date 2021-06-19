import Link from "next/link";
import styles from "../../../styles/Home.module.css";
import { useRouter } from "next/router";

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
    const { req, res } = context;
    const id = context.params.id;

    let clientToken;

    const clientTokenRes = await fetch(
      `${process.env.API_BASE_URL}/api/clientToken`
    );
    const clientTokenData = await clientTokenRes.json();
    clientToken = clientTokenData.clientToken;

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
      revalidate: 60 * 60,
    };
  }
};

export const getStaticPaths = async () => {
  const clientTokenRes = await fetch(
    `${process.env.API_BASE_URL}/api/clientToken`
  );

  const clientTokenData = await clientTokenRes.json();
  const clientToken = clientTokenData.clientToken;

  const estatesRes = await fetch(`${process.env.API_BASE_URL}/api/estates`, {
    headers: {
      client: clientToken,
    },
  });

  const estatesData = await estatesRes.json();
  const estates = estatesData.estates;

  const ids = estates.map((estate) => estate.id);

  const paths = ids.map((id) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: true,
  };
};
