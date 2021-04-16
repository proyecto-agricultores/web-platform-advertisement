import { Box, Container, Link as LinkMui } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import AppBar from "../../components/AppBar/AppBar";
import api from "../../services/api";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

function MyAds() {
  const [credit, setCredits] = useState();

  useEffect(async () => {
    api
      .getCredits()
      .then((result) => {
        setCredits(result.data.creditos);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <AppBar />
      <Container maxWidth="sm">
        {credit !== undefined ? (
          <Box mt={3}>
            Usted cuenta con <b>{credit}</b> créditos en su cuenta. Recurde que
            primero deberá contar con saldo antes de publicar un anuncio. Para
            adquirir dichos créditos, podrá hacerlo{" "}
            <Link to="/buyCredits">
              <LinkMui>aquí.</LinkMui>
            </Link>
          </Box>
        ) : (
          <Box mt={3}>
            <Skeleton count={3} />
          </Box>
        )}
      </Container>
    </>
  );
}

export default MyAds;
