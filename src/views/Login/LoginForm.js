import { SettingsInputSvideoRounded, SettingsSystemDaydreamTwoTone } from '@material-ui/icons';
import React, { useState } from 'react';
import axios from 'axios';
import '../../css/Login.css';

function LoginForm({ Login, error, onSubmit }) {
    const [details, setDetails] = useState({name: "", password: ""});

    const submitHandler = e => { //called on submit, posts to backend 
        e.preventDefault();
        // log in user
        axios.post('http://127.0.0.1:5000/login', {
            username : details.name,
            password : details.password
        })
            .then(function(response) {
                console.log(response);
                if (response['data']['status'] === 200) {
                    Login(details);
                    onSubmit()
                    localStorage.setItem("token", response['data']['access_token']) // store token in local storage
                    console.log(localStorage.getItem("token"))
                }
                else if (response['data']['status'] === 403) {
                    error(response['data']['message'])
                }
        })
        .catch(function(error){
            console.log(error);
        });
    }

    return ( //set up entries for form, set details on change

        <form onSubmit={submitHandler}> 
            <div className="form-inner"> 
                <h2>Welcome!</h2>
                <div className="form-group">
                    <label htmlFor="name">Username: </label>
                    <input type="text" name="name" id="name" 
                    onChange={e => setDetails({...details, name: e.target.value})} value={details.name}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" id="password" 
                    onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
                </div>
                <input type="submit" value="LOGIN" />
                <h4> Don't have an account? </h4>
                <a href="/SignUp">Sign Up</a>
            </div>
        </form>
        
    )
}

export default LoginForm;