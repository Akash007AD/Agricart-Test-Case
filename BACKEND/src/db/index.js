import mongoose from "mongoose";
import { DB_NAME_Stocks, DB_NAME_Customer ,DB_NAME_Farmer,DB_NAME_Order,DB_NAME_Deliverypartner,DB_NAME_Cart} from "../constants.js";

const connectDB = async () => {
    try {
        // Connecting to the Stocks database
        const connectionInstanceStocks = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME_Stocks}`);
        console.log(`\nStocks Database connected!! DB HOST: ${connectionInstanceStocks.connection.host}`);

        // Create a new connection for the Customer database
        const connectionInstanceCustomer = mongoose.createConnection(`${process.env.MONGODB_URI}/${DB_NAME_Customer}`);
        console.log(`\nCustomer Database connected!! `);

        // Create a new connection for the Farmer database
        const connectionInstanceFarmer = mongoose.createConnection(`${process.env.MONGODB_URI}/${DB_NAME_Farmer}`);
        console.log(`\nFarmer Database connected!! `);

        // Create a new connection for the order database
        const connectionInstanceOrder = mongoose.createConnection(`${process.env.MONGODB_URI}/${DB_NAME_Order}`);
        console.log(`\nOrder Database connected!! `);
        
        // Create a new connection for the order database
        const connectionInstanceDeliveryPartner = mongoose.createConnection(`${process.env.MONGODB_URI}/${DB_NAME_Deliverypartner}`);
        console.log(`\nDelivery Partner Database connected!! `);

        // Create a new connection for the order database
        const connectionInstanceCart = mongoose.createConnection(`${process.env.MONGODB_URI}/${DB_NAME_Cart}`);
        console.log(`\nCart Partner Database connected!! `);

        // Optionally return connections if needed for further use
        return { connectionInstanceStocks, connectionInstanceCustomer,connectionInstanceFarmer,connectionInstanceOrder,connectionInstanceDeliveryPartner,connectionInstanceCart};
        
    } catch (error) {
        console.log("MONGODB connection FAILED for one or more databases", error);
        process.exit(1);
    }
};

export default connectDB;
