import { useState, useRef } from "react";
import {
  Button,
  Stack,
  Textarea,
  Image,
  Input,
  // IconButton,
} from "@chakra-ui/react";
import { AddIcon, EmailIcon } from "@chakra-ui/icons";
import axios from "axios";

const UpLoad = () => {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [upFile, setUpFile] = useState(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const onTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  async function handleUpload() {
    console.log(text);
    const formData = new FormData();
    if (file) {
      formData.append("file", file); // ファイルを追加
    }
    formData.append("text", text); // テキストも追加
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/upLoads",
        formData,
        { withCredentials: true },
      );

      console.log(response.data);
      setUpFile(response.data.fileUrl); // ファイルURLを状態にセット
    } catch (error) {
      console.error("Error in upload: ", error);
    }
  }

  return (
    <Stack spacing={4} p={4}>
      <Textarea
        value={text}
        onChange={onTextChange}
        placeholder="何をつぶやこうかな？"
        resize="none"
        rows={4}
      />
      <Input type="file" onChange={onFileChange} ref={fileInputRef} hidden />
      <Button
        leftIcon={<AddIcon />}
        onClick={handleButtonClick}
        aria-label="Upload file"
      >
        画像を追加
      </Button>
      <Button
        onClick={handleUpload}
        colorScheme="twitter"
        leftIcon={<EmailIcon />}
      >
        送信
      </Button>
      {upFile && <Image src={upFile} alt="アップロードされたファイル" />}
    </Stack>
  );
};

export default UpLoad;
