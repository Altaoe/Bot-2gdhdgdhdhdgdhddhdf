require('./uptimerbot-24h')();
const db = require('quick.db');
const moment = require('moment')
const fs = require("fs")
const Discord = require('discord.js');
const client = new Discord.Client();
var prefix = "×";
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
client.user.setActivity(`${prefix}help`, { type: 'PLAYING'});
})






client.on('message', rai => {
  if (rai.content.startsWith(prefix + "help")) {
    rai.react("✅")
  let embed = new Discord.MessageEmbed()
  .setAuthor(client.user.username, client.user.avatarURL({dynamic:true}))
  .setTitle('Help Commands [Click Here To Invite BOT]')
  .setDescription(`
Prefix bot is : ${prefix}

General Commands :

server,user,avatar,top text,roles,top,ping,report

Admin Commands :

hide,show,lock,unlock,clear,role,setnick,add-emoji,warn,mute,unmute,kick,ban,unban,vmute,vunmute,vkick

Currency Commands :

credit,daily

Links Commands :

invite : add to bot 

support : server support Bot 



--------------------------------

Bot Developer: <@799933332099301389> 





`)
  .setColor("RED")
  .setURL(`https://discord.com/api/oauth2/authorize?client_id=846018407119454218&permissions=8&scope=bot`)
  .setFooter(`Requested By : ${rai.author.tag}`,`${rai.author.avatarURL({dynamic:true})}`)
  .setTimestamp()
  rai.author.send(embed)
  }
});
























client.on("message", message => {
  if (message.content.startsWith(prefix + "invite")) {
 const yassen = new Discord.MessageEmbed()
.setColor("RED")
.setDescription(`

[Add bot](https://discord.com/api/oauth2/authorize?client_id=846018407119454218&permissions=8&scope=bot)

`)
.setImage('')
 message.channel.send(yassen)
}
})












client.on("message", message => {
  if (message.content.startsWith(prefix + "support")) {
 const yassen = new Discord.MessageEmbed()
.setColor("RED")
.setDescription(`

[join Support](https://discord.gg/Tx4QBxnQPW)
`)
.setImage('')
 message.channel.send(yassen)
}
})















var channel_id ="851480578699558932";    
client.on("message", ds => {
  if(ds.content.startsWith(prefix+"report")) {
    if(ds.channel.type == "dm") return;
let args=ds.content.split(" ").slice(1).join(" ");
if(!args) return ds.channel.send("❌ - **Please type the report**");
let ch=client.channels.cache.find(c => c.id==channel_id);
if(!ch) return;
let report =new Discord.MessageEmbed()
.setTitle("New report")
.addField(`Report`,`${args}`)
.setDescription(`**Report by **${ds.author.tag}\n**Id : **${ds.author.id}`)
.setThumbnail(ds.author.displayAvatarURL({dynamic:true , size:1024}))
.setFooter(ds.author.tag, ds.author.displayAvatarURL({dynamic:true}));
ch.send(report); 
ds.author.send(`✅ | **Thanks for report**`);
  }
});



















const credits = require('./credits.json');
client.on("message", niro =>{//@ニロ#3892
  if(niro.content.startsWith(prefix + "credit")){//@ニロ#3892
 let user = niro.mentions.users.first() || niro.author;//@ニロ#3892
    let bal = db.fetch(`money_${user.id}`)//@ニロ#3892
    if (bal === null) bal = 0;//@ニロ#3892
      return niro.channel.send(`:bank: | **${user.username} , your account balance is** \`\`$${bal}\`\`.`)//@ニロ#3892
}});


client.on("message", async niro =>{//@ニロ#3892
if(niro.content.startsWith(prefix + "daily")){//@ニロ#3892
    let timeout = 1 //by Ashour 
  let amount = Math.floor(Math.random() * 100000000) + 1000000000;//@ニロ#3892
    let daily = await db.fetch(`daily_${niro.author.id}`);//@ニロ#3892
    if (daily !== null && timeout - (Date.now() - daily) > 0) {//@ニロ#3892
        let time = ms(timeout - (Date.now() - daily));//@ニロ#3892
        niro.channel.send(`:rolling_eyes: **| ${niro.author.username}, your daily credits refreshes in ${time.hours}h ${time.minutes}m ${time.seconds}s .** `)//@ニロ#3892
    } else {
    niro.channel.send(`:moneybag: **${niro.author.username}, you got :dollar: ${amount} daily credits!**`)//@ニロ#3892
    db.add(`money_${niro.author.id}`, amount)//@ニロ#3892
    db.set(`daily_${niro.author.id}`, Date.now())//@ニロ#3892
    }}});//@ニロ#3892

//trans

client.on("message", async niro =>{//@ニロ#3892
  if(niro.content.startsWith(prefix + "trans")){//@ニロ#3892
    let args = niro.content.split(" ").slice(2); //@ニロ#3892
    let user = niro.mentions.members.first() //@ニロ#3892
    let member = db.fetch(`money_${niro.author.id}`)//@ニロ#3892
    if (!user) {//@ニロ#3892
        return niro.channel.send(`:rolling_eyes: | ** ${niro.author.username}, I Cant Find a User**`)
    }//@ニロ#3892
    if (!args) {
        return niro.channel.send(`:rolling_eyes: | **${niro.author.username}, type the credit you need to transfer!**`)//@ニロ#3892
    }
    if (niro.content.includes('-')) { //@ニロ#3892
      return niro.channel.send(`:rolling_eyes: | **${niro.author.username}, Type a Amount \`Not Negative\`**`)//@ニロ#3892
    }
    if (member < args) {//@ニロ#3892
        return niro.channel.send(`:thinking: ** | ${niro.author.username}, Your balance is not enough for that!**`)//@ニロ#3892
    }
    if(isNaN(args)) 
return niro.channel.send(`:rolling_eyes: Numbers Only`)//@ニロ#3892
    niro.channel.send(`:moneybag: **| ${niro.author.username}, has transferred \`$${args}\` to ${user}**`)//@ニロ#3892
    user.send(`:atm:  |  Transfer Receipt \n\`\`\`You have received $${args} from user ${niro.author.username} (ID: ${user.id})\`\`\``)//@ニロ#3892
    db.add(`money_${user.id}`, args)//@ニロ#3892
    db.subtract(`money_${niro.author.id}`, args)//@ニロ#3892
}});



































