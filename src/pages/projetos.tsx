/* eslint-disable @next/next/no-img-element */
import {
  Text,
  Stack,
  Flex,
  Link,
  Box,
  SimpleGrid,
  Center,
  Container,
  useDisclosure,
} from "@chakra-ui/react";
import Header from "../components/header";
import SmallWithNavigation from "../components/footer";
import React, { useState, useEffect } from "react";
import { Spinner } from "@chakra-ui/react";
import useCopyToClipboard from "../components/modal/content/copy";
import { NextSeo } from "next-seo";
import { bio } from "../utils/bio";

export default function Sobre() {
  useEffect(() => {
    setTimeout(() => {
      fetch("https://api.github.com/users/ryanoliveiragit/repos")
        .then((response: { json: () => any }) => response.json())
        .then((data) => setRepositories(data));
      setRemoveLoading(false);
    }, 100);
  }, []);
  const [repositoreis, setRepositories] = useState<any[]>([]);
  const [removeLoading, setRemoveLoading] = useState(true);
  const [value, copy] = useCopyToClipboard();
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === "c") {
      setIsComponentVisible(true);
    }
  };

  const shortcutsHand = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === "x") {
      copy("www.ryanvs.dev/");
    }
    if (event.key == "e") {
      window.open(
        "https://mail.google.com/mail/u/0/#inbox?compose=CllgCJTNqVmWVnQJqKwjHbgqBKcjWVwtgZwfDkfdQMXLXsbgWCRgBSfVfnLRSZVPSfdXnsmMmkL"
      );
    }
    if (event.key == "h") {
      window.location.href = "/";
    }
    if (event.key == "s") {
      window.location.href = "/sobre";
    }
    if (event.key == "p") {
      window.location.href = "/projetos";
    }
    if (event.altKey && event.key == "c") {
      window.location.href = "/contato";
    }
    if (event.key == "i") {
      window.open("https://www.instagram.com/ryan.jsx/");
    }
    if (event.key == "g") {
      window.open("https://github.com/ryanoliveiragit");
    }
    if (event.key == "l") {
      window.open("https://www.linkedin.com/in/ryan-oliveira-169a371a4/");
    }
    if (event.key == "d") {
      window.open("https://discord.gg/nD3YgMYhre");
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", shortcutsHand);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.addEventListener("keydown", shortcutsHand);
      document.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const Astethic = repositoreis.filter(
    (repositorys) => repositorys.id == "591421421"
  );
  const RocketFeed = repositoreis.filter(
    (repositorys) => repositorys.id == "586054834"
  );
  const RocketTimer = repositoreis.filter(
    (repositorys) => repositorys.id == "587723060"
  );
  const Weather = repositoreis.filter(
    (repositorys) => repositorys.id == "525926819"
  );
  const noderam = repositoreis.filter(
    (repositorys) => repositorys.id == "530765405"
  );
  const crud = repositoreis.filter(
    (repositorys) => repositorys.id == "586285690"
  );
  return (
    <>
      <NextSeo
        title="Projetos - Ryan Oliveira Brito - Front-end Developer"
        description={bio}
        canonical="https://www.ryanvs.dev/"
      />
      <Header />
      <Container>
        <Center display={"column"}>
          <Text
            mt={"5vh"}
            fontWeight={"700"}
            fontSize={24}
            color={"principal.100"}
          >
            Trabalho, hobby & open source.
          </Text>
          <Text lineHeight={5} fontSize={16} pt={"2%"} color={"gray.500"}>
            Essa página lista os <span>6</span> principais projetos que venho
            desenvolvendo durante a minha jornada como programador.
          </Text>
        </Center>
        <Text
          mb={"5%"}
          mt={"12%"}
          fontSize={14}
          fontWeight={"600"}
          color={"gray.100"}
        >
          Projetos Populares:
        </Text>
        <SimpleGrid
          className="gridmobile"
          pb={"25%"}
          gap={5}
          columns={2}
          spacing={2}
        >
          {removeLoading && <Spinner color={"white"} />}
          <Text color={"gray.500"} fontSize={14}>
            {Astethic.map((repository) => {
              return (
                // eslint-disable-next-line react/jsx-key
                <Box h={"100%"} pl={"4%"} borderLeft={"1px solid #996dff"}>
                  <Text
                    className="gradientApiGit"
                    fontSize={16}
                    fontWeight={"700"}
                    color={"White"}
                  >
                    <Link target={"_blank"} href={repository.html_url}>
                      {repository.name}
                    </Link>
                  </Text>
                  <Text fontSize={"12px"} color={"gray.4500"}>
                    {repository.description}
                  </Text>
                  <Flex>
                    <Box alignItems={"center"} display={"flex"}>
                      <Text color={"blue.200"}>Linguagem</Text>{" "}
                      <Text color={"gray.200"}>: {repository.language}</Text>
                    </Box>
                  </Flex>
                </Box>
              );
            })}
          </Text>
          <Text color={"gray.500"} fontSize={14}>
            {RocketFeed.map((repository) => {
              return (
                // eslint-disable-next-line react/jsx-key
                <Box h={"100%"} pl={"4%"} borderLeft={"1px solid #996dff"}>
                  <Text
                    className="gradientApiGit"
                    fontSize={16}
                    fontWeight={"700"}
                    color={"White"}
                  >
                    <Link target={"_blank"} href={repository.html_url}>
                      {repository.name}
                    </Link>
                  </Text>
                  <Text fontSize={"12px"} color={"gray.4500"}>
                    {repository.description}
                  </Text>
                  <Box alignItems={"center"} display={"flex"}>
                    <Text as={"i"} color={"blue.200"}>
                      Linguagem
                    </Text>{" "}
                    <Text color={"gray.200"}>: {repository.language}</Text>
                  </Box>
                </Box>
              );
            })}
          </Text>
          <Text color={"gray.500"} fontSize={14}>
            {crud.map((repository) => {
              return (
                // eslint-disable-next-line react/jsx-key
                <Box h={"100%"} pl={"4%"} borderLeft={"1px solid #996dff"}>
                  <Text
                    className="gradientApiGit"
                    fontSize={16}
                    fontWeight={"700"}
                    color={"White"}
                  >
                    <Link target={"_blank"} href={repository.html_url}>
                      {repository.name}
                    </Link>
                  </Text>
                  <Text fontSize={"12px"} color={"gray.4500"}>
                    {repository.description}
                  </Text>
                  <Flex>
                    <Text as={"i"} color={"blue.200"}>
                      Linguagem
                    </Text>{" "}
                    <Text color={"gray.200"}>: {repository.language}</Text>
                  </Flex>
                </Box>
              );
            })}
          </Text>
          <Text color={"gray.500"} fontSize={14}>
            {RocketTimer.map((repository) => {
              return (
                // eslint-disable-next-line react/jsx-key
                <Box h={"100%"} pl={"4%"} borderLeft={"1px solid #996dff"}>
                  <Text
                    className="gradientApiGit"
                    fontSize={16}
                    fontWeight={"700"}
                    color={"White"}
                  >
                    <Link target={"_blank"} href={repository.html_url}>
                      {repository.name}
                    </Link>
                  </Text>
                  <Text fontSize={"12px"} color={"gray.4500"}>
                    {repository.description}
                  </Text>
                  <Flex>
                    <Text as={"i"} color={"blue.200"}>
                      Linguagem
                    </Text>{" "}
                    <Text color={"gray.200"}>: {repository.language}</Text>
                  </Flex>
                </Box>
              );
            })}
          </Text>
          <Text color={"gray.500"} fontSize={14}>
            {Weather.map((repository) => {
              return (
                // eslint-disable-next-line react/jsx-key
                <Box h={"100%"} pl={"4%"} borderLeft={"1px solid #996dff"}>
                  <Text
                    className="gradientApiGit"
                    fontSize={16}
                    fontWeight={"700"}
                    color={"White"}
                  >
                    <Link target={"_blank"} href={repository.html_url}>
                      {repository.name}
                    </Link>
                  </Text>
                  <Text fontSize={"12px"} color={"gray.4500"}>
                    {repository.description}
                  </Text>
                  <Flex>
                    <Text as={"i"} color={"blue.200"}>
                      Linguagem
                    </Text>{" "}
                    <Text color={"gray.200"}>: {repository.language}</Text>
                  </Flex>
                </Box>
              );
            })}
          </Text>
          <Text color={"gray.500"} fontSize={14}>
            {noderam.map((repository) => {
              return (
                // eslint-disable-next-line react/jsx-key
                <Box h={"100%"} pl={"4%"} borderLeft={"1px solid #996dff"}>
                  <Text
                    className="gradientApiGit"
                    fontSize={16}
                    fontWeight={"700"}
                    color={"White"}
                  >
                    <Link target={"_blank"} href={repository.html_url}>
                      {repository.name}
                    </Link>
                  </Text>
                  <Text fontSize={"12px"} color={"gray.4500"}>
                    {repository.description}
                  </Text>
                  <Flex>
                    <Text as={"i"} color={"blue.200"}>
                      Linguagem
                    </Text>{" "}
                    <Text color={"gray.200"}>: {repository.language}</Text>
                  </Flex>
                </Box>
              );
            })}
          </Text>
        </SimpleGrid>
      </Container>
      <SmallWithNavigation />
    </>
  );
}
