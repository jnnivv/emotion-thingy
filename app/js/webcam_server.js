const sys = require('util')
const ws = require('ws').Server
    
const server = new ws({
  port: 9000
})

clients = []

server.on("connection", function(websocket) {
    clients.push(websocket)
    
    websocket.on("message", function(data) {
        for (var i = 1; i < clients.length; i++) {
           clients[i].send(data)
        }
    })
    
    websocket.on('close', function() {
        
        for (var i = 0; i < clients.length; i++) {
            if (clients[i] == websocket) {
                clients.splice(i)
                break
            }
        }
    })
})
