import React, { Component } from 'react';

import Cards from "./Cards/Cards";
import Chart from "./Chart/Chart";
import CountryPicker from "./CountryPicker/CountryPicker";

import styles from "./App.module.css";
import { fetchData } from "./Api/index";
import coronaImage from "./images/corona.png";

class App extends Component {
  state = { //this creates contructor in backend
    data: {},
    country: ''
  };

  async componentDidMount() {
    const retrievedData = await fetchData();
    this.setState({ data: retrievedData });
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, country: country });
  }
  
  render() {

    const { data, country } = this.state;

    return <div className={styles.container}>
      <img className={styles.image} src={coronaImage} alt="Covid-19 image"></img>
      <Cards data={this.state.data} />
      <CountryPicker select={this.handleCountryChange.bind(this)} />
      <Chart data={data} country={country} />
    </div>
  }
}

export default App;
