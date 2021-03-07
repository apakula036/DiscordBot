require("dotenv").config();

var fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const axios = require('axios');
const date = new Date();
const channelTwoID = process.env.GENERAL_TWOID;
const channelOneID = process.env.GENERAL_ONEID;

//Twitter API Stuff
var Twit = require('twit');
var T = new Twit({
  consumer_key:         process.env.CONSUMER_KEYAPI,
  consumer_secret:      process.env.CONSUMER_KEYAPI_SECRET,
  access_token:         process.env.ACCESS_TOKENAPI,
  access_token_secret:  process.env.ACCESS_TOKENAPI_SECRET,
})

function makeTweets(theTweet){
    //Not looping anything to post again, not getting banned again also PS twitter devs if youre reading this dont ban me 
    //EDIT: it almost got banned again seperate reason though 
    T.post('statuses/update', { status: theTweet }, function(err, data, response) {
        saveTweetID(data.id_str, theTweet);
        data = " ";
        theTweet = " ";
    })
}
function saveTweetID(tweetID, theTweet){
    fs.appendFile('mynewfile1.txt', "\r\n", function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
    fs.appendFile('mynewfile1.txt', tweetID +"_"+ theTweet, function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
}

function readTweets(){
    fs.stat('mynewfile1.txt', function (error, stats) { 
        fs.open('mynewfile1.txt', "r", function (error, fd) { 
            var buffer = new Buffer.alloc(stats.size); 
            fs.read(fd, buffer, 0, buffer.length, 
                null, function (error, bytesRead, buffer) { 
                    var data = buffer.toString("utf8"); 
                    console.log(data); 
                    let arrayOfIds = [];
                    arrayOfIds.push(data);
                    console.log(arrayOfIds.length);//needs fix, seperate on _s each to get each item then make the array
            }); 
        });
    });
}

client.on('ready', () => {
    client.channels.cache.get(channelTwoID).send('Im Ready!');
    checkTimeFunc();
    greetings();
    readTweets();
})
client.on('message', msg => {
    if (msg.content === "!help") {
        msg.reply('I can do !advice, !tweet "Your tweet here", !senddog, !eightball, !weather "a city here", !coinFlip, !meow, !randomBetween "a number here", !sports, and !ping')
        msg.react("👍")
    }
    else if(msg.content.startsWith("!tweet")){
        const args = msg.content.slice().trim().split(/ +/g);
        const theCommand = args.shift().toLowerCase();

        var stringer = "";
        for(i = 0; i < args.length; i++){
            stringer = stringer + " " + args[i];
        }
        //console.log(stringer + "-the tweet content");
        makeTweets(stringer); 
        msg.reply('You tweeted: '+ stringer);
    }
})
client.on('message', msg => {
    if (msg.content === "!ping") {
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
            return " "
        }
    }
})
client.on('message', msg => {
    if (msg.content === "!advice") {
        client.channels.cache.get(channelTwoID).send(giveAdvice())
    }
})

function giveAdvice(){
    axios.get("https://api.adviceslip.com/advice")
    .then((res) => {
        //console.log('RES:', res.data.slip.advice)
        client.channels.cache.get(channelTwoID).send(res.data.slip.advice)
    })
    .catch((err) => {
        console.error('ERR:', err)
    })
    return " ";
}
    

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
    }
        else if(msg.content === "!temperatureSports"){
            axios.get("http://api.openweathermap.org/data/2.5/weather?q=lockport,us&units=imperial&APPID=" + process.env.API_TOKEN_KEY)
            .then((res) => {  
                if(res.data.main.temp <= 45){
                    msg.reply("The temperature outside is: " + res.data.main.temp + ", its pretty cold out I would stay in today and play some games");
                } else if(res.data.main.temp <=55 ){
                    msg.reply("The temperature outside is: " + res.data.main.temp + ", its not the warmest out right now I would go if you're desperate. ");
                } else if(res.data.main.temp <= 60  ){
                    msg.reply("The temperature outside is: " + res.data.main.temp + ", its a little chilly bring a sweater!");
                } else if(res.data.main.temp <= 70){
                    msg.reply("The temperature outside is: " + res.data.main.temp + ", its nice and warm get out there!");
                } else if(res.data.main.temp == 75){
                    msg.reply("The temperature outside is: " + res.data.main.temp + ", its perfect! ");
                } else {
                    msg.reply("The temperature outside is: " + res.data.main.temp + ", its pretty hot out, get out there! ")}
            })
        .catch((err) => {
            console.error('ERR:', err)
        })
    }
})
function checkTimeFunc(){
    if(date.getHours() == 17){
        client.channels.cache.get(channelTwoID).send('Welcome home from work Andrew. I hope it went well.');
    } else {
        setTimeout(checkTimeFunc, 3600000); //one hour so it only checks once per hour triggering the function once only
        console.log("Its "+ date.getHours() + ", lets check again later.")
    }
}
function greetings(){
    if(date.getHours() == 7) {
        console.log("7am");
        client.channels.cache.get(channelOneID).send('Good morning, everyone!.');
        giveAdvice();
    } else if (date.getHours() == 0) {
        console.log("midnight");
        client.channels.cache.get(channelTwoID).send("Goodnight, everyone.");
    } else {
        console.log("checked after another hour its currently hour " + date.getHours());
        setTimeout(checkTimeFunc, 3600000);//one hour 
    }
}
client.login(process.env.BOT_TOKEN)
//npm run devStart