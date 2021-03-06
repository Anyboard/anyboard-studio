let htmlTemplate = ''
htmlTemplate += '<!DOCTYPE html>\n'
htmlTemplate += '<html>\n'
htmlTemplate += '<head>\n'
htmlTemplate += '  <meta charset="utf-8" />\n'
htmlTemplate += '  <meta name="viewport" content="width=device-width, user-scalable=no\n'
htmlTemplate += ' initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0" />\n'
htmlTemplate += '\n'
htmlTemplate += '  <title>AnyboardGameDemo</title>\n'
htmlTemplate += '\n'
htmlTemplate += '  <style>\n'
htmlTemplate += '    @import \'ui/css/evothings-app.css\';\n'
htmlTemplate += '  </style>\n'
htmlTemplate += '\n'
htmlTemplate += '  <!-- cordova.js based -->\n'
htmlTemplate += '  <script src="cordova.js"></script>\n'
htmlTemplate += '\n'
htmlTemplate += '  <!-- AnyboardJS libraries -->\n'
htmlTemplate += '  <script src="dist/anyboard.js"></script>\n'
htmlTemplate += '\n'
htmlTemplate += '  <!-- Bluetooth driver and dependencies-->\n'
htmlTemplate += '  <script src="libs/evothings/evothings.js"></script>\n'
htmlTemplate += '  <script src="libs/evothings/easyble/easyble.js"></script>\n'
htmlTemplate += '  <script src="drivers/discovery.evothings.bluetooth.js"></script>\n'
htmlTemplate += '  <script src="drivers/bean.evothings.bluetooth.js"></script>\n'
htmlTemplate += '  <script src="drivers/rfduino.evothings.bluetooth.js"></script>\n'
htmlTemplate += '\n'
htmlTemplate += '  <!-- We\'ve used jquery for quick development -->\n'
htmlTemplate += '  <script src="libs/jquery-1.11.3.min.js"></script>\n'
htmlTemplate += '\n'
htmlTemplate += '  <script>\n'
htmlTemplate += '    $(document).ready(function(){\n'
htmlTemplate += '      $("#summary").show();\n'
htmlTemplate += '    });\n'
htmlTemplate += '  </script>\n'
htmlTemplate += '\n'
htmlTemplate += '  <script>\n'
htmlTemplate += '    var app;\n'
htmlTemplate += '    app = {\n'
htmlTemplate += '      devices: {},\n'
htmlTemplate += '      connectedPlayers: 0,\n'
htmlTemplate += '\n'
htmlTemplate += '      //REPLACEMEOKAY//\n'
htmlTemplate += '\n'
htmlTemplate += '      // Discover bluetooth tokens in proximity\n'
htmlTemplate += '      discover: function () {\n'
htmlTemplate += '        var self = this;\n'
htmlTemplate += '        AnyBoard.TokenManager.scan(\n'
htmlTemplate += '          // success function to be executed upon _each_ token that is discovered\n'
htmlTemplate += '          function (token) {\n'
htmlTemplate += '            self.addDiscovered(token);\n'
htmlTemplate += '          },\n'
htmlTemplate += '          // function to be executed upon failure\n'
htmlTemplate += '          function (errorCode) {\n'
htmlTemplate += '            hyper.log(errorCode)\n'
htmlTemplate += '          }\n'
htmlTemplate += '        );\n'
htmlTemplate += '      },\n'
htmlTemplate += '\n'
htmlTemplate += '      // Function to be executed upon having discovered a token\n'
htmlTemplate += '      addDiscovered: function (token) {\n'
htmlTemplate += '      //  if (token.name.toLowerCase() === \'anypawn\') {\n'
htmlTemplate += '        if (true) {\n'
htmlTemplate += '          this.devices[token.address] = token\n'
htmlTemplate += '\n'
htmlTemplate += '          // Add button for token to body\n'
htmlTemplate += '          //document.body.innerHTML += \'<button type="button" id="\' + token.name + \'" onclick="app.connect(\' + "\'" + token.name + "\'" + \')" class="grey">\' + token.name + \' </button><br />\';\n'
htmlTemplate += '          $("#tokens").append(\'<button type="button" id="ap\' + token.address + \'" onclick="app.connect(\' + "\'" + token.address + "\'" + \')" class="grey">\' + token.name + \' </button><br />\');\n'
htmlTemplate += '\n'
htmlTemplate += '          // Add listener to be executed if the token connects\n'
htmlTemplate += '          token.on(\'connect\', function () {\n'
htmlTemplate += '            this.connectedPlayers += 1;\n'
htmlTemplate += '            document.getElementById(\'ap\'+token.address).className = \'green\';\n'
htmlTemplate += '            token.paperSelect(app.paperType)\n'
htmlTemplate += '            if (app.requiredPlayers[0] === null || ((app.connectedPlayers >= app.requiredPlayers[0])\n'
htmlTemplate += '              && (app.connectedPlayers <= app.requiredPlayers[1]))) {\n'
htmlTemplate += '              $(\'#next\').show()\n'
htmlTemplate += '            }\n'
htmlTemplate += '            //$("#token_feedback").append(\'<button type="button" onclick="app.verifyColor(\' + "\'" + token.name + "\'" + \')"class="indicator3"> Verify color</button><br />\');\n'
htmlTemplate += '          });\n'
htmlTemplate += '\n'
htmlTemplate += '          // Add listener to be executed if the token disconnects\n'
htmlTemplate += '          token.on(\'disconnect\', function () {\n'
htmlTemplate += '            document.getElementById(token.name).className = \'red\';\n'
htmlTemplate += '          });\n'
htmlTemplate += '        }\n'
htmlTemplate += '\n'
htmlTemplate += '      },\n'
htmlTemplate += '\n'
htmlTemplate += '      // Attempts to connect to token.\n'
htmlTemplate += '      connect: function (tokenAddress) {\n'
htmlTemplate += '        var token = this.devices[tokenAddress];\n'
htmlTemplate += '\n'
htmlTemplate += '        // If already connecting, stop\n'
htmlTemplate += '        if (document.getElementById(\'ap\'+token.address).className == \'blue\')\n'
htmlTemplate += '          return;\n'
htmlTemplate += '\n'
htmlTemplate += '        // If already connected, attempt to send green led command\n'
htmlTemplate += '        if (document.getElementById(\'ap\'+token.address).className == \'green\') {\n'
htmlTemplate += '          this.sendVibrationCmd(token);\n'
htmlTemplate += '          return;\n'
htmlTemplate += '        }\n'
htmlTemplate += '\n'
htmlTemplate += '        // Signal that we\'re attempting to connect\n'
htmlTemplate += '        document.getElementById(\'ap\'+token.address).className = \'blue\';\n'
htmlTemplate += '        // Send connect command.\n'
htmlTemplate += '        token.connect();\n'
htmlTemplate += '      },\n'
htmlTemplate += '\n'
htmlTemplate += '      // Feedback commands\n'
htmlTemplate += '      sendVibrationCmd: function (token, length) {\n'
htmlTemplate += '\n'
htmlTemplate += '        var completedFunction = function (data) {\n'
htmlTemplate += '          hyper.log("We happily send the VIBRATE command");\n'
htmlTemplate += '        };\n'
htmlTemplate += '\n'
htmlTemplate += '        var errorCallback = function (errorMsg) {\n'
htmlTemplate += '          hyper.log("Failed to send the VIBRATE command");\n'
htmlTemplate += '        };\n'
htmlTemplate += '\n'
htmlTemplate += '        if(app.tokenVal.hasOwnProperty(token.id)) {\n'
htmlTemplate += '          if (app.tokenVal[token.id].includes(\'allowVibrate\')) {\n'
htmlTemplate += '            token.vibrate([length],\n'
htmlTemplate += '              completedFunction,  // function to be executed when token signals\n'
htmlTemplate += '              errorCallback  // function to be executed in case of failure to send command to token\n'
htmlTemplate += '            );\n'
htmlTemplate += '          }\n'
htmlTemplate += '        } else {\n'
htmlTemplate += '          token.vibrate([length],\n'
htmlTemplate += '            completedFunction,  // function to be executed when token signals\n'
htmlTemplate += '            errorCallback  // function to be executed in case of failure to send command to token\n'
htmlTemplate += '          );\n'
htmlTemplate += '        }\n'
htmlTemplate += '      },\n'
htmlTemplate += '\n'
htmlTemplate += '      sendVibrationPatternCmd: function (token, pattern) {\n'
htmlTemplate += '\n'
htmlTemplate += '        var completedFunction = function (data) {\n'
htmlTemplate += '          hyper.log("We happily send the VIBRATEPATTERN command");\n'
htmlTemplate += '        };\n'
htmlTemplate += '\n'
htmlTemplate += '        var errorCallback = function (errorMsg) {\n'
htmlTemplate += '          hyper.log("Failed to send the VIBRATEPATTERN command");\n'
htmlTemplate += '        };\n'
htmlTemplate += '\n'
htmlTemplate += '        if(app.tokenVal.hasOwnProperty(token.id)) {\n'
htmlTemplate += '          if (app.tokenVal[token.id].includes(\'allowVibratePattern\')) {\n'
htmlTemplate += '            token.vibratePattern(pattern,\n'
htmlTemplate += '              completedFunction,  // function to be executed when token signals\n'
htmlTemplate += '              errorCallback  // function to be executed in case of failure to send command to token\n'
htmlTemplate += '            );\n'
htmlTemplate += '          }\n'
htmlTemplate += '        } else {\n'
htmlTemplate += '          token.vibratePattern(pattern,\n'
htmlTemplate += '            completedFunction,  // function to be executed when token signals\n'
htmlTemplate += '            errorCallback  // function to be executed in case of failure to send command to token\n'
htmlTemplate += '          );\n'
htmlTemplate += '        }\n'
htmlTemplate += '      },\n'
htmlTemplate += '\n'
htmlTemplate += '      sendLedOnCmd: function (token, ledArray) {\n'
htmlTemplate += '\n'
htmlTemplate += '        var completedFunction = function (data) {\n'
htmlTemplate += '          hyper.log("We happily send the LEDON command");\n'
htmlTemplate += '        };\n'
htmlTemplate += '\n'
htmlTemplate += '        var errorCallback = function (errorMsg) {\n'
htmlTemplate += '          hyper.log("Failed to send the LEDON command");\n'
htmlTemplate += '        };\n'
htmlTemplate += '\n'
htmlTemplate += '        if(app.tokenVal.hasOwnProperty(token.id)) {\n'
htmlTemplate += '          if (app.tokenVal[token.id].includes(\'allowLEDChange\')) {\n'
htmlTemplate += '            token.ledOn(ledArray,\n'
htmlTemplate += '              completedFunction,  // function to be executed when token signals\n'
htmlTemplate += '              errorCallback  // function to be executed in case of failure to send command to token\n'
htmlTemplate += '            );\n'
htmlTemplate += '          }\n'
htmlTemplate += '        } else {\n'
htmlTemplate += '          token.ledOn(ledArray,\n'
htmlTemplate += '            completedFunction,  // function to be executed when token signals\n'
htmlTemplate += '            errorCallback  // function to be executed in case of failure to send command to token\n'
htmlTemplate += '          );\n'
htmlTemplate += '        }\n'
htmlTemplate += '      },\n'
htmlTemplate += '\n'
htmlTemplate += '      sendLedBlinkCmd: function (token, time, period) {\n'
htmlTemplate += '\n'
htmlTemplate += '        var completedFunction = function (data) {\n'
htmlTemplate += '          hyper.log("We happily send the LEDBLINK command");\n'
htmlTemplate += '        };\n'
htmlTemplate += '\n'
htmlTemplate += '        var errorCallback = function (errorMsg) {\n'
htmlTemplate += '          hyper.log("Failed to send the LEDBLINK command");\n'
htmlTemplate += '        };\n'
htmlTemplate += '\n'
htmlTemplate += '        if(app.tokenVal.hasOwnProperty(token.id)) {\n'
htmlTemplate += '          if (app.tokenVal[token.id].includes(\'allowLEDBlink\')) {\n'
htmlTemplate += '            token.ledBlink(time, period,\n'
htmlTemplate += '              completedFunction,  // function to be executed when token signals\n'
htmlTemplate += '              errorCallback  // function to be executed in case of failure to send command to token\n'
htmlTemplate += '            );\n'
htmlTemplate += '          }\n'
htmlTemplate += '        } else {\n'
htmlTemplate += '          token.ledBlink(time, period,\n'
htmlTemplate += '            completedFunction,  // function to be executed when token signals\n'
htmlTemplate += '            errorCallback  // function to be executed in case of failure to send command to token\n'
htmlTemplate += '          );\n'
htmlTemplate += '        }\n'
htmlTemplate += '      },\n'
htmlTemplate += '\n'
htmlTemplate += '      sendLedOffCmd: function (token) {\n'
htmlTemplate += '\n'
htmlTemplate += '        var completedFunction = function (data) {\n'
htmlTemplate += '          hyper.log("We happily send the LEDOFF command");\n'
htmlTemplate += '        };\n'
htmlTemplate += '\n'
htmlTemplate += '        var errorCallback = function (errorMsg) {\n'
htmlTemplate += '          hyper.log("Failed to send the LEDOFF command");\n'
htmlTemplate += '        };\n'
htmlTemplate += '\n'
htmlTemplate += '        if(app.tokenVal.hasOwnProperty(token.id)) {\n'
htmlTemplate += '          if (app.tokenVal[token.id].includes(\'allowLEDChange\')) {\n'
htmlTemplate += '            token.ledOff(ledArray,\n'
htmlTemplate += '              completedFunction,  // function to be executed when token signals\n'
htmlTemplate += '              errorCallback  // function to be executed in case of failure to send command to token\n'
htmlTemplate += '            );\n'
htmlTemplate += '          }\n'
htmlTemplate += '        } else {\n'
htmlTemplate += '          token.ledOff(ledArray,\n'
htmlTemplate += '            completedFunction,  // function to be executed when token signals\n'
htmlTemplate += '            errorCallback  // function to be executed in case of failure to send command to token\n'
htmlTemplate += '          );\n'
htmlTemplate += '        }\n'
htmlTemplate += '      },\n'
htmlTemplate += '\n'
htmlTemplate += '      sendDisplayPatternCmd: function (token, pattern) {\n'
htmlTemplate += '        token.grid = pattern\n'
htmlTemplate += '\n'
htmlTemplate += '        var completedFunction = function (data) {\n'
htmlTemplate += '          hyper.log("We happily send the DISPLAYPATTERN command");\n'
htmlTemplate += '        };\n'
htmlTemplate += '\n'
htmlTemplate += '        var errorCallback = function (errorMsg) {\n'
htmlTemplate += '          hyper.log("Failed to send the DISPLAYPATTERN command");\n'
htmlTemplate += '        };\n'
htmlTemplate += '\n'
htmlTemplate += '        if(app.tokenVal.hasOwnProperty(token.id)) {\n'
htmlTemplate += '          if (app.tokenVal[token.id].includes(\'allowDisplayPattern\')) {\n'
htmlTemplate += '            token.displayPattern(pattern,\n'
htmlTemplate += '              completedFunction,  // function to be executed when token signals\n'
htmlTemplate += '              errorCallback  // function to be executed in case of failure to send command to token\n'
htmlTemplate += '            );\n'
htmlTemplate += '          }\n'
htmlTemplate += '        } else {\n'
htmlTemplate += '          token.displayPattern(pattern,\n'
htmlTemplate += '            completedFunction,  // function to be executed when token signals\n'
htmlTemplate += '            errorCallback  // function to be executed in case of failure to send command to token\n'
htmlTemplate += '          );\n'
htmlTemplate += '        }\n'
htmlTemplate += '      },\n'
htmlTemplate += '\n'
htmlTemplate += '      sendDisplayTextCmd: function (token, text) {\n'
htmlTemplate += '\n'
htmlTemplate += '        var completedFunction = function (data) {\n'
htmlTemplate += '          hyper.log("We happily send the MATRIXTEXT command");\n'
htmlTemplate += '        };\n'
htmlTemplate += '\n'
htmlTemplate += '        var errorCallback = function (errorMsg) {\n'
htmlTemplate += '          hyper.log("Failed to send the MATRIXTEXT command");\n'
htmlTemplate += '        };\n'
htmlTemplate += '\n'
htmlTemplate += '        if(app.tokenVal.hasOwnProperty(token.id)) {\n'
htmlTemplate += '          if (app.tokenVal[token.id].includes(\'allowdDisplayText\')) {\n'
htmlTemplate += '            token.displayText(text, time,\n'
htmlTemplate += '              completedFunction,  // function to be executed when token signals\n'
htmlTemplate += '              errorCallback  // function to be executed in case of failure to send command to token\n'
htmlTemplate += '            );\n'
htmlTemplate += '          }\n'
htmlTemplate += '        } else {\n'
htmlTemplate += '          token.displayText(text,\n'
htmlTemplate += '            completedFunction,  // function to be executed when token signals\n'
htmlTemplate += '            errorCallback  // function to be executed in case of failure to send command to token\n'
htmlTemplate += '          );\n'
htmlTemplate += '        }\n'
htmlTemplate += '      },\n'
htmlTemplate += '\n'
htmlTemplate += '      sendCountCmd: function (token, num) {\n'
htmlTemplate += '\n'
htmlTemplate += '        var completedFunction = function (data) {\n'
htmlTemplate += '          hyper.log("We happily send the COUNT command");\n'
htmlTemplate += '        };\n'
htmlTemplate += '\n'
htmlTemplate += '        var errorCallback = function (errorMsg) {\n'
htmlTemplate += '          hyper.log("Failed to send the COUNT command");\n'
htmlTemplate += '        };\n'
htmlTemplate += '\n'
htmlTemplate += '        if(app.tokenVal.hasOwnProperty(token.id)) {\n'
htmlTemplate += '          if (app.tokenVal[token.id].includes(\'allowDisplayCount\')) {\n'
htmlTemplate += '            token.count(num,\n'
htmlTemplate += '              completedFunction,  // function to be executed when token signals\n'
htmlTemplate += '              errorCallback  // function to be executed in case of failure to send command to token\n'
htmlTemplate += '            );\n'
htmlTemplate += '          }\n'
htmlTemplate += '        } else {\n'
htmlTemplate += '          token.count(num,\n'
htmlTemplate += '            completedFunction,  // function to be executed when token signals\n'
htmlTemplate += '            errorCallback  // function to be executed in case of failure to send command to token\n'
htmlTemplate += '          );\n'
htmlTemplate += '        }\n'
htmlTemplate += '      },\n'
htmlTemplate += '\n'
htmlTemplate += '      // Command for calibrating token to printer type\n'
htmlTemplate += '      sendPaperSelectCmd: function (token, paperType) {\n'
htmlTemplate += '        var completedFunction = function (data) {\n'
htmlTemplate += '          hyper.log("We happily send the PAPERSELECT command");\n'
htmlTemplate += '        };\n'
htmlTemplate += '\n'
htmlTemplate += '        var errorCallback = function (errorMsg) {\n'
htmlTemplate += '          hyper.log("Failed to send the PAPERSELECT command");\n'
htmlTemplate += '        };\n'
htmlTemplate += '\n'
htmlTemplate += '        token.paperSelect(paperType,\n'
htmlTemplate += '          completedFunction,  // function to be executed when token signals\n'
htmlTemplate += '          errorCallback  // function to be executed in case of failure to send command to token\n'
htmlTemplate += '        );\n'
htmlTemplate += '      },\n'
htmlTemplate += '\n'
htmlTemplate += '      // Other methods\n'
htmlTemplate += '      next_panel: function () {\n'
htmlTemplate += '        $("#summary").hide();\n'
htmlTemplate += '        app.initiate();\n'
htmlTemplate += '      },\n'
htmlTemplate += '\n'
htmlTemplate += '      setId: function (token, id) {\n'
htmlTemplate += '        token.id = id\n'
htmlTemplate += '        app.sendLedOnCmd(token, tokenVal[token.id][0])\n'
htmlTemplate += '      },\n'
htmlTemplate += '\n'
htmlTemplate += '      getSector: function (token) {\n'
htmlTemplate += '        for (var key in this.devices){\n'
htmlTemplate += '          if (this.devices[key] == token){\n'
htmlTemplate += '            return this.devices[key].sector;\n'
htmlTemplate += '          }\n'
htmlTemplate += '        }\n'
htmlTemplate += '        return false;\n'
htmlTemplate += '      },\n'
htmlTemplate += '\n'
htmlTemplate += '      getRandomToken: function () {\n'
htmlTemplate += '        var obj_keys = Object.keys(app.devices);\n'
htmlTemplate += '        var ran_key = obj_keys[Math.floor(Math.random() *obj_keys.length)];\n'
htmlTemplate += '        return app.devices[ran_key];\n'
htmlTemplate += '      },\n'
htmlTemplate += '\n'
htmlTemplate += '      getRandomSector: function () {\n'
htmlTemplate += '        return app.sectorVals[Math.floor(Math.random() * app.sectorVals.length)]\n'
htmlTemplate += '      },\n'
htmlTemplate += '\n'
htmlTemplate += '\n'
htmlTemplate += '      getRandomGrid: function () {\n'
htmlTemplate += '        return app.grids[Math.floor(Math.random() * app.grids.length)]\n'
htmlTemplate += '      },\n'
htmlTemplate += '\n'
htmlTemplate += '      mathRandomInt: function (a, b) {\n'
htmlTemplate += '        if (a > b) {\n'
htmlTemplate += '          // Swap a and b to ensure a is smaller.\n'
htmlTemplate += '          var c = a;\n'
htmlTemplate += '          a = b;\n'
htmlTemplate += '          b = c;\n'
htmlTemplate += '        }\n'
htmlTemplate += '        return Math.floor(Math.random() * (b - a + 1) + a);\n'
htmlTemplate += '      },\n'
htmlTemplate += '\n'
htmlTemplate += '      getToken: function (id) {\n'
htmlTemplate += '        for (let key in this.devices) {\n'
htmlTemplate += '          if (this.devices[key].id == id) {\n'
htmlTemplate += '            return (this.devices[key])\n'
htmlTemplate += '          }\n'
htmlTemplate += '        }\n'
htmlTemplate += '      },\n'
htmlTemplate += '\n'
htmlTemplate += '      getGrid: function (token) {\n'
htmlTemplate += '        return token.grid\n'
htmlTemplate += '      },\n'
htmlTemplate += '\n'
htmlTemplate += '    };\n'
htmlTemplate += '  </script>\n'
htmlTemplate += '</head>\n'
htmlTemplate += '\n'
htmlTemplate += '<body ontouchstart="">\n'
htmlTemplate += '<div id="summary">\n'
htmlTemplate += '  <button type="button" class="black" onclick="app.discover()">\n'
htmlTemplate += '    Discover Bluetooth devices\n'
htmlTemplate += '  </button>\n'
htmlTemplate += '  <div id="tokens"></div>\n'
htmlTemplate += '  <button type="button" onclick="app.next_panel()" class="black" id="next" style="display: none;"> Next </button>\n'
htmlTemplate += '  <br>\n'
htmlTemplate += '</div>\n'
htmlTemplate += '<div id="main">\n'
htmlTemplate += '  <h1 id="title">Game Title</h1>\n'
htmlTemplate += '  <h1>Messages</h1>\n'
htmlTemplate += '\n'
htmlTemplate += '  <div id="messagediv">\n'
htmlTemplate += '    <p id="message1"></p>\n'
htmlTemplate += '    <p id="message2"></p>\n'
htmlTemplate += '    <p id="message3"></p>\n'
htmlTemplate += '  </div>\n'
htmlTemplate += '\n'
htmlTemplate += '  <div id="numberdiv">\n'
htmlTemplate += '    <p id="number1"></p>\n'
htmlTemplate += '    <p id="number2"></p>\n'
htmlTemplate += '    <p id="number3"></p>\n'
htmlTemplate += '  </div>\n'
htmlTemplate += '</div>\n'
htmlTemplate += '</body>\n'
htmlTemplate += '\n'
htmlTemplate += '<style>\n'
htmlTemplate += '  #messagediv {\n'
htmlTemplate += '    word-wrap: break-word;\n'
htmlTemplate += '  }\n'
htmlTemplate += '</style>\n'
htmlTemplate += '\n'
htmlTemplate += '</html>\n'

export default htmlTemplate
