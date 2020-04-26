import axios from "axios";

const url = "https://covid19.mathdro.id/api";

const fetchData = async (country) => {
    let dynamicUrl = country ? `${url}/countries/${country}` : url;

    const { data } = await axios.get(dynamicUrl);
    const transformedData = {
        confirmed: data.confirmed,
        recovered: data.recovered,
        deaths: data.deaths,
        lastUpdate: data.lastUpdate
    };

    return transformedData;
}

const fetchDailyData = async () => {
    const { data } = await axios.get(`${url}/daily`);

    const transformedData = data.map(d => ({
        confirmed: d.confirmed.total,
        deaths: d.deaths.total,
        date: d.reportDate
    }));

    return transformedData;
};

const getCountries = async () => {
    const { data: { countries } } = await axios.get(`${url}/countries`)
    return countries.map(c => c.name);
}


export { fetchData, fetchDailyData, getCountries };