client.on('message',async message => {

	if (message.content === prefix + "bot") {

		if (message.author.bot) return;
		if (!message.channel.guild) return;
		let embed = new Discord.MessageEmbed()
.addField(`servers`,`${client.guilds.cache.size}`,true)
.addField(`users`,`${client.users.cache.size}`,true)
.addField(`Channels`,`${client.channels.cache.size}`,true)
message.channel.send(embed);
	}
})























client.on("message", message => {
  if (message.content.toLowerCase() === prefix + "roles") {
    let roles = message.guild.roles.cache
      .map(r => `[ ${r.name}]`)
      .join("\n");
    let embed = new Discord.MessageEmbed()
      .setTitle("Server Roles")
      .setDescription(" \n" + roles + "");
    message.channel.send(embed);
  }
});
























  
var top = require("./top.json");
function save() {
    fs.writeFileSync("./top.json", JSON.stringify(top, null, 4));
}
client.on("voiceStateUpdate", async function(oldMember, newMember) {
    if (newMember.user.bot) return;
    if (!top[newMember.guild.id]) top[newMember.guild.id] = {};
    if (!top[newMember.guild.id][newMember.user.id]) top[newMember.guild.id][newMember.user.id] = {
        "text": 0,
        "voice": parseInt(Math.random()*10),
        "msgs": 0,
        "id": newMember.user.id
    }
    save();
    if (!oldMember.voice.channel && newMember.voice.channel) {
        var addXP = setInterval(async function () {
            top[newMember.guild.id][newMember.user.id].voice+=parseInt(Math.random()*4);
            save();
            if (!newMember.voice.channel) {
                clearInterval(addXP);
            }
        }, 60000);
    }
});
client.on("message", async function (message) {
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!top[message.guild.id]) top[message.guild.id] = {};
    if (!top[message.guild.id][message.author.id]) top[message.guild.id][message.author.id] = {
        "text": parseInt(Math.random()*10),
        "voice": 1,
        "msgs": 0,
        "id": message.author.id
    }
    if (top[message.guild.id][message.author.id].msgs > 10) {
        top[message.guild.id][message.author.id].text += parseInt(Math.random()*4);
        top[message.guild.id][message.author.id].msgs = 0;
    }
    save();
    var args = message.content.split(" ");
    var cmd = args[0].toLowerCase();
    if (!message.content.startsWith(prefix)) return;
  if(message.content.startsWith(prefix + "top text")) {
            var topArray = Object.values(top[message.guild.id]);
            var num = 0;
            var textStr = `${topArray.sort((a, b) => b.text - a.text).slice(0, 5).filter(user => user.text > 0 && message.guild.members.cache.get(user.id)).map(function (user) {
                if (user.text > 0) {
                    return `**#${++num} | <@${user.id}> XP: \`${user.text}\` **`
                }
            }).join("\n")}`;
            var embed = new Discord.MessageEmbed()
            .setAuthor("?? | Guild Score Leaderboards", message.guild.iconURL())
  .setColor("13B813")
        .addField(`**:speech_balloon: | TEXT LEADERBOARD**`, `${textStr}   \n\n\n **? | For More: \`${prefix}top text\`**`, true)  
        .setFooter(message.author.tag, message.author.displayAvatarURL())
            .setTimestamp()
            message.channel.send({
                embed: embed
            });
     //   if (!message.content.startsWith(prefix)) return;
  } else {
    if(message.content.startsWith(prefix + "top voice")) {
            var topArray = Object.values(top[message.guild.id]);
            var num = 0;
            var voiceStr = `${topArray.sort((a, b) => b.voice - a.voice).slice(0, 5).filter(user => user.voice > 0 && message.guild.members.cache.get(user.id)).map(function (user) {
                if (user.voice > 0) {
                    return `**#${++num} | <@${user.id}> XP: \`${user.voice}\` **`
                }
            }).join("\n")}`;
            var embed = new Discord.MessageEmbed()
            .setAuthor("?? | Guild Score Leaderboards", message.guild.iconURL())
  .setColor("13B813")
        .addField(`**:microphone2: | VOICE LEADERBOARD**`, `${voiceStr}   \n\n\n **:sparkles: More?** \`${prefix}top voice\``, true)
  
        .setFooter(message.author.tag, message.author.displayAvatarURL())
            .setTimestamp()  
            message.channel.send({
                embed: embed
            });
      
    } else {
      if (message.content.startsWith(prefix + "reset voice")){
      var reset = ':white_check_mark:  ?? ????? ?????? ?????'
      var confirm = ' ??? ????? ??? ???? ????? ???? ???? ??????'
        
        message.channel.send(`**${confirm}**`).then(async msg => {
         await  msg.react("?")
        await   msg.react("?")
          const doma = msg.createReactionCollector((reaction, user) => reaction.emoji.name === "?" && user.id === message.author.id, {time: 60000})
          const ziad = msg.createReactionCollector((reaction, user) => reaction.emoji.name === "?" && user.id === message.author.id, {time: 60000})
doma.on("collect", async r => {
 
  
  
  msg.delete()
    
    msg.channel.send(`${reset}`)
  
})
  
  ziad.on("collect", async r => {
    
    msg.delete()
  })
      
        })
 
     //  break;
       // if (!message.content.startsWith(prefix)) return;
  } else {
       if(message.content.startsWith(prefix + "top")) {
            var topArray = Object.values(top[message.guild.id]);
            var num = 0;
            var textStr = `${topArray.sort((a, b) => b.text - a.text).slice(0, 10).filter(user => user.text > 0 && message.guild.members.cache.get(user.id)).map(function (user) {
                if (user.text > 0) {
                    return `**#${++num} | <@${user.id}> XP: \`${user.text}\` **`
                }
            }).join("\n")}`;
            num = 0;
            var voiceStr = `${topArray.sort((a, b) => b.voice - a.voice).slice(0, 10).filter(user => user.voice > 0 && message.guild.members.cache.get(user.id)).map(function (user) {
                if (user.voice > 0) {
                    return `**#${++num} | <@${user.id}> XP: \`${user.voice}\` **`
                }
            }).join("\n")}`;
            var embed = new Discord.MessageEmbed()  
            .setAuthor("?? | Guild Score Leaderboards", message.guild.iconURL())
            .addField("**TOP 5 TEXT :speech_balloon:**", `${textStr}  \n\n  **:sparkles: More?** \`${prefix}top text\``, true)
            .addField("**TOP 5 VOICE :microphone2:**", `${voiceStr} \n\n **:sparkles: More?** \`${prefix}top voice\``, true)
            .setFooter(message.author.tag, message.author.displayAvatarURL())
            .setTimestamp()
            .setColor("13B813");
            message.channel.send({
                embed: embed
            
  
            });
 
      
       
        }
  }
  }
  }
});
 
 
 
 












