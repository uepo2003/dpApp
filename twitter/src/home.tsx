import "./App.css";
import { Box, Flex, Button, IconButton, Image } from "@chakra-ui/react";
import { PhoneIcon, AddIcon, WarningIcon } from "@chakra-ui/icons";
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import dpLogo from "./assets/DP.png";
import {
  Avatar,
  Wrap,
  WrapItem,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import {
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Tabs,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [input, setInput] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = async () => {
    const post = { content: input };
    await axios.post("http://localhost:8080/posts", post);
    setInput("");
  };

  const isError = input === "";
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
              aria-label="Home"
              icon={<PhoneIcon w={30} h={30} />}
              variant="ghost"
              mt="30"
            />
            <IconButton
              aria-label="Explore"
              icon={<WarningIcon w={30} h={30} color="red.500" />}
              variant="ghost"
              mt="30"
            />
            <IconButton
              aria-label="Notifications"
              icon={<AddIcon boxSize={30} />}
              variant="ghost"
              mt="30"
            />
            <IconButton
              aria-label="Messages"
              icon={<PhoneIcon w={30} h={30} />}
              variant="ghost"
              mt="30"
            />
            <Button colorScheme="twitter" leftIcon={<PhoneIcon />} mt="30">
              Tweet
            </Button>
            <Button colorScheme="twitter" size="lg" mt="30">
              　　　　 <Link href="/SignUp">SignUp</Link>
              　　　　　
            </Button>
            <Button colorScheme="twitter" size="lg" mt="30">
              　　　　 <Link href="/Login">Login</Link>
              　　　　　
            </Button>
          </Flex>
        </Box>
        <Card w="1000px">
          <CardHeader>
            <Heading size="md">Home</Heading>
          </CardHeader>

          <CardBody>
            <Tabs variant="soft-rounded" colorScheme="twitter">
              <TabList>
                <Tab>自分の投稿</Tab>
                <Tab>みんなの投稿</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Stack divider={<StackDivider />} spacing="10">
                    <Box>
                      　
                      <Image
                        src="https://bit.ly/dan-abramov"
                        alt="Dan Abramov"
                        ml="auto"
                        mr="auto"
                      />
                      <Heading size="xs" textTransform="uppercase">
                        Summary
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        View a summary of all your clients over the last month.
                      </Text>
                      <Button onClick={onOpen} mt="30">
                        投稿を見る
                      </Button>
                    </Box>
                    <Box>
                      <Image
                        src="https://bit.ly/dan-abramov"
                        alt="Dan Abramov"
                        ml="auto"
                        mr="auto"
                      />
                      <Heading size="xs" textTransform="uppercase">
                        Overview
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        Check out the overview of your clients.
                      </Text>
                      <Button onClick={onOpen} mt="30">
                        投稿を見る
                      </Button>
                    </Box>
                    <Box>
                      <Image
                        src="https://bit.ly/dan-abramov"
                        alt="Dan Abramov"
                        ml="auto"
                        mr="auto"
                      />
                      <Heading size="xs" textTransform="uppercase">
                        Analysis
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        See a detailed analysis of all your business clients.
                      </Text>
                      <Button onClick={onOpen} mt="30">
                        投稿を見る
                      </Button>
                    </Box>
                    <FormControl isInvalid={isError}>
                      <FormLabel>投稿</FormLabel>
                      <Input
                        type="text"
                        value={input}
                        onChange={handleChange}
                      />
                      <Button type="submit" onClick={handleSubmit} mt="30">
                        Submit
                      </Button>
                      {!isError ? (
                        <FormHelperText>
                          投稿したい内容を入力してください。
                        </FormHelperText>
                      ) : (
                        <FormErrorMessage>
                          投稿内容は必須です。
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  </Stack>
                </TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </CardBody>
        </Card>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>　あなたの投稿</ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost">Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Box w="280px" borderLeft="1px" borderColor="gray.200">
          <Wrap direction="column" align="start" spacing="5" ml="2">
            <WrapItem>
              <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
            </WrapItem>
            <WrapItem>
              <Avatar
                name="Kola Tioluwani"
                src="https://bit.ly/tioluwani-kolawole"
              />
            </WrapItem>
            <WrapItem>
              <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
            </WrapItem>
            <WrapItem>
              <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
            </WrapItem>
            <WrapItem>
              <Avatar
                name="Prosper Otemuyiwa"
                src="https://bit.ly/prosper-baba"
              />
            </WrapItem>
            <WrapItem>
              <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
            </WrapItem>
            <WrapItem>
              <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
            </WrapItem>
          </Wrap>
        </Box>
      </Flex>
    </>
  );
}

export default Home;
