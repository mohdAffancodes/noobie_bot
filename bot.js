const Discord = require("discord.js");
const client = new Discord.Client();
var joined = false;
var connection;

client.on("ready", () => {
   client.guilds.cache.forEach((guild) => {
        // List all channels
        guild.channels.cache.forEach((channel) => {
            channel.send("Hello World");
        })
    })
});

client.on("message", (receivedMessage) => {
   // Prevent bot from responding to its own messages
   if (receivedMessage.author == client.user) {
      return;
   }

   if (receivedMessage.content.startsWith("-")) {
      processCommand(receivedMessage);
   }
});

function processCommand(receivedMessage) {
   let fullCommand = receivedMessage.content.substr(1).toLowerCase(); // Remove the leading exclamation mark

   if (fullCommand == "join") {
      joinCommand(receivedMessage);
   } else if (fullCommand == "help") {
      helpCommand(receivedMessage);
   } else if (receivedMessage.member.voice.channel && joined == true) {
      playCodes(fullCommand,receivedMessage);
   } else {
      receivedMessage.channel.send("Try `-help` or `-join`");
   }
}

async function joinCommand(message) {
   if (!message.guild) return;
   // Only try to join the sender's voice channel if they are in one themselves
   if (message.member.voice.channel) {
      connection = await message.member.voice.channel.join();
      message.channel.send("Joined #" + message.member.voice.channel.name)
      joined = true;
   } else {
      message.reply("You need to join a voice channel first!");
   }
}

function playCodes(command,message) {
   switch (command) {
      case "bi":
         connection.play("./assets/bringit.wav");
         break;
      case "gg":
         connection.play("./assets/goodgame.wav");
         break;
      case "wp":
         connection.play("./assets/piece.wav");
         break;
      case "ns":
         connection.play("./assets/niceshot.wav");
         break;
      case "hh":
         connection.play("./assets/hoorah.wav");
         break;
      case "gm":
         connection.play("./assets/gotme.wav");
         break;
      case "cb":
         connection.play("./assets/cmonboy.wav");
         break;
      case "cm":
         connection.play("./assets/coverme.wav");
         break;
      case "nn":
         connection.play("./assets/no.wav");
         break;
      case "ru":
         connection.play("./assets/readyup.wav");
         break;
      case "gs":
         connection.play("./assets/getsome.wav");
         break;
      case "lg":
         connection.play("./assets/yeah.wav");
         break;
      case "mo":
         connection.play("./assets/moveout.wav");
         break;
      default:
         message.channel.send("Try `-help` for a list of commands");
         break;
   }
}

function helpCommand(message) {
   message.channel.send(
      "\nList of commands -\n`-join ` - To make the bot join the voice channel\n`-LG ` – lets go,yeah\n`-BI ` – bring it\n`-GS ` – get some\n`-RU ` – ready up\n`-NN ` – Noooooooooooo\n`-CB ` – Come on boy\n`-NS ` – Nice shot\n`-GG ` – Good Game\n`-HH ` – A perfect fighting machine\n`-CM ` – Cover me\n`-MO ` – Move out\n`-WP ` – You wanna piece of me!\n`-GM ` – Oh, They got me!"
   );
}

client.login(process.env.TOKEN);