client.on("message", message=>{
      if(message.content.startsWith(prefix+"user")){
        var userr = message.mentions.users.first() || message.author;
        var memberr = message.mentions.members.first() || message.member;
        let userinfo = userr.displayAvatarURL({ size: 2048 , dynamic: true });
        if (userr.bot){
          var ff = "true"
        }
        else {
          var ff = "false"
        }
        var embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setAuthor(userr.username,userr.avatarURL({dynamic:true}))
        .setThumbnail(userr.avatarURL({dynamic:true}))
        .setTitle("✅INFO User:")
    .addField("✏️UserName:",`**${userr.username}**`,true)
    .addField("#️⃣Tag:",`**${userr.discriminator}**`,true)
    .addField("🆔Id:",`**${userr.id}**`,true)
    .addField(`🤖User Type`,`**${ff}**`,true)
    . setColor("BLUE")
    .setAuthor(userr.username,userr.avatarURL({dynamic:true}))
    .setThumbnail(userinfo)
    .addField(`📆Joind Discord :`,`\`${moment(userr.createdAt).format('YYYY/M/D')} ${moment(userr.createdAt).format('LTS')}\`\n**${moment(userr.createdAt, "YYYYMMDD").fromNow()}**`,true)
    .addField(`📆Joined Server :`,`\`${moment(memberr.joinedAt).format('YYYY/M/D')} ${moment(memberr.joinedAt).format('LTS')}\`\n**${moment(memberr.joinedAt, "YYYYMMDD").fromNow()}**`,true)
    .setFooter(client.user.username,client.user.avatarURL({dynamic:true}))
    .setTimestamp()

    
    
      message.channel.send(embed)
      }
    })




  

















client.on('message', message =>{
if(message.content === prefix +"hide"){
if(message.author.bot || !message.guild) return;
if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply(' ** You dont have `MANAGE_CHANNELS` permission **');
let everyone = message.guild.roles.cache.find(hyper => hyper.name === '@everyone');
        message.channel.createOverwrite(everyone, {
              VIEW_CHANNEL : false
            }).then(() => {
                                const embed = new Discord.MessageEmbed()
                .setColor("RED")
               .setThumbnail(message.guild.iconURL())
                .setDescription(`> **Done Hide This Room ${message.channel}**`)
                .setFooter(`By ${message.author.username}`)
                message.channel.send(embed)
                })
}
});
 
client.on('message', message =>{
if(message.content === prefix +"show"){
if(message.author.bot || !message.guild) return;
if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply(' ** You dont have `MANAGE_CHANNELS` permission **');
let everyone = message.guild.roles.cache.find(hyper => hyper.name === '@everyone');
        message.channel.createOverwrite(everyone, {
               VIEW_CHANNEL: true
            }).then(() => {
                const embed = new Discord.MessageEmbed()
                .setColor("RED")
                .setThumbnail(message.guild.iconURL())
                .setDescription(`> **Done Show This Room ${message.channel}**`)
                
                .setFooter(`By ${message.author.username}`)
                message.channel.send(embed)
                })
}
});


















client.on('message',async message =>{
let command = message.content.split(" ")[0]
command = command.slice(prefix.length)
if (message.content === prefix + "unlock") {
  if (!message.channel.guild)
    return message.reply(" this command is only for servers !!");

  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.reply("you don't have permissions");
  message.channel.overwritePermissions([
{
 id: message.guild.id,
 allow: ['SEND_MESSAGES'],
},
], 'Needed to change permissions')
    .then(() => {
      message.reply(new Discord.MessageEmbed()
.setColor('RED')
.setDescription(`The chat has been unlock by : <@${message.author.id}>`));
    })

}
if (message.content === prefix + "lock") {
  if (!message.channel.guild)
    return message.reply(" this command is only for servers !!");

  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.reply("you don't have permissions");
  message.channel.overwritePermissions([
{
 id: message.guild.id,
 deny: ['SEND_MESSAGES'],
},
], 'Needed to change permissions')
    .then(() => {
      message.channel.send(new Discord.MessageEmbed()
.setColor('RED')
.setDescription(`The chat has been locked by : <@${message.author.id}>`));
    })

}
});















