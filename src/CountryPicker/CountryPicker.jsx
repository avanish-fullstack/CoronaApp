import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";

import styles from "./CountryPicker.module.css";
import { getCountries } from "../Api/index";

const CountryPicker = (props) => {

    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchCountries = async () => {
            setCountries(await getCountries())
        }
        fetchCountries();
    }, [setCountries])

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect onChange={(e) => props.select(e.target.value)}  defaultValue="" >
                <option value="">Global</option>
                {countries.map(country => <option key={country} value={country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    );
}

export default CountryPicker;