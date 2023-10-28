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
} from "@chakra-ui/react";
import FollowButton from './components/Follow';
import { PhoneIcon, AddIcon } from "@chakra-ui/icons";

import { FollowProps } from "./components/Id";
const Other: React.FC<FollowProps> = ({ user }) => {
  return (
    <>
    <Flex justify="center" align="center" h="100vh">
      <Card maxW="md">
        <CardHeader>
          <Flex spacing="4">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />

              <Box>
                <Heading size="sm">Segun Adebayo</Heading>
                <Text>Creator, Chakra UI</Text>
              </Box>
            </Flex>
            <IconButton
              variant="ghost"
              colorScheme="gray"
              aria-label="See menu"
              icon={< PhoneIcon />}
            />
          </Flex>
        </CardHeader>
        <CardBody>
          <Text>
            With Chakra UI, I wanted to sync the speed of development with the
            speed of design. I wanted the developer to be just as excited as the
            designer to create a screen.
          </Text>
        </CardBody>
        <Image
          objectFit="cover"
          src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Chakra UI"
        />

        <CardFooter
          justify="space-between"
          flexWrap="wrap"
          sx={{
            "& > button": {
              minW: "136px",
            },
          }}
        >
          <Button flex="1" variant="ghost" leftIcon={<AddIcon />}>
          <FollowButton user={user} />
          </Button>
          <Button flex="1" variant="ghost" leftIcon={<AddIcon />}>
            Comment
          </Button>
          <Button flex="1" variant="ghost" leftIcon={<AddIcon />}>
            Share
          </Button>
        </CardFooter>
      </Card>
      </Flex>
    </>
  );
}

export default Other;
