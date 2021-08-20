import express from 'express';
import { createServer } from "http";
import { Server } from 'socket.io';
import ClientData from './Entity/ClientData';
import PoolHandler from './Util/PoolHandler';
import { manageResponse, requestMessage } from './Util/ResolutionHandler';
import {questions, createSampleMessages} from './Assets/Messages';

/**
 * Create our base app.
 */
const app = express();

/**
 * Port definition.
 */
const port = 3001;

/**
 * Init the base route for add new messages.
 */
app.get('/add-question/:question/:expects/:position', function (req, res) {
    console.log(req.params);
});

/**
 * Create our http server
 */
const httpServer = createServer(app);

/**
 * Create our pool handler.
 */
const pool = new PoolHandler();

/**
 * If there is not custom questions provided, the api will create sample ones for you.
 */
if (questions.length === 0) {
    createSampleMessages();
}

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
        /**
         * Send the default welcome message
         */
        io.to(socket.id).emit(
            'question', 
            requestMessage(null)
        );
    }

    /**
     * Manage incoming response from the client, with the selected option
     */
    socket.on("message", (message: { value: string; }) => {
        let clientData = pool.getClientById(socket.id);

        // If we found the client profile, manage the response and send another question
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
            /**
             * This case should never happen, but by inference we need to be aware of the case 
             * when getClientById returns null
             */
            io.to(socket.id).emit(
                'question', 
                'Why are you here?'
            );
        }
    });
});

/**
 * Listen on the defined port.
 */
httpServer.listen(port);