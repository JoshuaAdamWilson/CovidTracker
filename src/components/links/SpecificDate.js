import React, {useState} from 'react';
import axios from 'axios';
import TotalCard from '../cards/TotalCard';
import './links.css'
import { Button } from '@material-ui/core';
import { postToProfile } from '../../api'

const SpecificDate = () => {
    const [specificState, setSpecificState] = useState("AL");
    const [specificDate, setSpecificDate] = useState('2021-01-06');
    const [positives, setPositives] = useState([]);
    const [deaths, setDeaths] = useState([]);


    const submitSpecificState = (event) => {
        setSpecificState(event.target.value);
    }

    const submitSpecificDate = (event) => {
        setSpecificDate(event.target.value);
        GetApi();
    }

    const GetApi = () => {
        const formDate = specificDate.split('-').join('');
        axios
            .get(`https://api.covidtracking.com/v1/states/${specificState}/${formDate}.json`)
            .then((res) => {
                const data = res.data;
                setPositives(data.positive.toLocaleString());
                setDeaths(data.death.toLocaleString());
            })
            .catch((err) => {
            console.log(err);
            });
    }

    const sendToProfile = () => {
        const body = JSON.stringify({ specificState, specificDate, positives, deaths });
        postToProfile(body)
    }

    return ( 
        <div className="specificdate">
            <form>
                <select onChange={(e) => submitSpecificState(e)}>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="DC">District Of Columbia</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                </select>
                <input type="date" onChange={(e) => submitSpecificDate(e)} />
            </form>
            <Button variant="contained" onClick={() => sendToProfile()}>Add to Profile</Button>
            <TotalCard 
                region={specificState} 
                cases={positives} 
                deaths={deaths} 
                date='On this date:'
                updated={specificDate} 
            />
        </div>
    )
}

export default SpecificDate;