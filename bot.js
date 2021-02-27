require("dotenv").config()


const Discord = require('discord.js')
const client = new Discord.Client()
const axios = require('axios')


client.on('ready', () => {
    console.log('Bot ready!!!')
})

client.on('message', msg => {
    if (msg.content === "!help") {
        //msg.channel.send("not tagged")
        msg.reply('I can do !advice, !senddog, !eightball, !weather "a city here", !coinFlip, !meow, !randomBetween "a number here", !sports, and !ping')
        msg.react("👍")
    }
})

client.on('message', msg => {
    if (msg.content === "!ping") {
        //msg.channel.send("not tagged")
        msg.reply("Pong!")
        msg.react("❤️")
    }
})


client.on('message', msg => {
    if (msg.content === "!senddog") {
        msg.channel.send("Doggo" + randomDog())

    function randomDog(){
        axios.get("https://dog.ceo/api/breeds/image/random")
        .then((res) => {
            //console.log('RES:', res.data.message)
            msg.channel.send(res.data.message)
            
        })
        .catch((err) => {
            console.error('ERR:', err)
        })
        return " "}
        }
})
client.on('message', msg => {
    if (msg.content === "!meow") {
        msg.channel.send("meow" + randomCat())

    function randomCat(){
        axios.get("https://api.thecatapi.com/v1/images/search")
        .then((res) => {
            //console.log('RES:', res.data[0].url)
            msg.channel.send(res.data[0].url)
            
        })
        .catch((err) => {
            console.error('ERR:', err)
        })
        return " "}
        }
})

client.on('message', msg => {
    if (msg.content === "!advice") {
        msg.channel.send("Helpful bot says: " + giveAdvice())

    function giveAdvice(){
        axios.get("https://api.adviceslip.com/advice")//api of somewhere 
        .then((res) => {
            //console.log('RES:', res.data.slip.advice)//test what JSON you get back and assess leave as just res first then manipulate that 
            msg.reply(res.data.slip.advice)//send to the channel 
            
        })
        .catch((err) => {
            console.error('ERR:', err)
        })
        return " "}//in case its giving errors of blank messages here a blank to silence that 
        }
})

const eightBallArray = [
        "As I see it, yes.",
        "Ask again later.",
        "Better not tell you now.",
        "Cannot predict now.",
        "Concentrate and ask again.",
        "Don't count on it.",
        "It is certain.",
        "It is decidedly so.",
        "Most likely.",
        "My reply is no.",
        "My sources say no.",
        "Outlook not so good.",
        "Outlook good.",
        "Reply hazy, try again.",
        "Signs point to yes.",
        "Very doubtful.",
        "Without a doubt.",
        "Yes.",
        "Yes – definitely.",
        "You may rely on it.",
        "Eat my shorts."
];
client.on('message', msg => {
    if (msg.content === "!eightball") {
        const randomNumber = Math.floor(Math.random()* eightBallArray.length);
        msg.reply(eightBallArray[randomNumber])
        msg.react("🎱")
    }
})
var i;
client.on('message', msg => {
    if ((msg.content.startsWith("Im")) || (msg.content.startsWith("I’m")) || (msg.content.startsWith("im")) || (msg.content.startsWith("i'm"))){
        const args = msg.content.slice().trim().split(/ +/g);
        const theCommand = args.shift();
        var stringer = "";
        for(i = 0; i < args.length; i++){
            stringer = stringer + " " + args[i];
        }
        msg.channel.send("Hi" + stringer + ", im HelpfulBot")
        return;
    }
})
client.on('message', msg => {
    if (msg.content === "!coinFlip") {
        const coin = 2;
        const randomNumber = Math.floor(Math.random()* coin);
        if(randomNumber == 1){
            msg.reply("Heads!" , {
            files: [
                "https://faculty.math.illinois.edu/~hildebr/fakerandomness/resources/heads.png"
            ] 
        });
        } else{
            msg.reply("Tails!", {
                files: [
                    "https://random-ize.com/coin-flip/us-quarter/us-quarter-back.jpg"
                ] 
            });
        }
    }
})
client.on('message', msg => {
    if (msg.content.startsWith("!randomBetween")){
    const args = msg.content.slice().trim().split(/ +/g);
    const command = args.shift().toLowerCase();   
    const randomNumber = Math.floor(Math.random()* args[0]);
    msg.channel.send("You randomed between "+args[0]+" and 0 to get "+ randomNumber);
    }
});

