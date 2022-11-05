const {MongoClient} = require('mongodb');

async function main(){
    
    const uri = "mongodb+srv://udea2022:Udea2022@cluster0.ceftqie.mongodb.net/test?retryWrites=true&w=majority"
    

    const client = new MongoClient(uri);
 
    try {
        // Connect to the MongoDB cluster
        await client.connect(); 
        await updateAllListingsToHavePropertyType(client)
 
        // Make the appropriate DB calls
       // await  listDatabases(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function updateAllListingsToHavePropertyType(client) {
   
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").updateMany({ property_type: { $exists: false } }, { $set: { property_type: "Unknown" } });
    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
}