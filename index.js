//server side
const express = require('express');
const bodyParser = require("body-parser");
const axios = require('axios');
const cors = require('cors');
const { response } = require('express');
const app = express()

app.use(cors())
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));

const client_id='502342aaf5a3bf435d7e';
const client_secret='dbb9d006fe06f1a4b3266ce48904aac375f8eb03';

app.post('/callback', function (req, res) {
    const code = req.query.code;
    axios.post(`https://github.com/login/oauth/access_token?grant_type=authorization_code&code=${code}&redirect_uri=http://localhost:3000/callback&client_id=${client_id}&client_secret=${client_secret}`).
    then(response => {
        const token = response.data.slice(response.data.indexOf('=')+1,response.data.indexOf('&'))
        console.log('data: '+ response.data)
        if(token=='bad_verification_code'){
            console.log('400'+token)
            return res.status(400).json({message:token})
        }
        console.log('200'+token)
        return res.status(200).json({token})
    }).
    catch(err =>{ 
        return res.status(500).json({message:err.message})
    });
})
 
app.listen(4000)

