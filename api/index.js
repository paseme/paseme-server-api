const { MongoClient } = require("mongodb");

const { customAlphabet } = require("nanoid");

export default async function(request, response) {

    try {

        const client = new MongoClient(process.env.MONGODB_URI);

        const nanoid = customAlphabet("012345abcd", 4); 

        const estabelecimento = request.query.e;

        await client.connect();

        const result = await client.db("paseme").collection(estabelecimento).insertOne({ 
            
            codigo: nanoid(), 
            
            tempo: new Date(), 
            
            trafego: {

                ip: request.headers["x-real-ip"],
        
                pais: request.headers["x-vercel-ip-country"],
        
                regiao: request.headers["x-vercel-ip-country-region"],
        
                cidade: request.headers["x-vercel-ip-city"],
        
            }, 
            
            atendido: false,
        
        })
        
        await client.close();

        return response.redirect(`https://paseme.github.io/paseme-web/?e=${estabelecimento}&id=${result.insertedId}`)

    }

    catch(erro) {

        return response.status(500).json({ 
            
            mensagem: "Houve um erro!" 
        
        });

    }

}