client.on('message', msg => {
    if (msg.content.startsWith("!weather")){
        const args = msg.content.slice().trim().split(/ +/g);
        const theCommand = args.shift().toLowerCase();
        const city = args[0];
            axios.get("http://api.openweathermap.org/data/2.5/weather?q=" + city + ",us&units=imperial&APPID=" + process.env.API_TOKEN_KEY)
            .then((res) => { 
                msg.reply("The temperature is " + res.data.main.temp + " degrees. The real feel is " + res.data.main.feels_like+  " degrees. The wind speed is " + res.data.wind.speed + "mph. The sky is " + res.data.weather[0].main.toLowerCase()+". Please, have a nice day.");   
            })
            .catch((err) => {
                console.error('ERR:', err)
            })
    }
    else if(msg.content === "!sports"){
        axios.get("http://api.openweathermap.org/data/2.5/weather?q=lockport,us&units=imperial&APPID=" + process.env.API_TOKEN_KEY)
        .then((res) => {  
            if(res.data.wind.speed <= 3){
                msg.reply("The wind today is almost nonexistant go outside! The temperature is " + res.data.main.temp + " degrees. The real feel is "
                 + res.data.main.feels_like+  " degrees. The wind speed is " + res.data.wind.speed +
                "mph. The sky is " + res.data.weather[0].main.toLowerCase()+". Tennis would be great today!");
            } else if(res.data.wind.speed <=6 ){
                msg.reply("The wind today is pretty slim get out there! The temperature is " + res.data.main.temp + " degrees. The real feel is "
                 + res.data.main.feels_like+  " degrees. The wind speed is " + res.data.wind.speed +
                "mph. The sky is " + res.data.weather[0].main.toLowerCase()+". Tennis would be pretty good today!");
            } else if(res.data.wind.speed <= 9.5  ){
                msg.reply("The wind today isnt looking bad, check the forecast for gusts and future developments could be great! The temperature is " + res.data.main.temp + " degrees. The real feel is "
                 + res.data.main.feels_like+  " degrees. The wind speed is " + res.data.wind.speed +
                "mph. The sky is " + res.data.weather[0].main.toLowerCase()+". Disc golf is going to be alright today especially behind some trees. Tennis is not looking good.");
            } else if(res.data.wind.speed <= 15){
                msg.reply("The wind today is kinda high I wouldnt reccomend sports unless its forecasted to die down. The temperature is " + res.data.main.temp + " degrees. The real feel is "
                 + res.data.main.feels_like+  " degrees. The wind speed is " + res.data.wind.speed +
                "mph. The sky is " + res.data.weather[0].main.toLowerCase()+". Sports today arent looking good.");
            } else if(res.data.wind.speed <= 20){
                msg.reply("The wind today is very high I wouldnt reccomend going out for sports. The temperature is " + res.data.main.temp + " degrees. The real feel is "
                 + res.data.main.feels_like+  " degrees. The wind speed is " + res.data.wind.speed +
                "mph. The sky is " + res.data.weather[0].main.toLowerCase()+". Prepare to get frustrated if you're heading out");
            } else {msg.reply("The wind today is insane I highly wouldnt reccomend going out for sports. The temperature is " + res.data.main.temp + " degrees. The real feel is "
                + res.data.main.feels_like+  " degrees. The wind speed is " + res.data.wind.speed +
                "mph. The sky is " + res.data.weather[0].main.toLowerCase()+". Dont do it.")}
        })
        .catch((err) => {
            console.error('ERR:', err)
        })
    } 
})
client.login(process.env.BOT_TOKEN)
//npm run devStart