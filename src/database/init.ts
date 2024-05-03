import UserModel from "../models/UserModel";

import Db from "./index"

const DbInitializer = async () => {
    try {
        await Db.authenticate();
        UserModel.sync({ alter: false})
        console.log('Connection to database initialized');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export default DbInitializer;