const {MongoClient} = require("mongodb");

module.exports={
    selectedDb: {},
    async connect(){
        try{
            const client = await MongoClient.connect(process.env.MONGO_URL);
            this.selectedDb = client.db("hallbooking");
        }catch(err){
            console.log(err);
        }
    }
}