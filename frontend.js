var ws = new WebSocket('ws://localhost:40510');

ws.onopen = function () {
    console.log('websocket is connected ...')
    ws.send('connected')
}

ws.onmessage = function (ev) {
    console.log(ev);
}

disableButton = function (buttonId) {
    var x = document.getElementById(buttonId)
    x.disabled = true
}