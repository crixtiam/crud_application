const {MongoClient} = require('mongodb');


async function main(){
    uri = "mongodb+srv://udea2022:Udea2022@cluster0.ceftqie.mongodb.net/test?retryWrites=true&w=majority";
    
    const client = new MongoClient(uri)
    try {
        await client.connect();

        /*
        await createListing(client,{
            name:"Lovely love",
            summary: "A charming",
            bedrooms:1,
            bathrooms: 1
        })*/

        await createMultiplyListing(client,[
            {
            name:"Lovely love 2",
            summary: "A charming",
            bedrooms:1,
            bathrooms: 1

            },
            {
            name:"Lovely love 3",
            summary: "A charming",
            bedrooms:1,
            bathrooms: 1
            }
        ])
        
    } catch (e) {
        console.log(e)
    }finally{
        await client.close()
        
    }
}

main().catch(console.error)

async function createListing(client,newListing){
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing)
    console.log(`new listing id ${result.insertedId}`)
}


async function createMultiplyListing(client,newListing){
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertMany(newListing)

    console.log(`${result.insertedCount} new listing `)

    console.log(result.insertedIds)

}