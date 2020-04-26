import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../Api/index";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";

const Chart = ({ data : {confirmed,deaths,recovered}, country }) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }        
        fetchAPI();
    }, []); //use [] to make it behave like component did mount else happens endlessly

    const lineChart = dailyData.length ? (<Line
        data={{
            labels: dailyData.map(d => (d.date)),
            datasets: [{
                data: dailyData.map(d => (d.confirmed)),
                label: "Infected",
                borderColor: "#3333ff",
                fill: true
            }, {
                data: dailyData.map(d => (d.deaths)),
                label: "Deaths",
                borderColor: "#red",
                backgroundColor: "rgba(255,0,0,0.5)",
                fill: true
            }]
        }} />) : null;
 
console.log(confirmed);
console.log(recovered);
console.log(deaths);

    const barChart = (
        confirmed ? (<Bar
            data={{
                labels: ['Infected', 'Recovered', 'Deaths'],
                datasets: [{
                    label: 'People',
                    backgroundColor: ['rgba(0,0,255,0.5)',
                        'rgba(0,255,0,0.5)',
                        'rgba(255,0,0,0.5)'],
                    data: [confirmed.value, recovered.value, deaths.value]
                }]
            }}
            options={{
                legend: { display: false },
                title: { display: true, text: `Current state is ${country}` }
            }} />) : null
    );


    return (
        <div className={styles.container}>
            {country ? barChart: lineChart}
        </div>
    );
}

export default Chart;