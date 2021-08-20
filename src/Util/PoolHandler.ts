import ClientData from "../Entity/ClientData";
/**
 * Pool handler
 * 
 * This class can store and manage connections in a pool.
 */
export default class PoolHandler {
    /**
     * Conection pool.
     */
    poolHandler : Array<ClientData> = []

    /**
     * Get a client from a given id
     */
    getClientById(id: string) : ClientData|null {
        let client : ClientData|null = null;

        this.poolHandler.forEach(element => {
            if (element.id === id) {
                client = element;
            }
        });

        return client;
    }

    /**
     * Add a new client if not exists.
     */
    addNewClient(clientData: ClientData) : void {
        if (this.getClientById(clientData.id) === null) {
            this.poolHandler.push(clientData);
        }
    }
}