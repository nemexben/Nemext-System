﻿﻿const Discord = require('discord.js');
const fs = require('fs');
const moment = require('moment');
const jimp = require('jimp');
const Canvas = require('canvas');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setGame(`Moon | $help`,"https://www.twitch.tv/dark7overr")
  client.user.setStatus("dnd")
});
var prefix = "$"

/////////////////////////////////////////////////////////////////////////////

client.on('message', message => { 
    var user = message.mentions.users.first() || message.author; 
    if (message.content.startsWith("$avatar")) { 
    message.channel.send(`This avatar For ${user} link : ${user.avatarURL}`);
     } 
    });

/////////////////////////////////////////////////////////////////////////////

client.on("message", message => { //clear
var args = message.content.substring(prefix.length).split(" ");
if (message.content.startsWith(prefix + "clear")) {
if(!message.channel.guild) return message.reply('**Sorry but this is for servers only ❌**');         
if(!message.member.hasPermission('ADMINSTRATOR')) return message.reply('**You do not have permission to delete chat ⚠️**');
  var msg;
  msg = parseInt();

message.channel.fetchMessages({limit: msg}).then(messages => message.channel.bulkDelete(messages)).catch(console.error);
message.channel.sendMessage("", {embed: {
  title: "``Chats cleared ✔️``",
  color: 0x5016f3, 
  footer: {
    
  }
}}).then(msg => {msg.delete(3000)});
}
});

/////////////////////////////////////////////////////////////////////////////

client.on('message', message => {

  if (message.author.bot) return;
 if (!message.channel.guild) return;
 if (message.content.startsWith(prefix + 'status')) {
     if (!message.channel.guild) return;
     let embed = new Discord.RichEmbed()
         .setColor('RANDOM')
         .setThumbnail(message.author.avatarURL)
         .setFooter(message.author.username, message.author.avatarURL)

     .setDescription(`**The status of server members 🔰**
 
**:green_heart: Online**  **[ ${message.guild.members.filter(m=>m.presence.status == 'online').size} ]**
**:yellow_heart: Idle**       **[ ${message.guild.members.filter(m=>m.presence.status == 'idle').size} ]**  
**:heart: DND**     **[ ${message.guild.members.filter(m=>m.presence.status == 'dnd').size} ]**
**:black_heart: Offline** **[ ${message.guild.members.filter(m=>m.presence.status == 'offline').size} ]** `)

     message.channel.send()

     message.channel.sendEmbed(embed)
 }
});

/////////////////////////////////////////////////////////////////////////////

client.on('message', async msg =>{
  if (msg.author.bot) return undefined;
  if (!msg.content.startsWith(prefix)) return undefined;
  
  let args = msg.content.split(' ');

  let command = msg.content.toLowerCase().split(" ")[0];
  command = command.slice(prefix.length)

  if(command === `ping`) {
  let embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setTitle("Pong!!")
  .setDescription(`${client.ping} ms,`)
  .setFooter(`Requested by | ${msg.author.tag}`);
  msg.delete().catch(O_o=>{})
  msg.channel.send(embed);
  }
});

/////////////////////////////////////////////////////////////////////////////

client.on('ready', function(){
    require("./antispam.js")(client, function(message){
       message.delete().then(yumz => {
       message.channel.send(`stop spamming kid <@${message.author.id}>`).then(spammer => {
       spammer.delete(2000)
     });
     });
    });
  });

/////////////////////////////////////////////////////////////////////////////

client.on('message', message => {
    if(message.content === prefix + "mutechannel") {
     
                        if(!message.channel.guild) return;

if(!message.member.hasPermission('ADMINSTRATOR')) return message.reply(' **You dont have permissions to use that command ⚠️**');
           message.channel.overwritePermissions(message.guild.id, {
         SEND_MESSAGES: false

           }).then(() => {
               message.reply("**Chat was closed ✅**")
           });
             }
//FIRE BOT
 if(message.content === prefix + "unmutechannel") {
                     if(!message.channel.guild) return;

if(!message.member.hasPermission('ADMINSTRATOR')) return message.reply('**You dont have permissions to use that command ⚠️**');
           message.channel.overwritePermissions(message.guild.id, {
         SEND_MESSAGES: true

           }).then(() => {
               message.reply("**Chat opened ✅**")
           });
 }

});

/////////////////////////////////////////////////////////////////////////////

client.on('message', message => {
   if(message.content.startsWith("$invites")) {
    message.guild.fetchInvites().then(invs => {
      let user = message.mentions.users.first() || message.author
      let personalInvites = invs.filter(i => i.inviter.id === user.id);
      let inviteCount = personalInvites.reduce((p, v) => v.uses + p, 0);
message.channel.send(`${user} has **${inviteCount}** invites.`);
});
  }
});

/////////////////////////////////////////////////////////////////////////////

client.on('message', message => {
    if (message.content === prefix + "date") {
        var currentTime = new Date(),
            Year = currentTime.getFullYear(),
            Month = currentTime.getMonth() + 1,
            Day = currentTime.getDate();
        message.channel.sendMessage( "Date : " + Day + "-" + Month + "-" +Year)
    }
});

/////////////////////////////////////////////////////////////////////////////

client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help") {
         message.channel.send('**Special orders sent✔️ :mailbox_with_mail:**');
  const embed = new Discord.RichEmbed()
         
    
         

      .setColor("RANDOM")
.setDescription(`
 
╔[❖════════════❖]╗
  General Commands
╚[❖════════════❖]╝
 ❖ $avatar ➾ to get the image
 ❖ $status ➾ status the players on the server [Online , Idle , Dnd , Invsible]
 ❖ $ping ➾ to see your ping or some one
 ❖ $invites ➾ to see your invites
 ❖ $date ➾ to see the time


╔[❖════════════❖]╗
  Music Commands
╚[❖════════════❖]╝
❖ $play ⇏ To play a song with a clip or bass
❖ $skip ⇏ To play the song
❖ $pause ⇏ Pause the song
❖ $resume ⇏ For the Molecule of Egyption after being temporarily incapacitated
❖ $stop ⇏ To extract the pot from the room
❖ $np ⇏ To find out the song that is running
❖ $queue ⇏ To learn the operating system

`);
  message.author.send({embed});
    }
});

/////////////////////////////////////////////////////////////////////////////

client.login(process.env.BOT_TOKEN);
