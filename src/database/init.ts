import UserModel from "../models/UserModel";

import Db from "./index"

const DbInitializer = async () => {
    try {
        await Db.authenticate();
        UserModel.sync({ alter: false})
        const result = await Db.query("SELECT 'connected'");
        console.log('Connection to database initialized', result);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export default DbInitializer;