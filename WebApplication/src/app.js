const express = require('express');
const app = express();
var SerialPort = require("serialport");

var port = 3000;

var arduinoCOMPort = "COM6";


var arduinoSerialPort = new SerialPort(arduinoCOMPort, {  
  baudRate: 9600
});

var Readline = SerialPort.parsers.Readline; // make instance of Readline parser
var parser = new Readline();                // make a new parser to read ASCII lines
arduinoSerialPort.pipe(parser);    


  // called when there's new data incoming

arduinoSerialPort.on('open',function() {
  console.log('Serial Port ' + arduinoCOMPort + ' is opened.');
});

           

app.get('/', function (req, res) {

    return res.send('Working');
 
})

app.get('/:action', function (req, res) {
    
   var action = req.params.action || req.param('action');
    
    if(action == 'on'){
        arduinoSerialPort.write("w");
        return res.send('Led light is on!');
    } 
    if(action == 'off') {
        arduinoSerialPort.write("t");
        return res.send("Led light is off!");
    }
    if(action == 'read') {
      return parser.on('data', writeData = (data) => res.send(data));
  }
    return res.send('Action: ' + action);
 
});

app.listen(port, function () {
  console.log('Example app listening on port localhost:' + port + '!');
});

