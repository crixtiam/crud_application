const {MongoClient} = require('mongodb');

async function main(){
    
    const uri = "mongodb+srv://udea2022:Udea2022@cluster0.ceftqie.mongodb.net/test?retryWrites=true&w=majority";
    

    const client = new MongoClient(uri);
 
    try {
        // Connect to the MongoDB cluster
        await client.connect(); 
 
        await deleteListingByName(client, "Cozy Cottage");
        // Make the appropriate DB calls
       // await  listDatabases(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function deleteListingByName(client, nameOfListing) {
   
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").deleteOne({ name: nameOfListing });
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
}