import { Avatar, Wrap, WrapItem, Box, Button } from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";
const RightSideBar = () => {
  return (
    <>
      <Wrap direction="column" align="start" spacing="5" ml="2">
        <WrapItem>
          <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
          <Box fontSize="20px" color="black" mt="3" ml="2">
            niko
          </Box>
          <Button
            leftIcon={<EmailIcon />}
            colorScheme="twitter"
            variant="solid"
            mt="2"
            ml="2"
          ></Button>
          <button onClick={follow} disabled={isFollowing}>
            {isFollowing ? "フォロー中" : "フォローする"}
          </button>
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
          <Avatar name="Prosper Otemuyiwa" src="https://bit.ly/prosper-baba" />
        </WrapItem>
        <WrapItem>
          <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
        </WrapItem>
        <WrapItem>
          <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
        </WrapItem>
      </Wrap>
    </>
  );
};

export default RightSideBar;
