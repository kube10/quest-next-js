import { useEffect } from "react";
import getToken from "../../pages/api/token";
import axios from "axios";

const baseURL = "https://api.whise.eu/";
const user = "nemo@bonfirestudio.be";
const pass = "brugsezotten12";

const TestComponent = () => {
  useEffect(() => getToken());

  return <div>I'm a component!</div>;
};

export default TestComponent;
