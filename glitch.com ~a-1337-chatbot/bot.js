const tmi = require('tmi.js');
const server = require('./server.js');

// Define configuration options
const opts = {
    identity: {
        username: process.env.BOT_USERNAME,
        password: process.env.OAUTH_TOKEN
    },
    channels: [
        process.env.CHANNEL_NAME
    ]
};

// Create a client with our options
const client = new tmi.client(opts);

let firstBet = false;
//let balance = 22000;
let blue = 0;
let red = 0;
//let won = 0;
//let lose = 0;

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

/*(function farm(){
client.say(process.env.CHANNEL_NAME, `!farm`);
setTimeout(farm, 30000000);
})();*/
/*function farm(){
setInterval(function(){client.say(process.env.CHANNEL_NAME, `!farm`)}, 18000000);
}

farm();*/

// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
    let message = msg.toString();
    console.log(message);
  console.log(context.username);
  
    if(self) {return;}
  
  /*if (message.includes('@i_have_groot_rs - Bet complete for') && context.username === 'xxsaltbotxx') {
          let grootAmt = parseInt(message.match(/, \d+\./)[0].match(/\d+/g)[0]);
    let betAmount = Math.trunc(Math.min(grootAmt * 1.1, grootAmt + 1123));
    //if(betAmount >= 20000) {betAmount = grootAmt;}
        if (message.includes('RED')) {
          client.say(process.env.CHANNEL_NAME, `!red ${betAmount}`);
        } else if (message.includes('BLUE')) {
          client.say(process.env.CHANNEL_NAME, `!blue ${betAmount}`);
        }
    }*/

    if (message.includes(' - Bet complete for') && context.username === 'xxsaltbotxx') {
        if (firstBet === false) {
          //client.say(target, `!balance`);
            //console.log(balance);
            firstBet = true;
          setTimeout(function() {
            if (firstBet === true) {
              console.log(`* * * blue ${blue} red ${red}`);
                if (red > blue) {
                    const betAmount = 5000;
                        //client.say(process.env.CHANNEL_NAME, `!blue ${betAmount}`);
                } else if (red <= blue) {
                    const betAmount = 5000;
                    //client.say(process.env.CHANNEL_NAME, `!red ${betAmount}`);
                }
            }
            console.log(`* Performed bet, clearing variables`);
            setTimeout(function() {
            console.log('* bet finished');
              blue = 0;
              red = 0;
              firstBet = false;
            }, 120000)
        }, 184000);
          console.log('* hi im happy');
        }
        if (message.includes('RED')) {
            //console.log(message.match(/, \d+\./)[0].match(/\d+/g)[0]);
            red += parseInt(message.match(/, \d+\./)[0].match(/\d+/g)[0]);
        } else if (message.includes('BLUE')) {
            //console.log(message.match(/, \d+\./)[0].match(/\d+/g)[0]);
            blue += parseInt(message.match(/, \d+\./)[0].match(/\d+/g)[0]);
        }
    }/* else if (message.includes('@A1337Potato - Your current balance is')) {
        console.log(message.match(/\d+\./g)[0].match(/\d+/g)[0]);
        balance = parseInt(message.match(/\d+\./g)[0].match(/\d+/g)[0]);
    }*/
}

/*Math.trunc(Math.max(Math.min(500, red*0.2, (blue-red)*0.7), 100))
function resolveAfter3Minutes() {
    return new Promise(
        setTimeout(function() {
            if (firstBet === true && balance >= 22000) {
              console.log(`* * * blue ${blue} red ${red}`);
                if (red > blue) {
                    const betAmount = 2000;
                        client.say(process.env.CHANNEL_NAME, `!blue ${betAmount}`);
                } else if (red <= blue) {
                    const betAmount = 2000;
                    client.say(process.env.CHANNEL_NAME, `!red ${betAmount}`);
                }
            }
            console.log(`* Performed bet, clearing variables`);
        }, 170000));
}

async function bet() {
    console.log(`* Start bet function`);
  try {
    await resolveAfter3Minutes();
  } catch(e) {
    console.log(`* waaaa`);
  }
    console.log(`* End bet function`);
}*/

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}

//#chatrooms:50815446:9df7f32a-d7f5-4011-ba56-a81b04851102 rulesroom