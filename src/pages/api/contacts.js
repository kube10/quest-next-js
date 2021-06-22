import { fetchClientToken } from "../../common/util/fetchers";
import axios from "axios";

export default async (req, res) => {
  if (req.method === "POST") {
    const clientToken = await fetchClientToken();
    console.log(`Token: ${clientToken}`);
    if (clientToken.isValidRequest) {
      const whiseRes = await axios.post(
        `${process.env.WHISE_BASE_URL}/v1/contacts/upsert`,
        req.body,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${clientToken.token}`,
          },
        }
      );

      console.log(req.body);

      const whiseResData = await whiseRes.data;

      console.log(whiseResData);

      res.status(300).json({ contactId: whiseResData });
    } else {
      res.status(403).json({ message: "Access forbidden." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
