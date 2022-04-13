# DiscordBot
Discord Bot that has a lot of functionality including reading other websites APIs to do things like send random pictures of dogs, random pictures of cats, taco recipes, and information from NASA. The bot can send and read tweets from Twitter, roll an eight ball, and flip a coin. The bot can create, write, update, and read text files. The bot can read the weather of a specific city the user enters. The bot can play music and sounds through FFMPEG. It also uses Puppeteer to scrape GitHub and the Rocket League website and grab things like my daily contributions of code or a players current rank in a gamemode. It can also find out if a specific Twitch.Tv channel is live. The bot uses Axios for the API calls and the Discord.js node module to interact with Discord.

Intro:
Use the !help for all of the commands the bot can do! 

!tweet: Writes a tweet using the Twitter API and Discord API to the bots twitter page. 
!rlranks: Finds a Rocket League account and using a web scraper sends the information to the channel. 
!playRandomSound: Using FFMPEG and discord.js the bot can play sounds to the current channel that the user is in. 
!taco: Using an API gives a random taco recipe. 
!weather: Gives the weather like temperature wind speed and more using an API request of a location that is entered by the user. 
!coinflip: Flips a coin gives the result with pictures.
!meow: Sends a random cat picture using an API to the channel.
!senddog: Sends a random dog picture using an API to the channel. 
!notethis: Takes a message and saves it to seperate text file to be reviewed later. 
!prs: Plays a random sound from the list of selected sounds available. 
!advice: Using an API request gives advice to the user. 
!eightball: Ask a yes or no question and the eight ball will respond. 
!githubqr: Sends a picture of my GitHub profile to the text. 
!help: Brings up the options that the bot can do in chat.
!ping: Will send "Pong" in chat as a reply to the user. 
!advice: Will send the user advice in chat reading a websites API to grab random advice. 
!nasaphoto: Sends the NASA photo of the day to the chat. 
!readalltweets: Reads all the tweets this bot has made and sent to Twitter and sends them to chat. 
