let cachedDb: any;

import { Db, MongoClient } from "mongodb";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "src/config.service";


@Injectable()
export class MongoService {

    constructor(private config:ConfigService){}

    /* --------------------- Initialization(Factory Pattern) -------------------- */
    async connectToDatabase(): Promise<Db> {
        if (cachedDb) return cachedDb;

        // Connect to our MongoDB database hosted on MongoDB Atlas
        const client = await MongoClient.connect(this.config.get("mongoUrl"));

        // Specify which database we want to use
        const db = await client.db(this.config.get("dbName"));
        cachedDb = db;
        console.log("connected To Database");
        return db;
    }

}

