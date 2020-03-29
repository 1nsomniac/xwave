var ws = new WebSocket('ws://localhost:40510');

ws.onopen = function () {
    console.log('websocket is connected ...')
    ws.send('connected')
}

ws.onmessage = function (ev) {
    console.log(ev);
    var button = document.getElementById(ev.data)
    button.disabled = false
}

disableButton = function (buttonId) {
    var x = document.getElementById(buttonId)
    x.disabled = true
}

awaitResponse = function (buttonId) {
    var button = document.getElementById(buttonId)
    button.disabled = true
    ws.send(buttonId)
}


var RADIUS = 200;
var PADDING = 20;
var SLICES = 4;

var DPadsvg = "";

for(var i = 0; i < SLICES; i++){
    var p1 = {
        x : Math.cos(Math.PI*2/SLICES * i) * RADIUS + RADIUS + PADDING,
        y : Math.sin(Math.PI*2/SLICES * i) * RADIUS + RADIUS + PADDING
    };
    
    var p2 = {
        x : Math.cos(Math.PI*2/SLICES * (i+1)) * RADIUS + RADIUS + PADDING,
        y : Math.sin(Math.PI*2/SLICES * (i+1)) * RADIUS + RADIUS + PADDING
    };
    
    var p4 = {
        x : Math.cos(Math.PI*2/SLICES * i) * (RADIUS/2) + RADIUS + PADDING,
        y : Math.sin(Math.PI*2/SLICES * i) * (RADIUS/2) + RADIUS + PADDING
    };
    
    var p3 = {
        x : Math.cos(Math.PI*2/SLICES * (i+1)) * (RADIUS/2) + RADIUS + PADDING,
        y : Math.sin(Math.PI*2/SLICES * (i+1)) * (RADIUS/2) + RADIUS + PADDING
    };
    
    
    DPadsvg += "<path d='M "+(RADIUS+PADDING)+" "+(RADIUS+PADDING)+" L "+p3.x+" "+p3.y+" A "+(RADIUS/2)+" "+(RADIUS/2)+" 0 0 0 "+p4.x+" "+p4.y+" z' fill='none' stroke='white' onclick='alert(\"inner-"+i+"\")'/>";
    
    DPadsvg += "<path d='M "+p1.x+" "+p1.y+" A "+RADIUS+" "+RADIUS+" 0 0 1 "+p2.x+" "+p2.y+"  L "+p3.x+" "+p3.y+" A "+RADIUS/2+" "+RADIUS/2+" 0 0 0 "+p4.x+" "+p4.y+"  z' fill='green' stroke='white' onclick='alert(\"outer-"+i+"\")'/>";
}

DPadsvg = "<svg height='"+(RADIUS*2 + PADDING*2)+"px' width='"+(RADIUS*2 + PADDING*2)+"px' transform=\"rotate(45)\">" + DPadsvg + "</svg>";


function insertDPad() {
    console.log("hi, I'm inserting this svg thing. " + DPadsvg) 
    document.getElementById("DPad").insertAdjacentHTML("afterend", 
        DPadsvg); 
} 
window.addEventListener('DOMContentLoaded', (event) => {
    // console.log('DOM fully loaded and parsed');
    insertDPad()
});