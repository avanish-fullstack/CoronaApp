import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import "./Cards.css";
import CountUp from "react-countup";

const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
    if (!confirmed) {
        return <h5> Loading... </h5>;
    }

    //Did not like creating a plain css class ,  still looking  for dynamic modular styles solution
    const cardsData = [{ type: "Infected", value: confirmed.value, description: "Number of active cases of COVID-19", class: "card infected" },
    { type: "Recovered", value: recovered.value, description: "Number of recovered cases of COVID-91", class: "card recovered" },
    { type: "Deaths", value: deaths.value, description: "Number of deaths from COVID-91", class: "card deaths" }]
    return (
        <div className="card_container">
            <Grid container spacing={3} justify="center">
                {cardsData.map(cdata =>
                    <Grid item component={Card} xs={12} md={3} className={cdata.class} >
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>{cdata.type}</Typography>
                            <Typography variant="h5" >
                                <CountUp start={0} end={cdata.value} duration={2.5} separator=",">
                                </CountUp>
                            </Typography>
                            <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                            <Typography variant="body2">{cdata.description}</Typography>
                        </CardContent>
                    </Grid>
                )}
            </Grid>
        </div>
    );
}

export default Cards;