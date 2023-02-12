const { MongoClient } = require("mongodb");

export default async function(request, response) {
    
    try {

        const client = new MongoClient(process.env.MONGODB_URI);

        const estabelecimento = request.query.e;

        await client.connect();

        const cursor = client.db("paseme").collection(estabelecimento).find({});

        const results = await cursor.toArray();

        await client.close();

        return response.status(200).json(results);

    }
    
    catch(erro) {

        return response.status(500).json({ 
            
            mensagem: "Houve um erro!" 
        
        });

    }

}