const { MongoClient } = require("mongodb");

export default async function(request, response) {
    
    try {

        const client = new MongoClient(process.env.MONGODB_URI);

        await client.connect();

        const { esta } = request.query;

        const cursor = client.db("paseme").collection(esta).find({});

        const results = await cursor.toArray();

        await client.close();

        return response.status(200).json(results);

    }
    
    catch(erro) {

        return response.status(500).json({ 
            
            message: "Something is wrong!" 
        
        });

    }

}