client.on("message", async message => {
    let command = message.content.toLowerCase().split(" ")[0];
    command = command.slice(prefix.length);
    if (command == "clear" || command == "مسح") {
        message.delete({ timeout: 0 })
        if (!message.channel.guild) return message.reply(`** This Command For Servers Only**`);
        if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(`> ** You don't have perms :x:**`);
        if (!message.guild.member(client.user).hasPermission('MANAGE_GUILD')) return message.channel.send(`> ** I don't have perms :x:**`);
        let args = message.content.split(" ").slice(1)
        let messagecount = parseInt(args);
        if (args > 100) return message.channel.send(
            new Discord.MessageEmbed()
            .setDescription(`\`\`\`js
i cant delete more than 100 messages 
\`\`\``)
        ).then(messages => messages.delete({ timeout: 5000 }))
        if (!messagecount) messagecount = '100';
        message.channel.messages.fetch({ limit: 100 }).then(messages => message.channel.bulkDelete(messagecount)).then(msgs => {
            message.channel.send(
                new Discord.MessageEmbed()
                .setDescription(`\`\`\`js
${msgs.size} messages cleared
\`\`\``)
            ).then(messages =>
                messages.delete({ timeout: 5000 }));
        })
    }
});






 






   


let log = JSON.parse(fs.readFileSync("./log.json", 'utf8'));
 
client.on("message", message => {
  if (!message.channel.guild) return;
  let room = message.content.split(" ").slice(1);
  let findroom = message.guild.channels.cache.find(r => r.name == room);
  if (message.content.startsWith(prefix + "set-log")) {
    if (!message.channel.guild)
      return message.reply("**This Command Only For Servers**");
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send(
        "**Sorry But You Dont Have Permission** `MANAGE_GUILD`"
      );
    if (!room) return message.channel.send("Please Type The Channel Name");
    if (!findroom)
      return message.channel.send("Please Type The Log Channel Name");
    let embed = new Discord.MessageEmbed()
      .setTitle("**Done The Log Code Has Been Setup**")
      .addField("Channel:", `${room}`)
      .addField("Requested By:", `${message.author}`)
      .setThumbnail(message.author.avatarURL())
      .setFooter(`${client.user.username}`);
    message.channel.send(embed);
    log[message.guild.id] = {
      channel: room,
      onoff: "On"
    };
    fs.writeFile("./log.json", JSON.stringify(log), err => {
      if (err) console.error(err);
    });
  }
});
client.on("message", message => {
  if (message.content.startsWith(prefix + "toggle-log")) {
    if (!message.channel.guild)
      return message.reply("**This Command Only For Servers**");
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send(
        "**Sorry But You Dont Have Permission** `MANAGE_GUILD`"
      );
    if (!log[message.guild.id])
      log[message.guild.id] = {
        onoff: "Off"
      };
    if (log[message.guild.id].onoff === "Off")
      return [
        message.channel.send(`**The log Is __𝐎𝐍__ !**`),
        (log[message.guild.id].onoff = "On")
      ];
    if (log[message.guild.id].onoff === "On")
      return [
        message.channel.send(`**The log Is __𝐎𝐅𝐅__ !**`),
        (log[message.guild.id].onoff = "Off")
      ];
    fs.writeFile("./log.json", JSON.stringify(log), err => {
      if (err)
        console.error(err).catch(err => {
          console.error(err);
        });
    });
  }
});

client.on("messageDelete", message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  if (!message.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES"))
    return;
  if (!log[message.guild.id])
    log[message.guild.id] = {
      onoff: "Off"
    };
  if (log[message.guild.id].onoff === "Off") return;
  var logChannel = message.guild.channels.cache.find(
    c => c.name === `${log[message.guild.id].channel}`
  );
  if (!logChannel) return;

  let messageDelete = new Discord.MessageEmbed()
    .setTitle("**[MESSAGE DELETE]**")
    .setColor("RED")
    .setThumbnail(message.author.avatarURL())
    .setDescription(
      `**\n**:wastebasket: Successfully \`\`DELETE\`\` **MESSAGE** In ${message.channel}\n\n**Channel:** \`\`${message.channel.name}\`\` (ID: ${message.channel.id})\n**Message ID:** ${message.id}\n**Sent By:** <@${message.author.id}> (ID: ${message.author.id})\n**Message:**\n\`\`\`${message}\`\`\``
    )
    .setTimestamp()
    .setFooter(message.guild.name, message.guild.iconURL());

  logChannel.send(messageDelete);
});
client.on("messageUpdate", (oldMessage, newMessage) => {
  if (oldMessage.author.bot) return;
  if (!oldMessage.channel.type === "dm") return;
  if (!oldMessage.guild.member(client.user).hasPermission("EMBED_LINKS"))
    return;
  if (!oldMessage.guild.member(client.user).hasPermission("MANAGE_MESSAGES"))
    return;
  if (!log[oldMessage.guild.id])
    log[oldMessage.guild.id] = {
      onoff: "Off"
    };
  if (log[oldMessage.guild.id].onoff === "Off") return;
  var logChannel = oldMessage.guild.channels.cache.find(
    c => c.name === `${log[oldMessage.guild.id].channel}`
  );
  if (!logChannel) return;

  if (oldMessage.content.startsWith("https://")) return;

  let messageUpdate = new Discord.MessageEmbed()
    .setTitle("**[MESSAGE EDIT]**")
    .setThumbnail(oldMessage.author.avatarURL())
    .setColor("BLUE")
    .setDescription(
      `**\n**:wrench: Successfully \`\`EDIT\`\` **MESSAGE** In ${oldMessage.channel}\n\n**Channel:** \`\`${oldMessage.channel.name}\`\` (ID: ${oldMessage.channel.id})\n**Message ID:** ${oldMessage.id}\n**Sent By:** <@${oldMessage.author.id}> (ID: ${oldMessage.author.id})\n\n**Old Message:**\`\`\`${oldMessage}\`\`\`\n**New Message:**\`\`\`${newMessage}\`\`\``
    )
    .setTimestamp()
    .setFooter(oldMessage.guild.name, oldMessage.guild.iconURL());

  logChannel.send(messageUpdate);
});

