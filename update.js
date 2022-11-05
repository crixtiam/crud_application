const {MongoClient} = require('mongodb')

uri = "mongodb+srv://udea2022:Udea2022@cluster0.ceftqie.mongodb.net/test?retryWrites=true&w=majority"

const client = new MongoClient(uri)


async function main(){
    try {
        await client.connect()
        await updateListingByName(client, "Infinite Views", { bedrooms: 6, beds: 8 });
                
    } catch (e) {
        console.log(e)
    }finally{
        await client.close()
    }
}

main().catch(console.error)


async function updateListingByName(client, nameOfListing, updatedListing) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").updateOne({ name: nameOfListing }, { $set: updatedListing },{multi:true});

    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
}