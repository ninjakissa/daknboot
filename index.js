const Discord = require("discord.js");
const YTDL = require("ytdl-core");

const TOKEN = "MzQ4NTI2OTA3NTY3ODk4NjI3.DHsdrg.OUWDrQMvwVMXXWBmXsoKtOl6RU8";
const PREFIX = "!";

function generateHex() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
    
}
 
function play(connection, message) {
    var server = servers[message.guild.id];

    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));

    server.queue.shift();

    server.dispatcher.on("end", function() {
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();
    });
}

var fortunes = [
    "Joo",
    "Ei",
    "Ehkä",
    "Haista paska",
    "Tapa ittes",
    "jaa a",
    "..."
];

var fortunes2 = [
    "homo",
    "<--- hihhuli",
    "ootko nää varma ettet oo huora?",
    "kunnon kansalainen",
    "ei mittäää",
    "kuka, en mää mittää nää",
    "N00b ------->"
];

var fortunes3 = [
    "mun kebab on 100% halalii",
    "K E B A B",
    "kebabkebabkebabkebab",
    "Kebab osaa huolehtia frendist",
    "KEBABIT TULILLE",
    "piikitän mun kebabit rännii"
];

var bot = new Discord.Client();

var servers = {};

bot.on("message", function(message) {
    console.log(message.content);
});

bot.on("ready", function() {
    bot.user.setStatus("!komennot");
    bot.user.setGame("!komennot");
});

bot.on("guildMemberAdd", function(member) {
    member.guild.channels.find("name", "general").sendMessage(member.toString() + " welcome bitchie boyyy");

    member.addRole(member.guild.roles.find("name", "Homo"));

    member.guild.createRole({
        name: member.user.username,
        color: generateHex(),
        permissions: []
    }).then(function(role) {
        member.addRole(role);
    })
})

bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;

    if (message.content == "moi") {
        message.channel.sendMessage("Moii!");
    }

    if (message.content == "vittu") {       
        message.channel.sendMessage("rauhoitu");
         }

     if (message.content == "perkele") {       
         message.channel.sendMessage("saatana");
         }

    if (message.content == "nainen") {
message.channel.sendMessage("ja lesbo");
}

if (message.content == "Börje On Huora") {
message.channel.sendMessage("haista vittu tyhmä botti perkele");
}
if (message.content == "Rose onki tommone pikkulutka.") {
message.channel.sendMessage(":)))");
}

    if(!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(" ");
    switch (args[0].toLowerCase()) {
        case "ping":
            message.channel.sendMessage("pong!");
            break;
        case "touch":
            message.channel.sendMessage("http://www.touch.3claws.com/");
            break;
        case "alicia":
            message.channel.sendMessage("http://www.aliciagame.com/");
            break;
        case "komennot":
            message.channel.sendMessage("!ping, !info, !lotto, !embed, !embedtest, !touch, !alicia, !mypic, !minä, !lisääserveriin, !komennot");
            break;
        case "info":
            message.channel.sendMessage("Olen testi botti, ja tekijäni on Aquariuszx");
            break;
        case "lotto":
            if (args[1]) message.channel.sendMessage(fortunes[Math.floor(Math.random() * fortunes.length)]);
            else message.channel.sendMessage("täh, en ymmärrä?");
            break;
            case "kebab":
            message.channel.sendMessage(fortunes3[Math.floor(Math.random() * fortunes3.length)]);
            break;
        case "embed":
            var embed = new Discord.RichEmbed()
                .setDescription("Heii tämä onn joku vidun laatikko")
            message.channel.sendEmbed(embed);
            break;
        case "embedtest":
            var embed = new Discord.RichEmbed()
                .addField("Test Title", "Test Description", true)
                .addField("Test Title", "Test Description", true)
                .addField("Test Title", "Test Description", true)
                .addField("Test Title", "Test Description")
                .addField("Test Title", "Test Description")
                .setColor(0x00FFFF)
                .setFooter("This message is pretty cool, ohhh did i say message i mean EMBED gooteemmmmmmmm")
                .setThumbnail(message.author.avatarURL)
            message.channel.sendEmbed(embed);
            break;
        case "mypic":
            var embed = new Discord.RichEmbed()
                .setColor(0x00FFFF)
                .setThumbnail(message.author.avatarURL)
            message.channel.sendEmbed(embed);
            break;
        case "minä":
            message.channel.sendMessage(fortunes2[Math.floor(Math.random() * fortunes2.length)]);
            message.channel.sendMessage(message.author.toString())
            break;
        case "lisääserveriin":
            message.channel.sendMessage("kopioi alla oleva linkki selaimen hakukenttään!")
            message.channel.sendMessage("https://discordapp.com/oauth2/authorize?client_id=348526907567898627&scope=bot&permissions=0")
            break;
            
        case "syöpä":
            message.channel.sendMessage("itelläs on syöpä")
             break;      
        case "rose":
            message.channel.sendMessage("aika nolo")
             break;
        case "purkkis":
            message.channel.sendMessage("vitun paras")
             break;
        case "gano":
            message.channel.sendMessage("homo")
             break;
        case "removerole":
            message.member.removeRole(message.member.guild.roles.find("name", "Homo"));
            break;
        case "deleterole":
            message.member.guild.roles.find("name", "Homo").delete();
            break;
        case "play":
            if (!args[1]) {
                message.channel.sendMessage("Unohdit linkin!");
            }
            if(!message.member.voiceChannel) {
                message.channel.sendMessage("Liitythän puheluun");
            }

            if (!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []                
            }
                        

            var server = servers[message.guild.id];

            server.queue.push(args[1]);

            if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
                play(connection, message);
            })
            message.channel.sendMessage("Lisätty jonoon");
            break;
        case "skip":
            var server = servers[message.guild.id];

            if (server.dispatcher) server.dispatcher.end();
            break;
        case "stop":
            var server = servers[message.guild.id];

            if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
            break;
        case "räksy":
            message.channel.sendMessage("Räksy perkele")
            break;
        case "shutdown":
            message.channel.sendMessage("botti sammuu...")
            break;
        case "abc":
            message.channel.sendMessage("!cba")
            break;
        case "cba":
            message.channel.sendMessage("!abc")
            break;
        case "infe":
            message.channel.sendMessage("infe on vitun sorsa")
            break;
        case "keskari":
            message.channel.sendMessage("Bosss!")
            break;
        case "pekoni":
            message.channel.sendMessage("pekoni on pahaaa")
            break;
        case "jimi":
            message.channel.sendMessage("Jimppa on homo")
            break;
        case "weera":
            message.channel.sendMessage("Dragonborn the hero of all of tamriel!")
            break;
        case "börje":
            message.channel.sendMessage("huora")
            break;
        case "saturnus":
            message.channel.sendMessage("saBURNus")
            break;
        case "mehu":
            message.channel.sendMessage("mehustin")
            break;
        case "all":
            message.channel.sendMessage("Räksy perkele")
            message.channel.sendMessage("infe on vitun sorsa")
            message.channel.sendMessage("Bosss!")
            message.channel.sendMessage("pekoni on pahaaa")
            message.channel.sendMessage("Jimppa on homo")
            message.channel.sendMessage("Dragonborn the hero of all of tamriel!")
            message.channel.sendMessage("saBURNus")
            message.channel.sendMessage("asdasdasdasd")
            break;
        default:
            message.channel.sendMessage("Kyseistä komentoa ei ole");
            return;
    }
});

bot.login(TOKEN);
