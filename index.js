const { Client, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const client = new Client();
var prefix = '$';
const request = require ("request");
const moment = require("moment");


client.once('ready', () => {
    console.log(`Bot is ready as ${client.user.tag}`)
    console.log(`Status: ${client.user.presence.status}`)
    
    client.user.setPresence({
        status: "online",
        activity: {
            name: "v1.0",
            type: "PLAYING"
        }
    });
    
});

client.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();


    if (command === 'help') {
        const help = new MessageEmbed()
        .setTimestamp(Date.now())
        .setTitle("Commands:")
        .setDescription("*$account, $head, $names*")
        .setFooter(`${message.author.tag}`)
        message.channel.send(help);
    }

    let text = args.join(" ")

    if(command === "head"){
        const vacio = new MessageEmbed()
         .setTitle("ERROR")
         .setColor("RED")
         .setDescription("U need to send a minecraft username.")
         .setFooter(`${message.author.tag}`)
         .setTimestamp(Date.now());
        if(!text) return message.channel.send(vacio)
        else{
        let text = args.join(" ")
        let headURL = (`https://cravatar.eu/helmhead/${text}.png`)
        message.channel.send("Head of **"+ text+ "**", {files: [headURL]});
       }
    }

    if(command === "names") {
        //Si no pone nada
        const unames = new MessageEmbed()
         .setTitle("ERROR")
         .setColor("RED")
         .setDescription("U need to send a minecraft username.")
         .setFooter(`${message.author.tag}`)
         .setTimestamp(Date.now());
        if(!text) return message.channel.send(unames)
         //Si pone un texto
        let apiURL = (`https://api.mojang.com/users/profiles/minecraft/${text}`);
        request(apiURL, function(err, resp, body) {
            if(err) return console.log(err.message)
          body = JSON.parse(body);
          let id = body.id;

          let namesURL = (`https://api.mojang.com/user/profiles/${id}/names`)

          request(namesURL, function(err, resp, names_body){
            if(err) return console.log(err.message);
            names_body = JSON.parse(names_body);

            let historial = ("Name history :")

            for(let i = 0; i < names_body.length; i++) {
                //TAREA

                if(i){ 
                    historial = historial + "\n`"+ names_body[i].name + ("` changed at `") + moment(new Date(names_body[i].changedToAt).toISOString()).format("dddd Do MMMM YYYY, HH:mm a");

                }
                else{
                    historial = historial + ("\n`")+ names_body[i].name + (" = First name `"); 
                }

            }
            const userss = new MessageEmbed()
            .setTitle("Nick name list of **"+ text + "**")
            .setColor("GREEN")
            .setTimestamp(Date.now())
            .setDescription(historial)
            .setFooter("Poryx 2020 ⓒ, ")
            
            message.channel.send(userss);
        })

    });
 
   }
   
});

client.login ("NzE5MzQyMDgwOTU4MTM2NDYx.Xt2COw.kUsOMhBkz6baBYPLUnhUdijsht0");
