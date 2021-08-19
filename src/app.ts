import express from 'express';
import { createServer } from "http";
import { Server } from 'socket.io';
import ClientData from './Entity/ClientData';
import PoolHandler from './Util/PoolHandler';
import { manageResponse, requestMessage } from './Util/ResolutionHandler';

const app = express();
const port = 3001;

app.get('/add-question/:question/:expects/:position', function (req, res) {
    console.log(req.params);
    res.send('POST request to the homepage');
  });


const httpServer = createServer(app);
const pool = new PoolHandler();
/**
 * Set this as cross site origin measure
 */
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

/**
 * Call when there is a client connected.
 */
io.on("connection", (socket) => {
    console.log("conected " + socket.id);
    /**
     * If a new client connect, add his profile to the pool
     */
    if (! pool.getClientById(socket.id)) {
        let clientData : ClientData = {
            id : socket.id,
            optionTreePosition : {
                completedPositions : 0,
                userEvents : []
            }
        }

        pool.addNewClient(clientData);

        io.to(socket.id).emit(
            'question', 
            requestMessage(null)
        );
    }

    /**
     * Manage incoming response from the client, with the selected option
     */
    socket.on("message", (message: { value: string; }) => {
        console.log(message);
        let clientData = pool.getClientById(socket.id);

        if (clientData !== null) {
            manageResponse(clientData, message.value);
            let currentUserPosition = clientData
                .optionTreePosition
                .completedPositions;
            
            io.to(socket.id).emit(
                'question', 
                requestMessage(currentUserPosition)
            );
        } else {
            io.to(socket.id).emit(
                'question', 
                'Why are you here?'
            );
        }
    });
});

httpServer.listen(port);