const mySecret = process.env['bot_token']
const KeepAlive = require("./server.js")
const env = require("./.env")
                let Discord;
                let Database;
                if(typeof window !== "undefined"){
                    Discord = DiscordJS;
                    Database = EasyDatabase;
                } else {
                    Discord = require("discord.js");
                    Database = require("easy-json-database");
                }
                const delay = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms));
                const s4d = {
                    Discord,
                    client: null,
                    tokenInvalid: false,
                    reply: null,
                    joiningMember: null,
                    database: new Database("./db.json"),
                    checkMessageExists() {
                        if (!s4d.client) throw new Error('You cannot perform message operations without a Discord.js client')
                        if (!s4d.client.readyTimestamp) throw new Error('You cannot perform message operations while the bot is not connected to the Discord API')
                    }
                };
                s4d.client = new s4d.Discord.Client({
                    fetchAllMembers: true
                });
                s4d.client.on('raw', async (packet) => {
                    if(['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)){
                        const guild = s4d.client.guilds.cache.get(packet.d.guild_id);
                        if(!guild) return;
                        const member = guild.members.cache.get(packet.d.user_id) || guild.members.fetch(d.user_id).catch(() => {});
                        if(!member) return;
                        const channel = s4d.client.channels.cache.get(packet.d.channel_id);
                        if(!channel) return;
                        const message = channel.messages.cache.get(packet.d.message_id) || await channel.messages.fetch(packet.d.message_id).catch(() => {});
                        if(!message) return;
                        s4d.client.emit(packet.t, guild, channel, message, member, packet.d.emoji.name);
                    }
                });
                var member_xp, member_level, member_x_mid, member_xp_X;

function colourRandom() {
  var num = Math.floor(Math.random() * Math.pow(2, 24));
  return '#' + ('00000' + num.toString(16)).substr(-6);
}


s4d.client.login(s4d.database.get(String('Token'))).catch((e) => { s4d.tokenInvalid = true; s4d.tokenError = e; });
KeepAlive()

s4d.client.on('message', async (s4dmessage) => {
  if (!((s4dmessage.member).user.bot)) {
    member_xp = s4d.database.get(String((['xp-',s4dmessage.author.id,'-Server-',(s4dmessage.guild || {}).id].join(''))));
    member_level = s4d.database.get(String((['level-',s4dmessage.author.id,'-Server-',(s4dmessage.guild || {}).id].join(''))));
    if (!(s4d.database.get(String((['xp-',s4dmessage.author.id,'-Server-',(s4dmessage.guild || {}).id].join('')))) % 1 == 0)) {
      member_xp = 1;
      s4d.database.set(String((['xp-',s4dmessage.author.id,'-Server-',(s4dmessage.guild || {}).id].join(''))), 1);
      s4dmessage.channel.send(String('Something went wrong in counting your xp level restarting it.'));
    }
    if (!member_xp) {
      member_xp = 0;
    } else if (!member_level) {
      member_level = 0;
    }
    member_x_mid = member_xp * s4d.database.get(String(('XP-X-' + String((s4dmessage.guild || {}).id))));
    s4d.database.set(String((['xp-',s4dmessage.author.id,'-Server-',(s4dmessage.guild || {}).id].join(''))), (member_x_mid + 1));
    if (!s4d.database.has(String(('command-' + String((s4dmessage.guild || {}).id))))) {
      s4dmessage.channel.send(String('automatically set prefix to !!'));
      s4d.database.set(String(('command-' + String((s4dmessage.guild || {}).id))), '!!');
    }
    if (!s4d.database.has(String(('XP-On-' + String((s4dmessage.guild || {}).id))))) {
      s4d.database.set(String(('XP-On-' + String((s4dmessage.guild || {}).id))), true);
    }
    if (!s4d.database.has(String(('XP-X-' + String((s4dmessage.guild || {}).id))))) {
      s4d.database.set(String(('XP-X-' + String((s4dmessage.guild || {}).id))), 1);
    }
    if (s4d.database.get(String((['level-',s4dmessage.author.id,'-Server-',(s4dmessage.guild || {}).id].join('')))) >= 1) {
      if (member_xp >= member_level * 25) {
        s4d.database.set(String((['level-',s4dmessage.author.id,'-Server-',(s4dmessage.guild || {}).id].join(''))), (member_level + 1));
        member_level = member_level + 1;
        s4d.database.set(String((['xp-',s4dmessage.author.id,'-Server-',(s4dmessage.guild || {}).id].join(''))), 1);
        member_xp = 1;
        s4dmessage.channel.send(
                {
                    embed: {
                        title: (s4dmessage.author.username),
                        color: (colourRandom()),
                        image: { url: null },
                        description: (['Congratulations, ',s4dmessage.author.username,' You Have Leveled Up to level ',member_level,'!!'].join(''))
                    }
                }
            );
      }
    } else if (s4d.database.get(String((['level-',s4dmessage.author.id,'-Server-',(s4dmessage.guild || {}).id].join('')))) == 0) {
      if (member_xp >= 10) {
        s4d.database.set(String((['level-',s4dmessage.author.id,'-Server-',(s4dmessage.guild || {}).id].join(''))), (member_level + 1));
        member_level = member_level + 1;
        s4d.database.set(String((['xp-',s4dmessage.author.id,'-Server-',(s4dmessage.guild || {}).id].join(''))), 1);
        member_xp = 1;
        s4dmessage.channel.send(
                {
                    embed: {
                        title: (String(s4dmessage.author.username)),
                        color: (colourRandom()),
                        image: { url: null },
                        description: (['Congratulations, ',s4dmessage.author.username,' You Have Leveled Up to level ',member_level,'!!'].join(''))
                    }
                }
            );
      }
    }
    if ((s4dmessage.content) == String(s4d.database.get(String(('command-' + String((s4dmessage.guild || {}).id))))) + 'level') {
      s4dmessage.channel.send(String(([s4dmessage.member,', you are currently level: ',member_level].join(''))));
    } else if ((s4dmessage.content) == String(s4d.database.get(String(('command-' + String((s4dmessage.guild || {}).id))))) + 'xp') {
      if (member_level == 0) {
        s4dmessage.channel.send(String(([s4dmessage.member,', You Need ',10 - member_xp,' More XP To Level Up To ',member_level + 1].join(''))));
      } else {
        s4dmessage.channel.send(String(([s4dmessage.member,', You Need ',member_level * 25 - member_xp,' More XP To Level Up To ',member_level + 1].join(''))));
      }
    }
  }

});

s4d.client.on('message', async (s4dmessage) => {
  if ((s4dmessage.content) == String(s4d.database.get(String(('command-' + String((s4dmessage.guild || {}).id))))) + 'ownerID') {
    s4dmessage.channel.send(
            {
                embed: {
                    title: 'Owner ID',
                    color: null,
                    image: { url: null },
                    description: s4d.database.get(String('OwnerID'))
                }
            }
        );
  } else if ((s4dmessage.content) == String(s4d.database.get(String(('command-' + String((s4dmessage.guild || {}).id))))) + 'version') {
    s4dmessage.channel.send(
            {
                embed: {
                    title: 'Bot Version',
                    color: null,
                    image: { url: null },
                    description: ('Bot Version - ' + String(s4d.database.get(String('Version'))))
                }
            }
        );
  }
  if ((s4dmessage.content) == String(s4d.database.get(String(('command-' + String((s4dmessage.guild || {}).id))))) + 'info') {
    s4dmessage.channel.send(
            {
                embed: {
                    title: 'Bot Info',
                    color: (colourRandom()),
                    image: { url: null },
                    description: (['Bot Version - ',s4d.database.get(String('Version')),'\n','Owner ID - ',s4d.database.get(String('OwnerID')),'\n','','\n','','\n'].join(''))
                }
            }
        );
  } else if ((s4dmessage.content) == String(s4d.database.get(String(('command-' + String((s4dmessage.guild || {}).id))))) + 'download') {
    s4dmessage.channel.send(
            {
                embed: {
                    title: (s4dmessage.author.username),
                    color: '#33ccff',
                    image: { url: null },
                    description: (' Download Simple Discord Bot - ' + 'https://github.com/SMLkaiellis08/Leveling-XP-discord-bot/releases')
                }
            }
        );
  } else if ((s4dmessage.content) == String(s4d.database.get(String(('command-' + String((s4dmessage.guild || {}).id))))) + 'ping') {
    s4dmessage.channel.send(String(('pong! - ' + String(s4d.client.ws.ping))));
  } else if ((s4dmessage.content) == String(s4d.database.get(String(('command-' + String((s4dmessage.guild || {}).id))))) + 'levelup') {
    if ((s4dmessage.member).hasPermission('ADMINISTRATOR')) {
      s4d.database.set(String((['level-',s4dmessage.author.id,'-Server-',(s4dmessage.guild || {}).id].join(''))), (member_level + 1));
      s4dmessage.channel.send(
              {
                  embed: {
                      title: (String(s4dmessage.author.username)),
                      color: (colourRandom()),
                      image: { url: null },
                      description: ('Leveled Up To ' + String(String(member_level + 1)))
                  }
              }
          );
      member_level = member_level + 1;
    } else {
      s4dmessage.channel.send(
              {
                  embed: {
                      title: (String(s4dmessage.author.username)),
                      color: '#cc0000',
                      image: { url: null },
                      description: ('Sorry You Do Not Have Perms To do That Command' + '')
                  }
              }
          );
    }
  } else if ((s4dmessage.content) == String(s4d.database.get(String(('command-' + String((s4dmessage.guild || {}).id))))) + 'gameping') {
    if ((s4dmessage.member).hasPermission('ADMINISTRATOR')) {
      if (s4d.database.get(String('Game Ping')) == 'True') {
        s4d.database.set(String('Game Ping'), 'False');
        s4dmessage.channel.send(String((String(s4dmessage.member) + ', Playing Ping To False')));
      } else if (s4d.database.get(String('Game Ping')) == 'False') {
        s4d.database.set(String('Game Ping'), 'True');
        s4dmessage.channel.send(String((String(s4dmessage.member) + ', Playing Ping To True')));
      }
    } else {
      s4dmessage.channel.send(
              {
                  embed: {
                      title: (String(s4dmessage.author.username) + ''),
                      color: '#ff0000',
                      image: { url: null },
                      description: 'Sorry You Do Not Have Admin Perms'
                  }
              }
          );
    }
  }
  if ((s4dmessage.content) == String(s4d.database.get(String(('command-' + String((s4dmessage.guild || {}).id))))) + 'help') {
    s4dmessage.channel.send(
            {
                embed: {
                    title: 'Commands',
                    color: '#33ffff',
                    image: { url: null },
                    description: (['Help Command - ',s4d.database.get(String('Help')),'\n','XP Command - !!xp','\n','Level Command - !!level','\n','The Role Of The Member - !!role','\n',' -----','\n','Bot New Update - !!bot info','\n','Bot Info Command - !!info','\n','Bot Version Command - !!version','\n','Bot Owner Command - !!ownerID','\n','-Admin-','\n','Create a text channel - !!create textchannel','\n','Create a Voice channel - !!create voicechannel','\n','Create a category - !!create category','\n','Levelup One Level - !!Levelup','\n','download Simple Bot - !!download','\n','SteveDJ Setup Pannel - !!setup','\n','SteveDJ Setup Verify - !!setup verify','\n','SteveDJ Setup xp - !!setup xp'].join(''))
                }
            }
        );
  }

});

s4d.client.on('ready', async () => {

    console.clear()
    console.log(" ");
    console.log("  -----------------------------");
    console.log("   Simple Xp Bot Connected");
    console.log(`   Base Command Prefix !!`);
    console.log(`   Logged in as ${s4d.client.user.username}.`)
    console.log(`   ${s4d.client.user.username} Is In ${s4d.client.guilds.cache.size} Servers`);
    console.log(`   Config Located In db.json`)
    console.log("  -----------------------------");

  if (s4d.database.get(String('Game Ping')) == 'True') {
    s4d.client.user.setActivity(String(('Ping - ' + String(s4d.client.ws.ping))));
  } else if (s4d.database.get(String('Game Ping')) == 'False') {
    s4d.client.user.setActivity(String(s4d.database.get(String('Bot Is Playing'))));
  } else {
    console.log("DB.json File Error Please Check it")
    s4d.client.user.setActivity(String('DB.json error'));
  }

});

s4d.client.on('message', async (s4dmessage) => {
  if (s4d.database.get(String('Game Ping')) == 'True') {
    s4d.client.user.setActivity(String(('Ping - ' + String(s4d.client.ws.ping))));
  } else if (s4d.database.get(String('Game Ping')) == 'False') {
    s4d.client.user.setActivity(String(s4d.database.get(String('Bot Is Playing'))));
  } else {
    s4d.client.user.setActivity(String('DB.json error'));
  }

});

s4d.client.on('message', async (s4dmessage) => {
  if ((s4dmessage.content) == '!!role') {
    if (((s4dmessage.guild).owner || await (s4dmessage.guild).members.fetch((s4dmessage.guild).ownerID)) == (s4dmessage.member)) {
      s4dmessage.channel.send(String('You Are Owner Of The Server'));
    } else if (s4d.database.get(String('OwnerID')) == (s4dmessage.member)) {
      s4dmessage.channel.send(String('You Are Owner Of The Bot'));
    } else if ((s4dmessage.member).hasPermission('ADMINISTRATOR')) {
      s4dmessage.channel.send(String('You Are Admin Of The Server'));
    } else {
      s4dmessage.channel.send(String('You Are A member Of The Server'));
    }
  }
  if ((s4dmessage.content) == String(s4d.database.get(String(('command-' + String((s4dmessage.guild || {}).id))))) + 'bot info') {
    s4dmessage.channel.send(
            {
                embed: {
                    title: ('Bot Version - ' + String(s4d.database.get(String('Version')))),
                    color: '#3333ff',
                    image: { url: null },
                    description: (['Bug Fixes / Added','\n','\n',s4d.database.get(String('B.F.L1')),'\n',s4d.database.get(String('B.F.L2')),'\n',s4d.database.get(String('B.F.L3')),'\n',s4d.database.get(String('B.F.L4')),'\n',s4d.database.get(String('B.F.L5')),'\n','Bugs','\n',s4d.database.get(String('F.B.L1')),'\n',s4d.database.get(String('F.B.L2')),'\n',s4d.database.get(String('F.B.L3'))].join(''))
                }
            }
        );
  }
  if ((s4dmessage.member).hasPermission('MANAGE_GUILD')) {
    if ((s4dmessage.content) == String(s4d.database.get(String(('command-' + String((s4dmessage.guild || {}).id))))) + 'setup verify') {
      if ((s4dmessage.member).hasPermission('MANAGE_GUILD')) {
        s4dmessage.delete();
        (s4dmessage.channel).send(
                {
                    embed: {
                        title: 'SteveDJ Setup pannel',
                        color: '#ff6600',
                        image: { url: null },
                        description: (['Type of Verifying','\n','\n','-----','\n','\n','1 - Code','\n','2 - Reactions (Broken)'].join(''))
                    }
                }
            );
        (s4dmessage.channel).awaitMessages((m) => m.author.id === (s4dmessage.member).id, { time: (2*60*1000), max: 1 }).then(async (collected) => { s4d.reply = collected.first().content;
           if ((s4d.reply) == '1') {
            s4d.database.set(String(('verify-type-' + String((s4dmessage.guild || {}).id))), 1);
            (s4dmessage.channel).send(
                    {
                        embed: {
                            title: 'SteveDJ Setup pannel',
                            color: '#ff6600',
                            image: { url: null },
                            description: 'Please Send The ID of The Role You want to Give The Member when Verified'
                        }
                    }
                );
            (s4dmessage.channel).awaitMessages((m) => m.author.id === (s4dmessage.member).id, { time: (2*60*1000), max: 1 }).then(async (collected) => { s4d.reply = collected.first().content;
               s4d.database.set(String(('Member Role-' + String((s4dmessage.guild || {}).id))), (s4d.reply));
              (s4dmessage.channel).send(String('Verify Code Eg: !!verify'));
              (s4dmessage.channel).awaitMessages((m) => m.author.id === (s4dmessage.member).id, { time: (2*60*1000), max: 1 }).then(async (collected) => { s4d.reply = collected.first().content;
                 s4d.database.set(String(('Member code-' + String((s4dmessage.guild || {}).id))), (s4d.reply));
                s4dmessage.channel.send(String(('Verifying Code Set To ' + String(s4d.database.get(String(('Member code-' + String((s4dmessage.guild || {}).id))))))));

               s4d.reply = null; }).catch(async (e) => { console.error(e);  });
             s4d.reply = null; }).catch(async (e) => { console.error(e);  });} else if ((s4d.reply) == 'r22') {
            (s4dmessage.channel).send(
                    {
                        embed: {
                            title: 'SteveDJ Setup pannel',
                            color: '#ff6600',
                            image: { url: null },
                            description: 'Please Send The ID of The Role You want to Give The Member when Verified'
                        }
                    }
                );
            (s4dmessage.channel).awaitMessages((m) => m.author.id === (s4dmessage.member).id, { time: (2*60*1000), max: 1 }).then(async (collected) => { s4d.reply = collected.first().content;
               s4d.database.set(String(('Member Role-' + String((s4dmessage.guild || {}).id))), (s4d.reply));
              (s4dmessage.channel).send(
                      {
                          embed: {
                              title: 'SteveDJ Setup pannel',
                              color: '#ff6600',
                              image: { url: null },
                              description: 'Verifying Message ID'
                          }
                      }
                  );
              (s4dmessage.channel).awaitMessages((m) => m.author.id === (s4dmessage.member).id, { time: (2*60*1000), max: 1 }).then(async (collected) => { s4d.reply = collected.first().content;
                 s4d.database.set(String(('Member Message-' + String((s4dmessage.guild || {}).id))), (s4d.reply));
                (s4dmessage.channel).send(
                        {
                            embed: {
                                title: 'SteveDJ Setup pannel',
                                color: '#ff6600',
                                image: { url: null },
                                description: 'Verifying Reaction ID'
                            }
                        }
                    );
                (s4dmessage.channel).awaitMessages((m) => m.author.id === (s4dmessage.member).id, { time: (2*60*1000), max: 1 }).then(async (collected) => { s4d.reply = collected.first().content;
                   s4d.database.set(String(('Member Reaction-' + String((s4dmessage.guild || {}).id))), (s4d.reply));
                  s4dmessage.channel.send(
                          {
                              embed: {
                                  title: 'SteveDJ Setup pannel',
                                  color: '#ff6600',
                                  image: { url: null },
                                  description: ('Complete' + '')
                              }
                          }
                      );

                 s4d.reply = null; }).catch(async (e) => { console.error(e);  });
               s4d.reply = null; }).catch(async (e) => { console.error(e);  });
             s4d.reply = null; }).catch(async (e) => { console.error(e);  });} else {
          }

         s4d.reply = null; }).catch(async (e) => { console.error(e);  });}
    }
  }
  if ((s4dmessage.content) == String(s4d.database.get(String(('command-' + String((s4dmessage.guild || {}).id))))) + 'setup xp') {
    if ((s4dmessage.member).hasPermission('MANAGE_GUILD')) {
      (s4dmessage.channel).send(
              {
                  embed: {
                      title: 'SteveDJ Setup pannel',
                      color: '#ff6600',
                      image: { url: null },
                      description: (['Xp enabled = ',s4d.database.get(String(('XP-On-' + String((s4dmessage.guild || {}).id)))),'\n','Enable Or Disable Xp'].join(''))
                  }
              }
          );
      (s4dmessage.channel).awaitMessages((m) => m.author.id === (s4dmessage.member).id, { time: (1*60*1000), max: 1 }).then(async (collected) => { s4d.reply = collected.first().content;
         if ((s4d.reply) == 'false') {
          s4d.database.set(String(('XP-On-' + String((s4dmessage.guild || {}).id))), false);
          s4dmessage.channel.send(String('Xp Has Been Disabled'));
        } else if ((s4d.reply) == 'true') {
          s4d.database.set(String(('XP-On-' + String((s4dmessage.guild || {}).id))), true);
          s4dmessage.channel.send(String('Xp Has Been Enabled'));
        } else {
          s4dmessage.channel.send(String('Error Try true,false'));
        }

       s4d.reply = null; }).catch(async (e) => { console.error(e);  });} else {
      s4dmessage.channel.send(
              {
                  embed: {
                      title: (String(s4dmessage.author.username) + ''),
                      color: '#ff0000',
                      image: { url: null },
                      description: 'Sorry You Do Not Have Admin Perms'
                  }
              }
          );
    }
  }
  if ((s4dmessage.content) == String(s4d.database.get(String(('command-' + String((s4dmessage.guild || {}).id))))) + 'settings xp') {
    if ((s4dmessage.member).hasPermission('MANAGE_GUILD')) {
      (s4dmessage.channel).send(
              {
                  embed: {
                      title: 'SteveDJ Setup pannel',
                      color: '#ff6600',
                      image: { url: null },
                      description: (['Beta Warning','\n',['Xp Multiplier is ',member_xp_X,' Set New Multiplier To'].join('')].join(''))
                  }
              }
          );
      (s4dmessage.channel).awaitMessages((m) => m.author.id === (s4dmessage.member).id, { time: (1*60*1000), max: 1 }).then(async (collected) => { s4d.reply = collected.first().content;
         member_xp_X = (s4d.reply);
        s4dmessage.channel.send(
                {
                    embed: {
                        title: 'SteveDJ Setup pannel',
                        color: '#ff6600',
                        image: { url: null },
                        description: ('Xp Multiplier now is ' + String(member_xp_X))
                    }
                }
            );
        s4d.database.set(String(s4d.database.get(String(('XP-X-' + String((s4dmessage.guild || {}).id))))), member_xp_X);

       s4d.reply = null; }).catch(async (e) => { console.error(e);  });} else {
      s4dmessage.channel.send(
              {
                  embed: {
                      title: (String(s4dmessage.author.username) + ''),
                      color: '#ff0000',
                      image: { url: null },
                      description: 'Sorry You Do Not Have Admin Perms'
                  }
              }
          );
    }
  }
  if ((s4dmessage.content) == String(s4d.database.get(String(('command-' + String((s4dmessage.guild || {}).id))))) + 'setup') {
    if ((s4dmessage.member).hasPermission('MANAGE_GUILD')) {
      s4dmessage.channel.send(
              {
                  embed: {
                      title: 'SteveDJ Setup pannel',
                      color: '#ff6600',
                      image: { url: null },
                      description: (['Setup verify - !!setup verify','\n','Setup xp - !!setup xp','\n','xp settings - !!settings xp','\n','Prefix settings - !!settings prefix'].join(''))
                  }
              }
          );
    }
  }
  if ((s4dmessage.content) == String(s4d.database.get(String(('command-' + String((s4dmessage.guild || {}).id))))) + 'settings prefix') {
    if ((s4dmessage.member).hasPermission('MANAGE_GUILD')) {
      (s4dmessage.channel).send(
              {
                  embed: {
                      title: 'SteveDJ Setup pannel',
                      color: '#ff6600',
                      image: { url: null },
                      description: 'Set SteveDJ\'s command Prefix'
                  }
              }
          );
      (s4dmessage.channel).awaitMessages((m) => m.author.id === (s4dmessage.member).id, { time: (2*60*1000), max: 1 }).then(async (collected) => { s4d.reply = collected.first().content;
         s4d.database.set(String(('command-' + String((s4dmessage.guild || {}).id))), (s4d.reply));
        s4dmessage.channel.send(String(('Set Prefix To ' + String(s4d.reply))));

       s4d.reply = null; }).catch(async (e) => { console.error(e);  });} else {
      s4dmessage.channel.send(
              {
                  embed: {
                      title: (String(s4dmessage.author.username) + ''),
                      color: '#ff0000',
                      image: { url: null },
                      description: 'Sorry You Do Not Have Admin Perms'
                  }
              }
          );
    }
  }
  if ((s4dmessage.content) == s4d.database.get(String(('Member code-' + String((s4dmessage.guild || {}).id))))) {
    if (s4d.database.has(String(('Member Role-' + String((s4dmessage.guild || {}).id))))) {
      s4dmessage.delete();
      (s4dmessage.member).roles.add(s4d.database.get(String(('Member Role-' + String((s4dmessage.guild || {}).id)))));
      s4dmessage.channel.send(String(([s4dmessage.author.username,', Welcome to ',(s4dmessage.guild).name].join(''))));
    }
  }
  if ((s4dmessage.content) == String(s4d.database.get(String(('command-' + String((s4dmessage.guild || {}).id))))) + 'setgame') {
    if (s4d.database.get(String('Game Ping')) == 'True') {
      if ((s4dmessage.member).hasPermission('ADMINISTRATOR')) {
        s4dmessage.channel.send(String((String(s4dmessage.member) + ', Playing Ping Is True Do \'!!gameping\' To Disable')));
      } else {
        s4dmessage.channel.send(
                {
                    embed: {
                        title: (String(s4dmessage.author.username) + ''),
                        color: '#ff0000',
                        image: { url: null },
                        description: 'Sorry You Do Not Have Admin Perms'
                    }
                }
            );
      }
    } else if (s4d.database.get(String('Game Ping')) == 'False') {
      if ((s4dmessage.member).hasPermission('ADMINISTRATOR')) {
        (s4dmessage.channel).send(String('Please Type What You want the Game To Be'));
        (s4dmessage.channel).awaitMessages((m) => m.author.id === (s4dmessage.member).id, { time: (1*60*1000), max: 1 }).then(async (collected) => { s4d.reply = collected.first().content;
           s4d.database.set(String('Bot Is Playing'), (s4d.reply));
          s4dmessage.channel.send(
                  {
                      embed: {
                          title: (String(s4dmessage.author.username) + ''),
                          color: '#3366ff',
                          image: { url: null },
                          description: ('Game Has Been Set To Playing ' + String(s4d.reply))
                      }
                  }
              );
          s4d.client.user.setActivity(String(s4d.database.get(String('Bot Is Playing'))));

         s4d.reply = null; }).catch(async (e) => { console.error(e);   s4dmessage.channel.send(String('No Message Reply'));
         });} else {
        s4dmessage.channel.send(
                {
                    embed: {
                        title: (String(s4dmessage.author.username) + ''),
                        color: '#ff0000',
                        image: { url: null },
                        description: 'Sorry You Do Not Have Admin Perms'
                    }
                }
            );
      }
    }
  } else if ((s4dmessage.content) == String(s4d.database.get(String(('command-' + String((s4dmessage.guild || {}).id))))) + 'create textchannel') {
    if ((s4dmessage.member).hasPermission('ADMINISTRATOR')) {
      (s4dmessage.channel).send(String('Create A Channel Name:'));
      (s4dmessage.channel).awaitMessages((m) => m.author.id === (s4dmessage.member).id, { time: (1*60*1000), max: 1 }).then(async (collected) => { s4d.reply = collected.first().content;
         s4dmessage.channel.send(
                {
                    embed: {
                        title: (String(s4dmessage.author.username) + ''),
                        color: '#6600cc',
                        image: { url: null },
                        description: ('Created A Channel Called: ' + String(s4d.reply))
                    }
                }
            );
        (s4dmessage.guild).channels.create((s4d.reply), {
                type: 'text'
            });

       s4d.reply = null; }).catch(async (e) => { console.error(e);   s4dmessage.channel.send(String('No Message Reply'));
       });} else {
      s4dmessage.channel.send(
              {
                  embed: {
                      title: (String(s4dmessage.author.username) + ''),
                      color: '#ff0000',
                      image: { url: null },
                      description: 'Sorry You Do Not Have Admin Perms'
                  }
              }
          );
    }
  } else if ((s4dmessage.content) == String(s4d.database.get(String(('command-' + String((s4dmessage.guild || {}).id))))) + 'create category ') {
    if ((s4dmessage.member).hasPermission('ADMINISTRATOR')) {
      (s4dmessage.channel).send(String('Create A Category  Name:'));
      (s4dmessage.channel).awaitMessages((m) => m.author.id === (s4dmessage.member).id, { time: (1*60*1000), max: 1 }).then(async (collected) => { s4d.reply = collected.first().content;
         s4dmessage.channel.send(
                {
                    embed: {
                        title: (String(s4dmessage.author.username) + ''),
                        color: '#3333ff',
                        image: { url: null },
                        description: ('Created A Category Called: ' + String(s4d.reply))
                    }
                }
            );
        (s4dmessage.guild).channels.create((s4d.reply), {
                type: 'category'
            });

       s4d.reply = null; }).catch(async (e) => { console.error(e);   s4dmessage.channel.send(String('No Message Reply'));
       });} else {
      s4dmessage.channel.send(
              {
                  embed: {
                      title: (String(s4dmessage.author.username) + ''),
                      color: '#ff0000',
                      image: { url: null },
                      description: 'Sorry You Do Not Have Admin Perms'
                  }
              }
          );
    }
  } else if ((s4dmessage.content) == String(s4d.database.get(String(('command-' + String((s4dmessage.guild || {}).id))))) + 'create voicechannel') {
    if ((s4dmessage.member).hasPermission('ADMINISTRATOR')) {
      (s4dmessage.channel).send(String('Create A Channel Name:'));
      (s4dmessage.channel).awaitMessages((m) => m.author.id === (s4dmessage.member).id, { time: (1*60*1000), max: 1 }).then(async (collected) => { s4d.reply = collected.first().content;
         s4dmessage.channel.send(
                {
                    embed: {
                        title: (String(s4dmessage.author.username) + ''),
                        color: '#3333ff',
                        image: { url: null },
                        description: ('Created A Channel Called: ' + String(s4d.reply))
                    }
                }
            );
        (s4dmessage.guild).channels.create((s4d.reply), {
                type: 'voice'
            });

       s4d.reply = null; }).catch(async (e) => { console.error(e);   s4dmessage.channel.send(String('No Message Reply'));
       });} else {
      s4dmessage.channel.send(
              {
                  embed: {
                      title: (String(s4dmessage.author.username) + ''),
                      color: '#ff0000',
                      image: { url: null },
                      description: 'Sorry You Do Not Have Admin Perms'
                  }
              }
          );
    }
  } else if ((s4dmessage.content) == '!!ban') {
    if ((s4dmessage.member).hasPermission('ADMINISTRATOR')) {
      if ((s4dmessage.member).hasPermission('ADMINISTRATOR')) {
        s4dmessage.channel.send(String(('Banned ' + String(s4dmessage.mentions.members.first()))));
        (s4dmessage.mentions.members.first()).ban();
      } else {
        s4dmessage.channel.send(
                {
                    embed: {
                        title: (String(s4dmessage.author.username) + ''),
                        color: '#ff0000',
                        image: { url: null },
                        description: 'Sorry You Do Not Have Admin Perms'
                    }
                }
            );
      }
    } else {
      s4dmessage.channel.send(
              {
                  embed: {
                      title: (String(s4dmessage.author.username) + ''),
                      color: '#ff0000',
                      image: { url: null },
                      description: 'Sorry You Do Not Have Admin Perms'
                  }
              }
          );
    }
  } else if ((s4dmessage.content) == '!!kick') {
    if (!s4d.database.has(String((['RK-',s4dmessage.guild,'-',s4dmessage.member].join(''))))) {
      s4dmessage.channel.send(String('Do \'!!rk\' to add some one to be kicked'));
    } else {
      if ((s4dmessage.member).hasPermission('ADMINISTRATOR')) {
        s4dmessage.channel.send(String(('kicked ' + String(s4d.database.get(String((['RK-',s4dmessage.guild,'-',s4dmessage.member].join(''))))))));
        s4d.database.get(String((['RK-',s4dmessage.guild,'-',s4dmessage.member].join('')))).kick();
        s4d.database.delete(String(s4d.database.get(String((['RK-',s4dmessage.guild,'-',s4dmessage.member].join(''))))));
      } else {
        s4dmessage.channel.send(
                {
                    embed: {
                        title: (String(s4dmessage.author.username) + ''),
                        color: '#ff0000',
                        image: { url: null },
                        description: 'Sorry You Do Not Have Admin Perms'
                    }
                }
            );
      }
    }
  } else if ((s4dmessage.content) == '!!rk') {
    if ((s4dmessage.member).hasPermission('ADMINISTRATOR')) {
      (s4dmessage.channel).send(String('Ready Kick:'));
      (s4dmessage.channel).awaitMessages((m) => m.author.id === (s4dmessage.member).id, { time: (1*60*1000), max: 1 }).then(async (collected) => { s4d.reply = collected.first().content;
         s4d.database.set(String((['RK-',s4dmessage.guild,'-',s4dmessage.member].join(''))), (s4d.reply));

       s4d.reply = null; }).catch(async (e) => { console.error(e);   s4dmessage.channel.send(String('No Message Reply'));
       });} else {
      s4dmessage.channel.send(
              {
                  embed: {
                      title: (String(s4dmessage.author.username) + ''),
                      color: '#ff0000',
                      image: { url: null },
                      description: 'Sorry You Do Not Have Admin Perms'
                  }
              }
          );
    }
  }

});

                s4d;
            