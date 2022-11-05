const {MongoClient} = require('mongodb');

async function main(){
    const uri = "mongodb+srv://udea2022:Udea2022@cluster0.ceftqie.mongodb.net/test?retryWrites=true&w=majority";
    
    const client = new MongoClient(uri);

    try{
        await client.connect()
        await listDatabases(client);
    }catch(e){
        console.log(e)
    }finally{
        await client.close();
    }

}


main().catch(console.error)


//create a function

async function listDatabases(client){
    const databasesList = await client.db().admin().listDatabases();

    console.log("my databases")

    databasesList.databases.forEach(db => {
        console.log(`-${db.name}`);
        
    });
}