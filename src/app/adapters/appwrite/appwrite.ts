import { Client, Account, ID, Teams } from "appwrite";

const client = new Client();

client.setEndpoint('http://localhost/v1').setProject('6586813ec987ba9d6605');
const account = new Account(client);
const teams = new Teams(client);

export { client, account, ID, teams }
