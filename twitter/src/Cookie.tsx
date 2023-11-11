import axios from "axios";

const App = () => {
  const setCookie = async () => {
    try {
      const response = await axios.get("http://localhost:8080/set", {
        withCredentials: true,
      });
      console.log("Cookieが設定されました:", response.data);
    } catch (error) {
      console.error("Error setting cookie:", error);
    }
  };

  return (
    <div>
      <button onClick={setCookie}>Set Cookie</button>
    </div>
  );
};

export default App;
