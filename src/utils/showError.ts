import { message } from "antd";
const showError = (errorMessage: String) => {
    message.error(errorMessage);
  };

  export default showError;