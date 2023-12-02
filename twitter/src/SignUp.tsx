import { useState, useRef } from "react";
import { Button, Stack, Input, Link } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  async function handleSignUp() {
    const formData = new FormData();
    if (file) {
      formData.append("file", file); // ファイルを追加
    }
    formData.append("username", username); // テキストも追加
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await axios.post(
        "http://localhost:8080/signups",
        formData,
      );
      if (response.status === 200) {
        navigate("/");
      }
      
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
      <Button onClick={handleSignUp} colorScheme="twitter">
        登録
      </Button>
      <Button  colorScheme="twitter">
      <Link href="/">ホームに戻る</Link>
      </Button>
    </Stack>
  );
};

export default SignUp;
