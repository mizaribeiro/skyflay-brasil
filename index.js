const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const prefix = "!";

client.once("ready", () => {
  console.log("BOT SKYFLAY ONLINE");
});

client.on("messageCreate", async (message) => {

if(message.author.bot) return;
if(!message.content.startsWith(prefix)) return;

const args = message.content.slice(prefix.length).split(/ +/);
const command = args.shift().toLowerCase();

if(command === "ban"){
const member = message.mentions.members.first();
if(!member) return message.reply("Marque um usuário.");

member.ban();
message.reply("Usuário banido.");
}

if(command === "unban"){
const id = args[0];
message.guild.members.unban(id);
message.reply("Usuário desbanido.");
}

if(command === "remban"){
const id = args[0];
message.guild.members.unban(id);
message.reply("Ban removido.");
}

if(command === "bansg"){
if(!message.member.roles.cache.some(r => r.name === "DiretorSG"))
return message.reply("Somente Diretor SG pode usar.");

const member = message.mentions.members.first();
member.ban();
message.reply("Ban SG aplicado.");
}

});

client.login(process.env.TOKEN);