client.on("roleCreate", role => {
  if (!role.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!role.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG")) return;
  if (!log[role.guild.id])
    log[role.guild.id] = {
      onoff: "Off"
    };
  if (log[role.guild.id].onoff === "Off") return;
  var logChannel = role.guild.channels.cache.find(
    c => c.name === `${log[role.guild.id].channel}`
  );
  if (!logChannel) return;

  role.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL();

    let roleCreate = new Discord.MessageEmbed()
      .setTitle("**[ROLE CREATE]**")
      .setThumbnail(userAvatar)
      .setDescription(
        `**\n**:white_check_mark: Successfully \`\`CREATE\`\` Role.\n\n**Role Name:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setColor("GREEN")
      .setTimestamp()
      .setFooter(role.guild.name, role.guild.iconURL());

    logChannel.send(roleCreate);
  });
});

client.on("roleDelete", role => {
  if (!role.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!role.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG")) return;
  if (!log[role.guild.id])
    log[role.guild.id] = {
      onoff: "Off"
    };
  if (log[role.guild.id].onoff === "Off") return;
  var logChannel = role.guild.channels.cache.find(
    c => c.name === `${log[role.guild.id].channel}`
  );
  if (!logChannel) return;

  role.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL();

    let roleDelete = new Discord.MessageEmbed()
      .setTitle("**[ROLE DELETE]**")
      .setThumbnail(userAvatar)
      .setDescription(
        `**\n**:white_check_mark: Successfully \`\`DELETE\`\` Role.\n\n**Role Name:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setColor("RED")
      .setTimestamp()
      .setFooter(role.guild.name, role.guild.iconURL());

    logChannel.send(roleDelete);
  });
});

client.on("roleUpdate", (oldRole, newRole) => {
  if (!oldRole.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!oldRole.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG"))
    return;
  if (!log[oldRole.guild.id])
    log[oldRole.guild.id] = {
      onoff: "Off"
    };
  if (log[oldRole.guild.id].onoff === "Off") return;
  var logChannel = oldRole.guild.channels.cache.find(
    c => c.name === `${log[oldRole.guild.id].channel}`
  );
  if (!logChannel) return;

  oldRole.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL();

    if (oldRole.name !== newRole.name) {
      if (log[oldRole.guild.id].onoff === "Off") return;
      let roleUpdateName = new Discord.MessageEmbed()
        .setTitle("**[ROLE NAME UPDATE]**")
        .setThumbnail(userAvatar)
        .setColor("BLUE")
        .setDescription(
          `**\n**:white_check_mark: Successfully \`\`EDITED\`\` Role Name.\n\n**Old Name:** \`\`${oldRole.name}\`\`\n**New Name:** \`\`${newRole.name}\`\`\n**Role ID:** ${oldRole.id}\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(oldRole.guild.name, oldRole.guild.iconURL());

      logChannel.send(roleUpdateName);
    }
    if (oldRole.hexColor !== newRole.hexColor) {
      if (oldRole.hexColor === "#000000") {
        var oldColor = "`Default`";
      } else {
        var oldColor = oldRole.hexColor;
      }
      if (newRole.hexColor === "#000000") {
        var newColor = "`Default`";
      } else {
        var newColor = newRole.hexColor;
      }
      if (log[oldRole.guild.id].onoff === "Off") return;
      let roleUpdateColor = new Discord.MessageEmbed()
        .setTitle("**[ROLE COLOR UPDATE]**")
        .setThumbnail(userAvatar)
        .setColor("BLUE")
        .setDescription(
          `**\n**:white_check_mark: Successfully \`\`EDITED\`\` **${oldRole.name}** Role Color.\n\n**Old Color:** ${oldColor}\n**New Color:** ${newColor}\n**Role ID:** ${oldRole.id}\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(oldRole.guild.name, oldRole.guild.iconURL());

      logChannel.send(roleUpdateColor);
    }
  });
});

client.on("channelCreate", channel => {
  if (!channel.guild) return;
  if (!channel.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!channel.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG"))
    return;
  if (!log[channel.guild.id])
    log[channel.guild.id] = {
      onoff: "Off"
    };
  if (log[channel.guild.id].onoff === "Off") return;
  var logChannel = channel.guild.channels.cache.find(
    c => c.name === `${log[channel.guild.id].channel}`
  );
  if (!logChannel) return;

  if (channel.type === "text") {
    var roomType = "Text";
  } else if (channel.type === "voice") {
    var roomType = "Voice";
  } else if (channel.type === "category") {
    var roomType = "Category";
  }

  channel.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL();

    let channelCreate = new Discord.MessageEmbed()
      .setTitle("**[CHANNEL CREATE]**")
      .setThumbnail(userAvatar)
      .setDescription(
        `**\n**:white_check_mark: Successfully \`\`CREATE\`\` **${roomType}** channel.\n\n**Channel Name:** \`\`${channel.name}\`\` (ID: ${channel.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setColor("GREEN")
      .setTimestamp()
      .setFooter(channel.guild.name, channel.guild.iconURL());

    logChannel.send(channelCreate);
  });
});

client.on("channelDelete", channel => {
  if (!channel.guild) return;
  if (!channel.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!channel.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG"))
    return;
  if (!log[channel.guild.id])
    log[channel.guild.id] = {
      onoff: "Off"
    };
  if (log[channel.guild.id].onoff === "Off") return;
  var logChannel = channel.guild.channels.cache.find(
    c => c.name === `${log[channel.guild.id].channel}`
  );
  if (!logChannel) return;

  if (channel.type === "text") {
    var roomType = "Text";
  } else if (channel.type === "voice") {
    var roomType = "Voice";
  } else if (channel.type === "category") {
    var roomType = "Category";
  }

  channel.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL();

    let channelDelete = new Discord.MessageEmbed()
      .setTitle("**[CHANNEL DELETE]**")
      .setThumbnail(userAvatar)
      .setDescription(
        `**\n**:white_check_mark: Successfully \`\`DELETE\`\` **${roomType}** channel.\n\n**Channel Name:** \`\`${channel.name}\`\` (ID: ${channel.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setColor("RED")
      .setTimestamp()
      .setFooter(channel.guild.name, channel.guild.iconURL());

    logChannel.send(channelDelete);
  });
});

client.on("channelUpdate", (oldChannel, newChannel) => {
  if (!oldChannel.guild) return;
  if (!log[oldChannel.guild.id])
    log[oldChannel.guild.id] = {
      onoff: "Off"
    };
  if (log[oldChannel.guild.id].onoff === "Off") return;
  var logChannel = oldChannel.guild.channels.cache.find(
    c => c.name === `${log[oldChannel.guild.id].channel}`
  );
  if (!logChannel) return;

  if (oldChannel.type === "text") {
    var channelType = "Text";
  } else if (oldChannel.type === "voice") {
    var channelType = "Voice";
  } else if (oldChannel.type === "category") {
    var channelType = "Category";
  }

  oldChannel.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL();

    if (oldChannel.name !== newChannel.name) {
      let newName = new Discord.MessageEmbed()
        .setTitle("**[CHANNEL EDIT]**")
        .setThumbnail(userAvatar)
        .setColor("BLUE")
        .setDescription(
          `**\n**:wrench: Successfully Edited **${channelType}** Channel Name\n\n**Old Name:** \`\`${oldChannel.name}\`\`\n**New Name:** \`\`${newChannel.name}\`\`\n**Channel ID:** ${oldChannel.id}\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(oldChannel.guild.name, oldChannel.guild.iconURL());

      logChannel.send(newName);
    }
    if (oldChannel.topic !== newChannel.topic) {
      if (log[oldChannel.guild.id].onoff === "Off") return;
      let newTopic = new Discord.MessageEmbed()
        .setTitle("**[CHANNEL EDIT]**")
        .setThumbnail(userAvatar)
        .setColor("BLUE")
        .setDescription(
          `**\n**:wrench: Successfully Edited **${channelType}** Channel Topic\n\n**Old Topic:**\n\`\`\`${oldChannel.topic ||
            "NULL"}\`\`\`\n**New Topic:**\n\`\`\`${newChannel.topic ||
            "NULL"}\`\`\`\n**Channel:** ${oldChannel} (ID: ${
            oldChannel.id
          })\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(oldChannel.guild.name, oldChannel.guild.iconURL());

      logChannel.send(newTopic);
    }
  });
});

client.on("guildBanAdd", (guild, user) => {
  if (!guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!guild.member(client.user).hasPermission("VIEW_AUDIT_LOG")) return;
  if (!log[guild.id])
    log[guild.id] = {
      onoff: "Off"
    };
  if (log[guild.id].onoff === "Off") return;
  var logChannel = guild.channels.cache.find(
    c => c.name === `${log[guild.id].channel}`
  );
  if (!logChannel) return;

  guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL();

    if (userID === client.user.id) return;

    let banInfo = new Discord.MessageEmbed()
      .setTitle("**[BANNED]**")
      .setThumbnail(userAvatar)
      .setColor("DARK_RED")
      .setDescription(
        `**\n**:airplane: Successfully \`\`BANNED\`\` **${user.username}** From the server!\n\n**User:** <@${user.id}> (ID: ${user.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setTimestamp()
      .setFooter(guild.name, guild.iconURL());

    logChannel.send(banInfo);
  });
});

client.on("guildBanRemove", (guild, user) => {
  if (!guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!guild.member(client.user).hasPermission("VIEW_AUDIT_LOG")) return;
  if (!log[guild.id])
    log[guild.id] = {
      onoff: "Off"
    };
  if (log[guild.id].onoff === "Off") return;
  var logChannel = guild.channels.cache.find(
    c => c.name === `${log[guild.id].channel}`
  );
  if (!logChannel) return;

  guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL();

    if (userID === client.user.id) return;

    let unBanInfo = new Discord.MessageEmbed()
      .setTitle("**[UNBANNED]**")
      .setThumbnail(userAvatar)
      .setColor("GREEN")
      .setDescription(
        `**\n**:unlock: Successfully \`\`UNBANNED\`\` **${user.username}** From the server\n\n**User:** <@${user.id}> (ID: ${user.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setTimestamp()
      .setFooter(guild.name, guild.iconURL());

    logChannel.send(unBanInfo);
  });
});

client.on("guildMemberUpdate", (oldMember, newMember) => {
  if (!oldMember.guild) return;
  if (!log[oldMember.guild.id])
    log[oldMember.guild.id] = {
      onoff: "Off"
    };
  if (log[oldMember.guild.id].onoff === "Off") return;
  var logChannel = oldMember.guild.channels.cache.find(
    c => c.name === `${log[(oldMember, newMember.guild.id)].channel}`
  );
  if (!logChannel) return;

  oldMember.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL();
    var userTag = logs.entries.first().executor.tag;

    if (oldMember.nickname !== newMember.nickname) {
      if (oldMember.nickname === null) {
        var oldNM = "`اسمه الاصلي`";
      } else {
        var oldNM = oldMember.nickname;
      }
      if (newMember.nickname === null) {
        var newNM = "`اسمه الاصلي`";
      } else {
        var newNM = newMember.nickname;
      }

      let updateNickname = new Discord.MessageEmbed()
        .setTitle("**[UPDATE MEMBER NICKNAME]**")
        .setThumbnail(userAvatar)
        .setColor("BLUE")
        .setDescription(
          `**\n**:spy: Successfully \`\`CHANGE\`\` Member Nickname.\n\n**User:** ${oldMember} (ID: ${oldMember.id})\n**Old Nickname:** ${oldNM}\n**New Nickname:** ${newNM}\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(oldMember.guild.name, oldMember.guild.iconURL());

      logChannel.send(updateNickname);
    }
    if (oldMember.roles.cache.size < newMember.roles.cache.size) {
      let role = newMember.roles
        .filter(r => !oldMember.roles.has(r.id))
        .first();
      if (!log[oldMember.guild.id])
        log[oldMember.guild.id] = {
          onoff: "Off"
        };
      if (log[oldMember.guild.id].onoff === "Off") return;
      let roleAdded = new Discord.MessageEmbed()
        .setTitle("**[ADDED ROLE TO MEMBER]**")
        .setThumbnail(oldMember.guild.iconURL())
        .setColor("GREEN")
        .setDescription(
          `**\n**:white_check_mark: Successfully \`\`ADDED\`\` Role to **${oldMember.user.username}**\n\n**User:** <@${oldMember.id}> (ID: ${oldMember.user.id})\n**Role:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(userTag, userAvatar);

      logChannel.send(roleAdded);
    }
    if (oldMember.roles.cache.size > newMember.roles.cache.size) {
      let role = oldMember.roles
        .filter(r => !newMember.roles.has(r.id))
        .first();
      if (!log[oldMember.guild.id])
        log[oldMember.guild.id] = {
          onoff: "Off"
        };
      if (log[(oldMember, newMember.guild.id)].onoff === "Off") return;
      let roleRemoved = new Discord.MessageEmbed()
        .setTitle("**[REMOVED ROLE FROM MEMBER]**")
        .setThumbnail(oldMember.guild.iconURL())
        .setColor("RED")
        .setDescription(
          `**\n**:negative_squared_cross_mark: Successfully \`\`REMOVED\`\` Role from **${oldMember.user.username}**\n\n**User:** <@${oldMember.user.id}> (ID: ${oldMember.id})\n**Role:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(userTag, userAvatar);

      logChannel.send(roleRemoved);
    }
  });
  if (oldMember.guild.owner.id !== newMember.guild.owner.id) {
    if (!log[oldMember.guild.id])
      log[oldMember.guild.id] = {
        onoff: "Off"
      };
    if (log[(oldMember, newMember.guild.id)].onoff === "Off") return;
    let newOwner = new Discord.MessageEmbed()
      .setTitle("**[UPDATE GUILD OWNER]**")
      .setThumbnail(oldMember.guild.iconURL())
      .setColor("GREEN")
      .setDescription(
        `**\n**:white_check_mark: Successfully \`\`TRANSFER\`\` The Owner Ship.\n\n**Old Owner:** <@${oldMember.user.id}> (ID: ${oldMember.user.id})\n**New Owner:** <@${newMember.user.id}> (ID: ${newMember.user.id})`
      )
      .setTimestamp()
      .setFooter(oldMember.guild.name, oldMember.guild.iconURL());

    logChannel.send(newOwner);
  }
});

















    

