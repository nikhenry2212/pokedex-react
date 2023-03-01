import { Routing } from "./routes/route";
import { ChakraProvider } from "@chakra-ui/react";


function App() {
  return (
    <ChakraProvider>
      <Routing />
    </ChakraProvider>
  );
}

export default App;
