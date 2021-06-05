const Discord = require("discord.js");
const client = new Discord.Client();
let joined = false;
let connection;

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
   let fullCommand = receivedMessage.content.substr(1); // Remove the leading exclamation mark

   if (fullCommand == "join") {
      joinCommand(receivedMessage);
   } else if (fullCommand == "help") {
      helpCommand(receivedMessage);
   } else if (joined == true) {
      playCodes(fullCommand,receivedMessage);
   } else {
      receivedMessage.reply("Try `-help` or `-join`");
   }
}

async function joinCommand(message) {
   if (!message.guild) return;
   // Only try to join the sender's voice channel if they are in one themselves
   if (message.member.voice.channel) {
      connection = await message.member.voice.channel.join();
      joined = true;
      message.reply("👍Joined `" + message.member.voice.channel.name + "`")
   } else {
      message.reply("You need to join a voice channel first!");
   }
}

function playCodes(command,message) {
   switch (command) {
      case "BI":
         connection.play("./assets/bringit.wav");
         break;
      case "GG":
         connection.play("./assets/goodgame.wav");
         break;
      case "WP":
         connection.play("./assets/piece.wav");
         break;
      case "NS":
         connection.play("./assets/niceshot.wav");
         break;
      case "HH":
         connection.play("./assets/hoorah.wav");
         break;
      case "GM":
         connection.play("./assets/gotme.wav");
         break;
      case "CB":
         connection.play("./assets/cmonboy.wav");
         break;
      case "CM":
         connection.play("./assets/coverme.wav");
         break;
      case "NN":
         connection.play("./assets/no.wav");
         break;
      case "RU":
         connection.play("./assets/readyup.wav");
         break;
      case "GS":
         connection.play("./assets/getsome.wav");
         break;
      case "LG":
         connection.play("./assets/yeah.wav");
         break;
      case "MO":
         connection.play("./assets/moveout.wav");
         break;
      default:
         message.reply("Try `-help` for a list of commands");
         break;
   }
}

function helpCommand(message) {
   message.reply(
      "\nList of commands -\n`-join ` - To make the bot join the voice\n`-LG ` – lets go,yeah\n`-BI ` – bring it\n`-GS ` – get some\n`-RU ` – ready up\n`-NN ` – Noooooooooooo\n`-CB ` – Come on boy\n`-NS ` – Nice shot\n`-GG ` – Good Game\n`-HH ` – A perfect fighting machine\n`-CM ` – Cover me\n`-MO ` – Move out\n`-WP ` – You wanna piece of me!\n`-GM ` – Oh, They got me!"
   );
}

client.login("ODUwMzMwMTgxNDQ0MDQyODEz.YLoJsQ.9Dkq66T0_5D0nz7IqCfn1k0kKwk");
