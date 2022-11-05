const {MongoClient} = require('mongodb')

uri = "mongodb+srv://udea2022:Udea2022@cluster0.ceftqie.mongodb.net/test?retryWrites=true&w=majority;"

const client = new MongoClient(uri)


async function main(){
    try {
        await client.connect()    
        //await findOneListingByName(client,"Ribeira Charming Duplex")
        await findListinWithMinimumBedroomsBathroomsAndMostRecentReviews(client,{
            minimumNumberOfBedrooms:4,
            minimumNumberOfBathrooms:2,
            maximumNumberOfResult:5
        })
    } catch (e) {
        console.log(e)
    }finally{
        await client.close()
    }
}

main().catch(console.error)


async function findOneListingByName(client,nameOfListing){
   const result = await client.db("sample_airbnb").collection("listingsAndReviews").findOne({name:nameOfListing})

   if (result){
        console.log(`Found a listin collection with the name ${nameOfListing}`)
        console.log(result)
   }else{
    console.log(`No listing found with the name ${nameOfListing}`)
    console.log(result)
   }
}


async function findListinWithMinimumBedroomsBathroomsAndMostRecentReviews(client,{
    minimumNumberOfBedrooms = 0,
    minimumNumberOfBathrooms = 0,
    maximumNumberOfResult = Number.MAX_SAFE_INTEGER
    
}={}){
    const cursor = client.db("sample_airbnb").collection("listingsAndReviews").find({
        bedrooms:{$gte:minimumNumberOfBedrooms},
        bathrooms:{$gte:minimumNumberOfBathrooms},

    }).sort({last_review:-1})
    .limit(maximumNumberOfResult)

    const result = await cursor.toArray();

    if(result.length>0){
        console.log(`found listing with at least ${minimumNumberOfBedrooms} bedrooms and ${minimumNumberOfBathrooms} bathrooms`)
        result.forEach((result,i)=>{
            date = new Date(result.last_review).toDateString();
            console.log();
            console.log(`${i+1} name ${result.name}`)
            console.log(`id ${result._id}`);
            console.log(`bedrooms ${result.bedrooms}`);
            console.log(`bathrooms ${result.bathrooms}`);
            console.log(`most recent review ${new Date(result.last_review)}`)       

        });
    }else{
        console.log(`Not found listing with minimun bedrooms ${bedrooms} and bathrooms ${bathrooms}`)
    }

}