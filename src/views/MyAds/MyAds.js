import { Box, Container, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import AppBar from "../../components/AppBar/AppBar";
import api from "../../services/api";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import AdCard from "../../components/AdCard/AdCard";
import { useHistory } from "react-router";

function MyAds() {
  const [credit, setCredits] = useState();
  const [ads, setAds] = useState();
  const history = useHistory();

  useEffect(() => {
    const getCredits = async () => {
      api
        .getCredits()
        .then((result) => {
          setCredits(result.data.creditos);
        })
        .catch((err) => {
          console.log(err);
          if (err.response?.status === 401) {
            history.replace("/login");
          }
        });
    };

    const getAds = async () => {
      api
        .getAds()
        .then((result) => {
          setAds(result.data);
          console.log(result.data);
        })
        .catch((err) => {
          console.log(err);
          if (err.response?.status === 401) {
            history.replace("/login");
          }
        });
    };

    getCredits();
    getAds();
  }, [history]);

  return (
    <>
      <AppBar />
      <Container maxWidth="md">
        {credit !== undefined ? (
          <Box mt={2}>
            Usted cuenta con <b>{credit}</b> créditos libres en su cuenta.
            Recuerde que primero deberá contar con saldo antes de publicar un
            anuncio. Para adquirir dichos créditos, podrá hacerlo{" "}
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
                  region={elem.region?.name || "Todas las regiones."}
                  department={
                    elem.department?.name || "Todos los departamentos."
                  }
                  district={elem.district?.name || "Todos los distritos."}
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
