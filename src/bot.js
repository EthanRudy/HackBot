require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./prefix.json')

const command = require('./cForm.js');
const swear = require('./swears.js');
const roleClaim = require('./roles.js')

client.on('ready', () => {
    console.log('HackBot is online');
    
    swear(client);
    roleClaim(client);
    //KICK//
    command(client, 'kick', message => {
        const { member, mentions } = message

        if (member.hasPermission('KICK_MEMBERS') || member.hasPermission('ADMINISTRATOR')){
            const target = mentions.users.first()
            if (target) {
                const targetMember = message.guild.members.cache.get(target.id)
                targetMember.kick()
                message.channel.send(`<@${targetMember.id}> has been kicked!`)
            } else {
                message.channel.send(`<@${member.id}> Please specify someone to kick...`)
            }
        } else {
            message.channel.send(`@${member.id}> You do not have permission to kick this user!`)
        }
    })
    
    //BAN//
    command(client, 'ban', message => {
        const { member, mentions } = message

        if (member.hasPermission('BAN_MEMBERS') || member.hasPermission('ADMINISTRATOR')){
            const target = mentions.users.first()
            if (target){
                const targetMember = message.guild.members.cache.get(target.id)
                targetMember.ban();
                message.channel.send(`<@${target.id}> has been banned!`)
            } else {
                message.channel.send(`<@${member.id}> Please specify someone to ban...`)
            }
        } else {
            message.channel.send(`<@${member.id}> You do not have permission to ban this user!`)
        }
    })
    //CLEAR//
    command(client, 'clear', message => {
        const { member, mentions } = message

        if (member.hasPermission('MANAGE_MESSAGES')){
            const args = message.content.match(/(\d+)/);
            const num = parseInt(args);
            if (args != null){
                message.channel.bulkDelete(num + 1)
                .then(message => {
                    console.log(`Cleared ${num} messages...`)
                    message.channel.send(`Cleared ${num} messages...`)
                })
            } else {
                message.channel.send('Input a valid number')
            }
        }
    })

    //UPDATE//
    command(client, 'update', message => {
        const { member } = message
        if (member.hasPermission('ADMINISTRATOR')){
            const args = message.content.slice(7).trim()
            client.user.setPresence({
                activity: {
                    name: args,
                    type: 0
                }
            })
        }
    })

    //HELP//
    command(client, 'help',  message => {
        const emb = new Discord.MessageEmbed()
            .setColor('#d76b6b')
            .setTitle('-help')
            .setURL('https://github.com/EthanRudy1/HackBot')
            .setAuthor('HackBot')
            .setDescription("Hello! I'm Hack Bot")
            .setThumbnail('https://twitter.com/masonhackclub/photo')
            .setTimestamp()
            .setFooter('Thanks for using me!');
        message.channel.send(emb);
    })
})

client.login(process.env.HACKBOT_TOKEN);