client.on("message", (message) => {
    if (message.content.toLowerCase().startsWith(prefix + "ban")) {
        var args = message.content.split(' ')
        var member = message.mentions.users.first() || client.users.cache.get(message.content.split(' ')[1]);
        var trueUser = message.guild.member(member);
        var reason = message.content.split(' ').slice(3).join(' ') || 'undefined';
        var time = args[2] || '1y'
        if (!message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription("❌" + " **I Can't Bannd Any Member In This Server Becuse I Don't Have `BAN_MEMBERS` Permission!**\n Ex: " + `${prefix}ban @user 4d spam`).setFooter(`Request By ${message.author.tag}`).setTimestamp());
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription("❌" + " **You Need `BAN_MEMBERS` Permission To Use This Command!**\n Ex: " + `${prefix}ban @user 4d spam`).setFooter(`Request By ${message.author.tag}`).setTimestamp());
        if (!trueUser) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription("❌" + " **Please Mention/ID Same One!**\n Ex: " + `${prefix}ban @user 4d spam`).setFooter(`Request By ${message.author.tag}`).setTimestamp());
        if (!reason) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription("❌" + " **Please Type Reason!**\n Ex: " + `${prefix}ban @user 4d spam`).setFooter(`Request By ${message.author.tag}`).setTimestamp());
        trueUser.ban({ reason: reason }).then(() => {
            message.channel.send(new Discord.MessageEmbed().setColor("GREEN").setDescription("✅" + ` **<@!${trueUser.user.id}> banned from the server ! :airplane: by:<@${message.author.id}> **`).setFooter(`Request By ${message.author.tag}`).setTimestamp())
            setTimeout(() => {
                message.guild.fetchBans().then(bans => {
                    if (bans.size == 0) return;
                    bans.forEach(ban => {
                        if (ban.user.id == trueUser.user.id) {
                            message.guild.members.unban(ban.user.id);
                        } else console.log(ban.user.id + " => " + trueUser.user.id)
                    });
                });
            }, ms(time))
        })
    }
})







