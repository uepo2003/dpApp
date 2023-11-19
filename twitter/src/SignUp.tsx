import { useState, useRef } from "react";
import { Button, Stack, Input } from "@chakra-ui/react";
import { AddIcon, EmailIcon } from "@chakra-ui/icons";
import axios from "axios";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const onUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  async function handleSignUp() {
    const formData = new FormData();
    formData.append("file", file); // ファイルを追加
    formData.append("username", username); // テキストも追加
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await axios.post(
        "http://localhost:8080/signups",
        formData,
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error in signup: ", error);
    }
  }

  return (
    <Stack spacing={4} p={4}>
      <Input
        value={username}
        onChange={onUsernameChange}
        placeholder="ユーザー名"
      />
      <Input
        value={email}
        onChange={onEmailChange}
        placeholder="メールアドレス"
        type="email"
      />
      <Input
        value={password}
        onChange={onPasswordChange}
        placeholder="パスワード"
        type="password"
      />
      <Input type="file" onChange={onFileChange} ref={fileInputRef} hidden />
      <Button
        leftIcon={<AddIcon />}
        onClick={handleButtonClick}
        aria-label="Upload file"
      >
        画像を追加
      </Button>
      <Button onClick={handleSignUp} colorScheme="blue">
        登録
      </Button>
    </Stack>
  );
};

export default SignUp;
