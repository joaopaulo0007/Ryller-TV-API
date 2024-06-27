require("dotenv").config();
const API_KEY=process.env.API_KEY;
fetch("https://v3.football.api-sports.io/standings?league=71&season=2024&team=127",{
    method:"GET",
    headers:{
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": API_KEY
    }
}).then(res=>{res.json().then(resposta=>console.log(resposta))})