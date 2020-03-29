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