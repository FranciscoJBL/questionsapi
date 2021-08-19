import ClientData from "../Entity/ClientData";
/**
 * Pool handler
 * 
 * This class can store and manage connections in a pool.
 */
export default class PoolHandler {
    
    poolHandler : Array<ClientData> = []

    getClientById(id: string) : ClientData|null {
        let client : ClientData|null = null;

        this.poolHandler.forEach(element => {
            if (element.id === id) {
                client = element;
            }
        });

        return client;
    }

    addNewClient(clientData: ClientData) : void {
        if (this.getClientById(clientData.id) === null) {
            this.poolHandler.push(clientData);
        }
    }
}