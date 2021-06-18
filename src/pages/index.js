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

  console.log(`token sent: ${token}`);

  const clientTokenRes = await fetch("http://localhost:3010/api/clientToken", {
    headers: {
      token: token,
    },
  });
  const clientTokenData = await clientTokenRes.json();
  const clientToken = data.clientToken;

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
