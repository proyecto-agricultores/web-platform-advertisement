import {
  Box,
  Container,
  Grid,
  Link as LinkMui,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import AppBar from "../../components/AppBar/AppBar";
import api from "../../services/api";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import AdCard from "../../components/AdCard/AdCard";

function MyAds() {
  const [credit, setCredits] = useState();
  const [ads, setAds] = useState();

  useEffect(async () => {
    api
      .getCredits()
      .then((result) => {
        setCredits(result.data.creditos);
      })
      .catch((err) => {
        console.log(err);
      });
    api
      .getAds()
      .then((result) => {
        setAds(result.data);
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <AppBar />
      <Container maxWidth="md">
        {credit !== undefined ? (
          <Box mt={2}>
            Usted cuenta con <b>{credit}</b> créditos en su cuenta. Recurde que
            primero deberá contar con saldo antes de publicar un anuncio. Para
            adquirir dichos créditos, podrá hacerlo{" "}
            <Link id="buyCreditsLink" to="/buyCredits">
              aquí.
            </Link>
          </Box>
        ) : (
          <Box mt={3}>
            <Skeleton count={2} />
          </Box>
        )}
      </Container>
      <Box m={4} />
      <Container maxWidth="md">
        <Typography variant="h4">Mis Anuncios</Typography>
        {ads !== undefined ? (
          <Grid
            container
            spacing={2}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            {ads.map((elem) => (
              <Grid item key={elem.id}>
                <AdCard
                  id={elem.id}
                  name={elem.name}
                  for_orders={elem.for_orders}
                  for_publications={elem.for_publications}
                  region={elem.region?.name || "n/a"}
                  department={elem.department?.name || "n/a"}
                  district={elem.district?.name || "n/a"}
                  remaining_credits={elem.remaining_credits}
                  picture_URL={elem.picture_URL}
                  URL={elem.URL}
                  beginning_sowing_date={elem.beginning_sowing_date}
                  ending_sowing_date={elem.ending_sowing_date}
                  beginning_harvest_date={elem.beginning_harvest_date}
                  ending_harvest_date={elem.ending_harvest_date}
                ></AdCard>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box pt={0.5}>
            <Skeleton variant="rect" width={210} height={118} />
          </Box>
        )}
      </Container>
    </>
  );
}

export default MyAds;
