import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";

import { useState } from "react";
import axios from "axios";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const newSignUp = async () => {
    const signup = { email, password };
    console.log(signup);
    try {
      const response = await axios.post("http://localhost:8080/signups", signup);
      if (response.status === 200) {
        console.log("seiko");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.log("niko", error);
    }
  };

  return (
    <>
      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        p={8}
      >
        <Stack spacing={5}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
          >
            新規登録
          </Heading>
          <FormControl id="email">
            <FormLabel>メールアドレス</FormLabel>
            <Input type="email" value={email} onChange={handleEmail} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>パスワード</FormLabel>
            <Input type="password" value={password} onChange={handlePassword} />
          </FormControl>

          <Button
            bg={"blue.400"}
            color={"white"}
            _hover={{ bg: "blue.500" }}
            onClick={newSignUp}
            mt="30"
          >
            登録する
          </Button>
        </Stack>
      </Box>
    </>
  );
}

export default SignUp;
