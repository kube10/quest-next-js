import { useState } from "react";
import { NEXT_API_BASE_URL } from "../../config/index";

const ContactForm = ({ estate }) => {
  const [values, setValues] = useState({
    name: "",
    firstName: "",
    privateEmail: "",
    privateTel: "",
    message: "",
    countryId: 1,
    languageId: "nl-NL",
    officeIds: [9159],
    AgreementEmail: true,
    estateIds: [estate.id],
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${NEXT_API_BASE_URL}/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    if (res.ok) {
      console.log(data);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <div>
      <form
        onSubmit={onSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label htmlFor="name">Achternaam</label>
        <input
          type="text"
          name="name"
          placeholder="Uw achternaam"
          value={values.name}
          onChange={handleInputChange}
        />
        <label htmlFor="firstName">Voornaam</label>
        <input
          type="text"
          name="firstName"
          placeholder="Uw voornaam"
          value={values.firstName}
          onChange={handleInputChange}
        />
        <label htmlFor="privateEmail">Email</label>
        <input
          type="email"
          name="privateEmail"
          placeholder="Uw email"
          value={values.privateEmail}
          onChange={handleInputChange}
        />
        <label htmlFor="privateTel">Tel. Nr:</label>
        <input
          type="text"
          name="privateTel"
          placeholder="Uw Tel. nummer"
          value={values.privateTel}
          onChange={handleInputChange}
        />
        <label htmlFor="message">Opmerkingen:</label>
        <textarea
          name="message"
          placeholder="Typ hier uw opmerkingen..."
          value={values.message}
          onChange={handleInputChange}
        ></textarea>
        <input type="submit" value="Send" />
      </form>
    </div>
  );
};

export default ContactForm;
