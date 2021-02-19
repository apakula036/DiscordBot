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
        msg.reply("I can do !advice, !senddog, !eightball, and !ping")
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
    if (msg.content === "!randomBetweenThisNum") {
        const theNumTheUserSent = 1;
        const randomNumber = Math.floor(Math.random()* theNumTheUserSent);
        msg.reply("Noice")
    }
})

client.on('message', msg => {
    const prefix = "!randomNumber";
    const args = msg.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
        
    if(command === 'args'){
        if(!args.length){
            return msg.reply("no args")
        }
    
    msg.channel.send('Command name:  ${command} \nArguments: ${args}')
    }
});





client.login(process.env.BOT_TOKEN)

//npm run devStart