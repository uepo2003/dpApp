import {
  Box,
  Button,
  CardBody,
  CardHeader,
  Divider,
  Heading,
  Image,
  Stack,
  StackDivider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Other from "./Other";
import { FollowProps } from "./Id";
const CenterBar: React.FC<FollowProps> = ({ user }) => {
  return (
    <>
      <CardHeader>
        <Heading size="md">Home</Heading>
      </CardHeader>
      <CardBody>
        <Tabs variant="soft-rounded" colorScheme="twitter">
          <TabList>
            <Tab>自分の投稿</Tab>
            <Tab>みんなの投稿</Tab>
          </TabList>
          <Divider orientation="horizontal" mt="2" />
          <TabPanels style={{ overflow: "scroll", maxHeight: "100vh" }}>
            <TabPanel>
              <Stack divider={<StackDivider />} spacing="10">
                <Other user={user} />
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
                  <Button mt="30">投稿を見る</Button>
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
                  <Button mt="30">投稿を見る</Button>
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
                  <Button mt="30">投稿を見る</Button>
                </Box>
              </Stack>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </CardBody>
    </>
  );
};

export default CenterBar;
