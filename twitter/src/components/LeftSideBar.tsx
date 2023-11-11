import { IconButton, Button, Link, Image } from "@chakra-ui/react";
import { PhoneIcon, WarningIcon, AddIcon } from "@chakra-ui/icons";
import dpLogo from "../assets/DP.png";
const LeftSideBar = () => {
  return (
    <>
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
    </>
  );
};

export default LeftSideBar;
