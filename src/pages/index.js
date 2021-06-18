import Head from "next/head";
import axios from "axios";
import styles from "../styles/Home.module.css";
import Estates from "../common/components/Estates";

//Master branch

export default function Home({ estates, errors }) {
  return (
    <div className={styles.container}>
      {!errors ? <Estates estates={estates} /> : "An error occured!"}
    </div>
  );
}

export const getServerSideProps = async () => {
  const url = `https://api.whise.eu/token`;
  const headers = {
    "Content-Type": "application/json",
  };
  const body = {
    username: process.env.WHISE_USER,
    password: process.env.WHISE_PASS,
  };

  try {
    const resp = await axios.post(url, body, {
      headers: headers,
    });

    if (resp && resp.data && resp.data.token) {
      const url = `https://api.whise.eu/v1/admin/clients/token`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resp.data.token}`,
      };
      const body = {
        ClientId: 6980,
        OfficeId: 9159,
      };
      try {
        const response = await axios.post(url, body, {
          headers: headers,
        });

        if (response && response.data && response.data.token) {
          const clientToken = response.data.token;
          console.log(clientToken);

          let url = `https://api.whise.eu/v1/estates/list`;
          let headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${clientToken}`,
          };
          let body = {
            Page: {
              Limit: 5,
              Offset: 0,
            },
          };

          try {
            let estatesRes = await axios.post(url, body, {
              headers: headers,
            });

            if (estatesRes && estatesRes.data && estatesRes.data.estates) {
              return {
                props: {
                  estates: estatesRes.data.estates,
                  errors: null,
                },
              };
            }
          } catch (e) {
            console.log(`Estates error: ${e.message}`);
            return {
              props: {
                estates: [],
                errors: `Estates error: ${e.message}`,
              },
            };
          }
        }
      } catch (e) {
        console.log(`Client token error: ${e.message}`);
        return {
          props: {
            estates: [],
            errors: `Client token error: ${e.message}`,
          },
        };
      }
    }
  } catch (e) {
    console.log(`Token error: ${e.message}`);
    return {
      props: {
        estates: [],
        errors: `Token error: ${e.message} for user ${process.env.WHISE_USER}`,
      },
    };
  }
};
