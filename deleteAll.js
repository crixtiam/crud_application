const {MongoClient} = require('mongodb');

async function main(){
    
    const uri = "mongodb+srv://udea2022:Udea2022@cluster0.ceftqie.mongodb.net/test?retryWrites=true&w=majority";
    

    const client = new MongoClient(uri);
 
    try {
        // Connect to the MongoDB cluster
        await client.connect(); 
 
        await deleteListingsScrapedBeforeDate(client, new Date("2019-02-15"));
        // Make the appropriate DB call
       // await  listDatabases(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function deleteListingsScrapedBeforeDate(client, date) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").deleteMany({ "last_scraped": { $lt: date } });
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
}