const { MongoClient, ObjectId } = require("mongodb");

export default async function(request, response) {
    
    try {

        const client = new MongoClient(process.env.MONGODB_URI);

        const codigo = request.query.id;
        
        const estabelecimento = request.query.e;

        await client.connect();

        const result = client.db("paseme").collection(estabelecimento).findOne({

            "_id": ObjectId(codigo)

        });

        await client.close();

        return response.status(200).json(result);

    }
    
    catch(erro) {

        return response.status(500).json({ 
            
            mensagem: "Houve um erro!",

            falha: erro.message
        
        });

    }

}
