
import { ChakraProvider } from "@chakra-ui/react";
import * as ReactDOM from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root");
if (rootElement === null) {
  throw new Error("Root element not found");
}
ReactDOM.createRoot(rootElement).render(
  <ChakraProvider>
    <App />
  </ChakraProvider>,
);
