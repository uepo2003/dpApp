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
  Divider,
  Wrap,
  WrapItem,
  Link,
  Spacer,
  Icon
} from "@chakra-ui/react";
import {
  PhoneIcon,
  AddIcon,
  WarningIcon,
  RepeatIcon,
  ChatIcon,
  StarIcon,
} from "@chakra-ui/icons";
import {FaList, FaUser, FaEllipsisH, FaFeatherAlt} from 'react-icons/fa'
import { EmailIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import axios from "axios";
import dpLogo from "./assets/DP.png";
function Home() {
  const [posts, setPosts] = useState([]);
  const [following, setFollowing] = useState({});
  const [users, setUsers] = useState([]);
  const [value, setValue] = useState([]);
  const [LoggedIn, setLoggedIn] = useState();

  const handleLogout = async () => {
    axios
    .get("http://localhost:8080/logouts", { withCredentials: true })
    .then((response: any) => {
      console.log(response.data.success);
      setValue(response.data.success);
    })
  };
  const follow = async (userId) => {
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
        setValue(response.data.success);
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
      setPosts(response.data);
    });
  }, []);


  useEffect(() => {
    axios.get("http://localhost:8080/followings").then((response: any) => {
      　　for (let i = 0; i < response.data.length; i++) {
        const user = response.data[i];
        console.log(user.followed_id); 
        setFollowing(prevFollowing => ({
          ...prevFollowing,
          [user.followed_id]: user.is_following
        }));
      
      }
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/get/users").then((response: any) => {
      setUsers(response.data);
    });
  }, []);


  
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
        leftIcon={< StarIcon />}
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
        フォロワー一覧
      </Button>
    </Flex>
  </Box>

        <Card overflow="auto" h="100vh" w="1000px">
    <Flex justify="center" align="center" direction="column">
      {posts.map((post) => (
        <Card key={post.userId} mb="10">
          <CardHeader>
            <Flex spacing="4" alignItems="center">
              <Avatar
                name="Segun Adebayo"
                src="https://bit.ly/sage-adebayo"
              />

              <Box>
                <Heading size="sm">Segun Adebayo</Heading>
                <Text>@segun_adebayo · 6h</Text>
              </Box>
            </Flex>
          </CardHeader>
          <CardBody>
            <Text>
             {post.content}
            </Text>
            {post.url && (
              <Image
                objectFit="cover"
                src= { post.url }
                alt="Chakra UI"
              />
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
            <Button flex="1" variant="ghost" leftIcon={<WarningIcon/>}>
              9
            </Button>
            <Button flex="1" variant="ghost" leftIcon={<WarningIcon/>}>
              9
            </Button>
            <Button flex="1" variant="ghost" leftIcon={<WarningIcon/>}>
              6
            </Button>
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
    
    <Box p="3" borderTop="1px" borderColor="gray.200">
      <Heading size="sm">Who to follow</Heading>
      {users.map((user) => (
      <Flex mt="3" alignItems="center">
        <Avatar
          name="Dan Abrahmov"
          src="https://bit.ly/dan-abramov"
        />
        <Box ml="3">
          <Text fontWeight="bold">Dan Abrahmov</Text>
          <Text>@dan_abramov</Text>
        </Box>
        <Spacer />
        <Button colorScheme="twitter" size="sm" onClick={() => follow(user.id)}> 
        {following[user.id] ? "Follow" : "Following"}
        </Button>
      </Flex>
          ))}
      <Flex mt="3" alignItems="center">
        <Avatar
          name="Kent Dodds"
          src="https://bit.ly/kent-c-dodds"
        />
        <Box ml="3">
          <Text fontWeight="bold">Kent Dodds</Text>
          <Text>@kentcdodds</Text>
        </Box>
        <Spacer />
        <Button colorScheme="twitter" size="sm">
          Follow
        </Button>
      </Flex>
      <Flex mt="3" alignItems="center">
        <Avatar
          name="Ryan Florence"
          src="https://bit.ly/ryan-florence"
        />
        <Box ml="3">
          <Text fontWeight="bold">Ryan Florence</Text>
          <Text>@ryanflorence</Text>
        </Box>
        <Spacer />
        <Button colorScheme="twitter" size="sm">
          Follow
        </Button>
      </Flex>
</Box>
          <WrapItem>
            <Avatar
              size="2xl"
              name="Segun Adebayo"
              src="https://bit.ly/sage-adebayo"
              ml="20"
              mt="20"
            />
            <Text fontSize="sm">{value}</Text>
          </WrapItem>
          <Button
            size="md"
            height="48px"
            width="200px"
            border="2px"
            borderColor="twitter.500"
          >
            フォロー中
          </Button>
        </Box>
      </Flex>
    </>
  );
}

export default Home;
