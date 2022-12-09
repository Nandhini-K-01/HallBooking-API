const mongo = require("./connect");


//Creating a room
module.exports.createRoom= async (req,res,next)=>{
    try{
        const insertedResponse = await mongo.selectedDb.collection("room").insertOne({...req.body})
        res.send(insertedResponse);
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
}


//Room Booking
module.exports.roomBooking = async (req,res,next) => {
    const alreadyExists = await mongo.selectedDb.collection("bookeddata").find({
        $and:[
            {"room_id": req.body.room_id},
            {"Date": req.body.Date},
            {"start_time":req.body.start_time},
            {"end_time": req.body.end_time}
        ]
    }).toArray();
    // console.log(alreadyExists)
    if(alreadyExists.length>0){
        res.send({msg: "This room is already booked"})
    }else{
        try{
            const insertData = await mongo.selectedDb.collection("bookeddata").insertOne({...req.body})
            res.send(insertData)
        }catch(err){
            console.log(err);
            res.status(500).send(err);
        }
    }
}
//Listing all rooms with booked data
module.exports.allRoomsBookedData = async (req,res,next) => {
    try{
        const response = await mongo.selectedDb.collection("room").aggregate([
            {
                $lookup:{
                    from: "bookeddata",
                    localField: "room_id",
                    foreignField: "room_id",
                    as: "rooms_booked_data"
                }
            }
        ]).toArray();
        res.send(response)
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}

//Listing all customers with booked data
module.exports.customersData = async (req,res,next) => {
    try{
        const response = await mongo.selectedDb.collection("bookeddata").aggregate([
            {
                $lookup:{
                    from: "room",
                    localField: "room_id",
                    foreignField: "room_id",
                    as: "customers_room_data"
                }
            }
        ]).toArray();
        res.send(response)
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}