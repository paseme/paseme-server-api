const { MongoClient, ObjectId } = require("mongodb");

export default async function(request, response) {
    
    if (request.method == "GET") {

        try {

            const client = new MongoClient(process.env.MONGODB_URI);

            await client.connect();

            const { esta, id } = request.query;

            const result = await client.db("paseme").collection(esta).findOne({

                "_id": new ObjectId(id)

            });

            await client.close();

            return response.status(200).json(result);

        }
        
        catch(erro) {

            return response.status(500).json({ 
                
                message: "Something is wrong!" 
            
            });

        }

    }

    else if (request.method == "PUT") {

        return response.status(400).json({ 
                
            message: "Under construction!" 
        
        });

    }

    else if (request.method == "DELETE") {

        return response.status(400).json({ 
                
            message: "Under construction!" 
        
        });

    }

}