const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const ping = require('ping');
const nodeData = [
    {id:1, label:'Computer ', status:'up',ip:'192.168.1.97'},
    {id:2, label:'Iphone ', status:'up',ip:'192.168.1.139'},
]

function pingAnduupdate(){
  Object.values(nodeData).forEach((node)=>{
     ping.sys.probe(node.ip,(isAlive)=>{
      const updatedStatus = isAlive ? 'up': 'down'

      io.emit('nodeStatus',{
        id:node.id,
        status:updatedStatus,
        ip:node.ip,
        label:node.label
      })

     })
  })
}

pingAnduupdate()
setInterval(pingAnduupdate,5000)

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// io.on("connection", (socket) => {
//     console.log('A user connection')

//       socket.on('disconnect', ()=>{
//         console.log('A user Disconnection')
//       })

//       socket.emit('m','numchok Dev ')

// });
app.get('/numchok',(req,res)=>{
    console.log('Hello Numchok')
    res.send('สวัสดี นำโชค พัฒนา')
})

server.listen(5000,()=> console.log('Server is running on port 5000'))