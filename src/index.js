
const { io } = require("socket.io-client");

//  websocket server listening on 
const URL = "http://localhost:3000"

const socket = io.connect(URL)

// client receives response from server 
socket.on("search", (x) => {
    if ( x.error === undefined) {
        console.log( `(${x.page}/${x.resultCount}) ${x.name} - [${x.films}]`); //
    } else {
        console.log(`ERR: ${x.error}`)
    }
    if (x.page == x.resultCount) {
        console.log("what do you want to search? ")
    }
  });

// standard event 'error' is received
socket.on("error", () => {
    console.log(`-- client error ${socket.id}`); //
  });

// standard event 'connect'  is received  
socket.on("connect", () => {
    console.log(`-- client connected ${socket.id}`); // 
    console.log("what do you want to search? ")
  });
  
// standard event 'connect'  is received   
socket.on("disconnect", () => {
    console.log(`-- client disconnected ${socket.id}`); // 
    rl.close();
  });
    

// query using reading output given by the user  
var readline = require('readline');
var rl = readline.createInterface( process.stdin, process.stdout);

// event - user pressed 'Enter' 
rl.on('line', (input) => {
    if (input) {
        console.log(`Searching for ... ${input}`)
        // emits search event
        socket.emit("search", {query: input});
    } else {
        // user stops interaction
        socket.close();
    }
});