client.on("message", (message) => {
    if (message.content.startsWith(prefix + "unban")) {
        if (message.channel.type == "dm") return;
        if (message.author.bot) return;
        try {
            if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(
                new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription("❌" + " **You Need `BAN_MEMBERS` Permission To Use This Command!**")
            );
            message.guild.fetchBans().then(bans => {
                if (bans.size == 0) {
                    message.reply(
                        new Discord.MessageEmbed()
                        .setColor("RED")
                        .setDescription(
                            `**❌ | Thare Is No Bannded Members!**`
                        )
                    );
                };
                bans.forEach(ban => {
                    message.guild.members.unban(ban.user.id);
                    let una = bans.size;
                    message.channel.send(
                        new Discord.MessageEmbed()
                        .setColor("GREEN")
                        .setDescription(
                            `**✅ | Done Unbaned ${una} Members!**`
                        )
                    )
                });
            })
        } catch (e) {
            message.channel.send(`\`\`\`js\n${e}\n\`\`\``)
            console.log()
        }
    }
})







client.on('message', async normal => {
  if (normal.content.startsWith(prefix + "mute")){
        if(!normal.member.hasPermission('MANAGE_ROLES')) return normal.channel.send("You don't have permissions")
         const args = normal.content.slice(prefix.length).trim().split(/ +/g);
        var member = normal.mentions.members.first()||normal.guild.members.cache.get(args[1])||normal.guild.members.cache.find(m => m.user.username === args.slice(1).join(' '));
                if(!member) return normal.channel.send(`**Please Mention user or Type the user ID/Username ${args.slice(1).join(' ')} **`)
                if (member.id === normal.author.id)return normal.reply(`**You can't mute yourself**`)
      if (member.id === normal.guild.me.id)return normal.reply(`**You can't mute me dumbass**`)
        let mutedrole = normal.guild.roles.cache.find(ro => ro.name === 'muted')
        if(!mutedrole) {
        try {
        var createdrole = await normal.guild.roles.create({
                      data : {
                        name : 'muted',
                        permissions: [],
                    }});
                        normal.guild.channels.cache.forEach(async (channel, id) => {
                            await channel.createOverwrite(createdrole, {
                                SEND_MESSAGES: false,
                                ADD_REACTIONS : false
                            })
                        })
                } catch (err) {
                console.log(err)
            }};
let muterole = normal.guild.roles.cache.find(r => r.name === 'muted')
         member.roles.add(muterole)
        normal.channel.send(`**${member.user.username} Has been muted**`)
    } 
})








