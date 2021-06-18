import Head from "next/head";
import axios from "axios";
import styles from "../styles/Home.module.css";
import Estates from "../common/components/Estates";

//RESTRUCTURE BRANCH

export default function Home({ estates, errors }) {
  return (
    <div className={styles.container}>
      {!errors ? <Estates estates={estates} /> : "An error occured!"}
    </div>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3010/api/token");
  const data = await res.json();
  const token = data.token;

  const clientTokenRes = await fetch("http://localhost:3010/api/clientToken", {
    headers: {
      token: token,
    },
  });
  const clientTokenData = await clientTokenRes.json();
  const clientToken = clientTokenData.clientToken;
  console.log(`clientToken: ${clientToken}`);

  const estatesRes = await fetch("http://localhost:3010/api/estates", {
    headers: {
      clientToken: clientToken,
    },
  });
  const estatesData = await estatesRes.json();
  const estates = estatesData.error;
  console.log(estates);

  // const estatesData = await estatesRes.json();
  // const estates = estatesData.estates;
  // console.log(estates);

  return {
    props: {
      estates: null,
      errors: `Estates not fetched with error`,
    },
  };

  // try {
  //   const estates = await fetch("http://localhost:3010/api/estates", {
  //     headers: {
  //       clientToken,
  //     },
  //   });
  //
  //   console.log(estates);
  //
  //   return {
  //     props: {
  //       estates,
  //       errors: null,
  //     },
  //   };
  // } catch (err) {
  //   return {
  //     props: {
  //       estates: null,
  //       errors: `Estates not fetched with error: ${err.message}`,
  //     },
  //   };
  // }
};
