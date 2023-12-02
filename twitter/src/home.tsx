import "./App.css";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Flex,
  Avatar,
  Heading,
  Text,
  IconButton,
  CardBody,
  Image,
  CardFooter,
  Link,
  Spacer,
  Icon,
  ModalOverlay,
  ModalContent,
  Modal,
  ModalHeader,
  Textarea,
  ModalBody,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import {
  EmailIcon,
  AddIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  StarIcon,
} from "@chakra-ui/icons";
import { FaHeart } from "react-icons/fa";
import { FaList, FaUser, FaEllipsisH, FaFeatherAlt } from "react-icons/fa";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import dpLogo from "./assets/DP.png";
function Home() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [posts, setPosts] = useState<Array<{postId: string, content: string, url: string, image: string, count: string}>>([]);
  const [following, setFollowing] = useState<Record<string, boolean>>({});
  const [users, setUsers] = useState<Array<{id: string, image: string, username: string}>>([]);
  const [value, setValue] = useState([]);
  const [LoggedIn, setLoggedIn] = useState();
  // const initialRef = useRef(null);
  const [selectedPostId, setSelectedPostId] = useState('');
  const [selectedPostContent, setSelectedPostContent] = useState('');
  const [selectedPostImage, setSelectedPostImage] = useState('');
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  // const [id, setId] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);


  async function handleEdit() {
 
    console.log(text);
    const formData = new FormData();
    formData.append("id", selectedPostId);
    if (file) {
      formData.append("file", file); // ファイルを追加
    }
    formData.append("text", text); // テキストも追加
    axios.post("http://localhost:8080/edits", formData)
    .then(response => {
    
      if (response.status === 200) {
        console.log('Success:', response.data);
     
      }
    })
    .catch(error => {
      console.error('Error in upload:', error);
    })
    .finally(() => {
      onClose();
      window.location.reload(); // モーダルを閉じる
    });
  }

  const handleDelete = async (ID: string) =>   {
    console.log(ID);
    axios.delete(`http://localhost:8080/delete?ID=${ID}`)
      .then((response: any) => {
       console.log(response);
       window.location.reload();
      });
  }

  const likeCount = async (postId: any) => {
   try{ 
    const response = axios.get(`http://localhost:8080/likes?ID=${postId}`, { withCredentials: true })
     console.log(response);
     window.location.reload();
    }catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    axios
      .get("http://localhost:8080/logouts", { withCredentials: true })
      .then((response: any) => {
        console.log(response.data.success);
        setValue(response.data.success);
        window.location.reload();
        console.log(value);
      });
  };

  const openModal = (id: string, content: string, image: string) => {
    setSelectedPostId(id);
    setSelectedPostContent(content);
    setSelectedPostImage(image);
    onOpen();
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };


 
  const onTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };
  
  const follow = async (userId: string) => {
    try {
      if (following[userId]) {
        const response = await axios.post(
          `http://localhost:8080/unfollows`,
          { userId },
          { withCredentials: true },
        );
        console.log("Unfollowed:", response.data);
        setFollowing({ ...following, [userId]: response.data.success });
      } else {
        const response = await axios.post(
          "http://localhost:8080/follows",
          { userId },
          { withCredentials: true },
        );
        console.log("Followed:", response.data);

        setFollowing({ ...following, [userId]: response.data.success });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/isLoggedIn", { withCredentials: true })
      .then((response: any) => {
        console.log(response.data.success);
        setLoggedIn(response.data.success);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/get/cookies", { withCredentials: true })
      .then((response: any) => {
        console.log(response.data);
        setLoggedIn(response.data);
      });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/get/posts").then((response: any) => {
      console.log(response.data);
      setPosts(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/followings").then((response: any) => {
      for (let i = 0; i < response.data.length; i++) {
        const user = response.data[i];
        console.log(user.followed_id);
        setFollowing((prevFollowing) => ({
          ...prevFollowing,
          [user.followed_id]: user.is_following,
        }));
      }
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/get/users").then((response: any) => {
      setUsers(response.data);
    });
  }, []);

  // const [counters, setCounters] = useState({});

  // const updateCounter = (cardId, increment) => {
  //   setCounters((prevCounters) => ({
  //     ...prevCounters,
  //     [cardId]: (prevCounters[cardId] || 0) + increment,
  //   }));
  // };
  
  return (
    <>
      <Flex>
        <Box w="200px" h="1500px" p="3" m="3">
          <Flex direction="column" align="start">
            <Image
              src={dpLogo}
              alt="Logo"
              position="absolute"
              left="3"
              top="3"
              boxSize={45}
            />

            <IconButton
              aria-label="Lists"
              icon={<Icon as={FaList} w={30} h={30} />}
              variant="ghost"
              mt="30"
            />
            
              <IconButton
                aria-label="Profile"
                icon={<Icon as={FaUser} w={30} h={30} />}
                variant="ghost"
                mt="30"
              />
           
            <IconButton
              aria-label="More"
              icon={<Icon as={FaEllipsisH} w={30} h={30} />}
              variant="ghost"
              mt="30"
            />
            <Button
              colorScheme="twitter"
              leftIcon={<Icon as={FaFeatherAlt} />}
              mt="30"
              w="100%"
            >
              <Link href="/UpLoad">Tweet</Link>
            </Button>

            <Button
              colorScheme="twitter"
              leftIcon={<StarIcon />}
              mt="30"
              w="100%"
            >
              {LoggedIn ? (
                <div onClick={handleLogout}>Logout</div>
              ) : (
                <Link href="/Login">Login</Link>
              )}
            </Button>

            <Button
              colorScheme="twitter"
              leftIcon={<Icon as={FaFeatherAlt} />}
              mt="30"
              w="100%"
            >
              <Link href="/SignUp">SignUp</Link>
            </Button>

            <Button
              colorScheme="twitter"
              leftIcon={<Icon as={FaFeatherAlt} />}
              mt="30"
              w="100%"
            >
              <Link href="/Other">Followings</Link>
            </Button>
          </Flex>
        </Box>

        <Card overflow="auto" h="100vh" w="1000px">
          <Flex justify="center" align="center" direction="column">
        
            {posts && posts.map((post) => (
              <Card key={post.postId} mb="10">
                <CardHeader>
                  <Flex gap="4" alignItems="center">
                    <Avatar
                      name="Segun Adebayo"
                      src={post.image || "https://bit.ly/sage-adebayo"} 
                    />
                    <Box>
                      <Heading size="sm">Segun Adebayo</Heading>
                      <Text>@segun_adebayo · 6h</Text>
                    </Box>
                  </Flex>
                </CardHeader>
                <CardBody>
                  <Text>{post.content}</Text>
                  {post.url && (
                    <Image objectFit="cover" src={post.url} alt="Chakra UI" />
                  )}
                </CardBody>
                <CardFooter
                  justify="space-between"
                  flexWrap="wrap"
                  sx={{
                    "& > button": {
                      minW: "200px",
                    },
                  }}
                >
                  <Button flex="1" variant="ghost" leftIcon={<ArrowLeftIcon />}>
                  </Button>
                  <Button
                    flex="1"
                    variant="ghost"
                    leftIcon={<FaHeart />}
                    onClick={() => likeCount(post.postId)}
                  >
                  {post.count}
                  </Button>
                  <Button
                    flex="1"
                    variant="ghost"
                    leftIcon={<ArrowRightIcon/>}
                    // onClick={() => updateCounter(post.userId, +1)}
                  >
                  
                  </Button>
                  <Button onClick={() => openModal(post.postId, post.content,　post.url)}>edit</Button>
                  <Button  onClick={() => handleDelete(post.postId)}>delete</Button>

                  <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>編集画面</ModalHeader>
                      <ModalBody>
                    　<Image  src={selectedPostImage} alt="Chakra UI" />
                      <Textarea
                       value={text}
                       onChange={onTextChange}
                       placeholder={selectedPostContent}
                       resize="none"
                       rows={4}
                      />
                       <Input type="file" onChange={onFileChange} ref={fileInputRef} hidden />
                      <Button
                       leftIcon={<AddIcon />}
                       onClick={handleButtonClick}
                       aria-label="Upload file"
                       >
                       画像を変更
                       </Button>
                       <Button
                         onClick={handleEdit}
                         colorScheme="twitter"
                         leftIcon={<EmailIcon />}
                        >
        　　　　　　　　　　変更
      　　　　　　　　　　</Button>
                      </ModalBody>
                      <Button colorScheme='twitter' mr={100} ml={5} mb={2} onClick={onClose}　height="40px" width="100px">
                        Close
                      </Button>
                    </ModalContent>
                  </Modal>
                </CardFooter>
              </Card>
            ))}
          </Flex>
                
        </Card>
    
        <Box w="280px" borderLeft="1px" borderColor="gray.200">
          <Box p="3">
            <Heading size="sm">Trends for you</Heading>
            <Box mt="3">
              <Text fontWeight="bold">#LoremIpsum</Text>
              <Text>12.3K Tweets</Text>
            </Box>
            <Box mt="3">
              <Text fontWeight="bold">#DolorSitAmet</Text>
              <Text>8.7K Tweets</Text>
            </Box>
            <Box mt="3">
              <Text fontWeight="bold">#ConsecteturAdipiscing</Text>
              <Text>5.4K Tweets</Text>
            </Box>
            <Box mt="3">
              <Text fontWeight="bold">#QuisqueNislEros</Text>
              <Text>3.2K Tweets</Text>
            </Box>
            <Box mt="3">
              <Text fontWeight="bold">#MorbiABibendum</Text>
              <Text>2.1K Tweets</Text>
            </Box>
            <Box mt="3">
              <Text color="twitter.500">Show more</Text>
            </Box>
          </Box>

          <Box
            p="3"
            borderTop="1px"
            borderColor="gray.200"
            overflowY="auto"
            maxHeight="400px"
          >
            <Heading size="sm">Who to follow</Heading>
            {users && users.map((user) => (
              <Flex key={user.id} mt="3" alignItems="center">
                <Avatar name="Dan Abrahmov" src={user.image} />
                <Box ml="3">
                  <Text fontWeight="bold">{user.username}</Text>
                  <Text>@dan_abramov</Text>
                </Box>
                <Spacer />
                <Button
                  colorScheme="twitter"
                  size="sm"
                  onClick={() => follow(user.id)}
                >
                  {following[user.id] ? "Following" : "Follow"}
                </Button>
              </Flex>
            ))}
          </Box>
        </Box>
      </Flex>
    </>
  );
}

export default Home;