client.on('message', async normal => {
  if (normal.content.startsWith(prefix + "unmute")){
    var args = normal.content.slice(prefix.length).trim().split(/ +/g);
        if(!normal.member.hasPermission('MANAGE_ROLES')) return normal.channel.send("You don't have permissions");
        var member = normal.mentions.members.first()||normal.guild.members.cache.get(args[1])||normal.guild.members.cache.find(m => m.user.username === args.slice(1).join(' '));
                     if(!member) return normal.channel.send(`**Please Mention user or Type the user ID/Username **`)
                let muterole = normal.guild.roles.cache.find(r => r.name === 'muted')
        if(!member.roles.cache.has(muterole.id))return normal.channel.send(`**${member.user.username} is not muted**`)
        await member.roles.remove(muterole);
        normal.channel.send(`**${member.user.username} Has been unmuted**`)
  }})
















client.prefix = '×'
client.on("message", message => {
    if (message.author.bot) return;
    var prefix = db.get(`Prefix_${message.guild.id}.data`);
    if (prefix == null || undefined) db.set(`Prefix_${message.guild.id}`, { data: client.prefix })
    if (message.content.startsWith(prefix + "set-prefix")) {
        var args = message.content.split(' ');
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            return message.react('❌')
        }
        if (!args[1]) {
            return message.channel.send(
                new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
                .setColor("RED")
                .setFooter(`Requested By: ${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
                .setTimestamp()
                .setThumbnail(message.author.avatarURL({ dynamic: true }))
                .setDescription(`**❌ | Error: Please Type The Prefix**`)
            ).then(() => {
                message.channel.stopTyping();
            })
        }
        if (args[1].length > 5) {
            return message.channel.send(
                new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
                .setColor("RED")
                .setFooter(`Requested By: ${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
                .setTimestamp()
                .setThumbnail(message.author.avatarURL({ dynamic: true }))
                .setDescription(`**❌ | Error: This Prefix Is Too Long**`)
            )
        }
        message.react('✅')
        db.set(`Prefix_${message.guild.id}`, { data: args[1] })
    }
});




































client.login("ODQ2MDE4NDA3MTE5NDU0MjE4.YKpaCg.IHh0uMr0AEWwRHt1tIQFl9Yosgw")