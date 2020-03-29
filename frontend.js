var ws = new WebSocket('ws://localhost:40510');

ws.onopen = function () {
    console.log('websocket is connected ...')
    ws.send('connected')
}

ws.onmessage = function (ev) {
    console.log(ev);
    if (ev.data != "connected") {
        var button = document.getElementById(ev.data)
        button.disabled = false
    }
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



//  this is where the where the math for drawing the svg is done, scaling is based on the DPadRadius variable

var DPadRadius = 200;
var DPadPadding = 20;
var DpadSlices = 4;

var DPadsvg = "";

var DPadDirections = ["Down", "Left", "Up", "Right"]
var DPadLabel = ["Down", "Surf Left", "Up", "Surf Right"]

for(var i = 0; i < DpadSlices; i++){
    var p1 = {
        x : Math.cos(Math.PI*2/DpadSlices * i) * DPadRadius + DPadRadius + DPadPadding,
        y : Math.sin(Math.PI*2/DpadSlices * i) * DPadRadius + DPadRadius + DPadPadding
    };
    
    var p2 = {
        x : Math.cos(Math.PI*2/DpadSlices * (i+1)) * DPadRadius + DPadRadius + DPadPadding,
        y : Math.sin(Math.PI*2/DpadSlices * (i+1)) * DPadRadius + DPadRadius + DPadPadding
    };
    
    var p4 = {
        x : Math.cos(Math.PI*2/DpadSlices * i) * (DPadRadius/2) + DPadRadius + DPadPadding,
        y : Math.sin(Math.PI*2/DpadSlices * i) * (DPadRadius/2) + DPadRadius + DPadPadding
    };
    
    var p3 = {
        x : Math.cos(Math.PI*2/DpadSlices * (i+1)) * (DPadRadius/2) + DPadRadius + DPadPadding,
        y : Math.sin(Math.PI*2/DpadSlices * (i+1)) * (DPadRadius/2) + DPadRadius + DPadPadding
    };
    
    
    DPadsvg += "<path d='M "+p1.x+" "+p1.y+" A "+DPadRadius+" "+DPadRadius+" 0 0 1 "+p2.x+" "+p2.y+"  L "+p3.x+" "+p3.y+" A "+DPadRadius/2+" "+DPadRadius/2+" 0 0 0 "+p4.x+" "+p4.y+"  z' fill='green' stroke='white' id=DPad"+DPadDirections[i]+"  onclick='alert(\""+DPadDirections[i]+"\")'/>";
    
}
// this is where the math for the text positioning is done. Again, based on the DPadRadius variable.
var cp1 = {
    x : Math.cos(Math.PI*2/DpadSlices * i) * DPadRadius + DPadRadius + DPadPadding,
    y : Math.sin(Math.PI*2/DpadSlices * i) * DPadRadius + DPadRadius + DPadPadding
};

var cp2 = {
    x : Math.cos(Math.PI*2/DpadSlices * (i+1)) * DPadRadius + DPadRadius + DPadPadding,
    y : Math.sin(Math.PI*2/DpadSlices * (i+1)) * DPadRadius + DPadRadius + DPadPadding
};

var cp4 = {
    x : Math.cos(Math.PI*2/DpadSlices * i) * (DPadRadius/2) + DPadRadius + DPadPadding,
    y : Math.sin(Math.PI*2/DpadSlices * i) * (DPadRadius/2) + DPadRadius + DPadPadding
};

var cp3 = {
    x : Math.cos(Math.PI*2/DpadSlices * (i+1)) * (DPadRadius/2) + DPadRadius + DPadPadding,
    y : Math.sin(Math.PI*2/DpadSlices * (i+1)) * (DPadRadius/2) + DPadRadius + DPadPadding
};

DPadsvg += "<text zIndex=\"-1\" transform=\"rotate(-45)\" x=0 y="+cp3.y*1.453125+" text-anchor=\"middle\" alignment-baseline=\"auto\">"+DPadLabel[0]+"</text>"
DPadsvg += "<text zIndex=\"-1\" transform=\"rotate(-45)\" x="+cp3.y*-0.46875+" y="+cp3.y+" text-anchor=\"middle\" alignment-baseline=\"auto\">"+DPadLabel[1]+"</text>"
DPadsvg += "<text zIndex=\"-1\" transform=\"rotate(-45)\" x=0 y="+cp3.y*0.53125+" text-anchor=\"middle\" alignment-baseline=\"auto\">"+DPadLabel[2]+"</text>"
DPadsvg += "<text zIndex=\"-1\" transform=\"rotate(-45)\" x="+cp3.y*0.46875+" y="+cp3.y+" text-anchor=\"middle\" alignment-baseline=\"auto\">"+DPadLabel[3]+"</text>"

// <text transform="rotate(-45)" x="-150" y="320" text-anchor="middle" alignment-baseline="auto">Surf Left</text>

DPadsvg = "<svg height='"+(DPadRadius*2 + DPadPadding*2)+"px' width='"+(DPadRadius*2 + DPadPadding*2)+"px' transform=\"rotate(45)\">" + DPadsvg + "</svg>";


function insertDPad() {
    console.log("hi, I'm inserting this svg thing. " + DPadsvg) 
    document.getElementById("DPad").insertAdjacentHTML("afterend", 
        DPadsvg); 
} 
window.addEventListener('DOMContentLoaded', (event) => {
    // console.log('DOM fully loaded and parsed');
    insertDPad()
});