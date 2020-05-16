const config = require('./config.json')

const Discord = require('discord.js')
const bot = new Discord.Client()

const token = config.token

bot.on('ready', () => {
    bot.user.setActivity('Pokémon on 1,208,334 servers')
    
    console.log('online')
})

bot.on('message', (msg) => {
    let items = msg.content.split(" ")
    if(items[0] == "fp!help"){
        msg.channel.send("send a fake pokemon using: `fp!send <channel id>`")
    }else if (items[0] == 'fp!send'){
        bot.channels.fetch(items[1])
            .then(channel => {
                channel.send(createEmbed(items[2]))
                msg.channel.send("Pokémon successfully sent!")
            })
            .catch(console.error);
    }
    else if (items[0] == 'fp!w'){
        bot.channels.fetch(items[1])
            .then(channel => {
                channel.send("This is the wrong pokémon!")
                msg.channel.send("wrong pokémon message successfully sent!")
            })
            .catch(console.error);
    }
    else if (items[0] == 'fp!aha'){
        bot.channels.fetch(items[1])
            .then(channel => {
                channel.send("AHA \n I win \n you LOSE")
                msg.channel.send("AHA message successfully sent!")
            })
            .catch(console.error);
    }
})

bot.login(token)

function createEmbed(id){
    if (id == undefined){
        id = Math.floor(Math.random() * 721) + 1 
    }
    return new Discord.MessageEmbed()
        .setColor('#00ae86')
        .setTitle('‌‌A wild pokémon has аppeаred!')
        .setDescription('Guess the pokémon аnd type p!catch <pokémon> to cаtch it!')
        .attachFiles([`./sugimori/${id}.png`])
        .setImage(`attachment://${id}.png`)
}