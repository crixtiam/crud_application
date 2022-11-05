const {MongoClient} = require('mongodb')

uri = "mongodb+srv://udea2022:Udea2022@cluster0.ceftqie.mongodb.net/test?retryWrites=true&w=majority"

const client = new MongoClient(uri)


async function main(){
    try {
        await client.connect()
        //await updateListingByName(client, "Infinite Views", { bedrooms: 6, beds: 8 });
        await upsertListingByName(client, "Infinite Views", { name: "Infinite Views",bedrooms: 6, beds: 8 })
                
    } catch (e) {
        console.log(e)
    }finally{
        await client.close()
    }
}

main().catch(console.error)


async function upsertListingByName(client, nameOfListing, updatedListing) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").updateOne({ name: nameOfListing }, { $set: updatedListing },{upsert:true});

    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    //console.log(`${result.modifiedCount} document(s) was/were updated.`);

    if (result.upsertedCount > 0){
        console.log(`one document was inserted with the id ${result.upsertId}`)
    }else{
        console.log(`${result.modifiedCount} documents that was/were updated`)
    }
}