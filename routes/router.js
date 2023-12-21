const express = require("express");
const router = express.Router();
const users = require("../models/userSchema")

// create user

router.post("/register", async (req, res) => {
    const { name, age, work, mobile, email, add, desc } = req.body

    if (!name || !age || !work || !mobile || !email || !add || !desc) {
        res.status(400).json("plz fill the data")
        console.log("plz fill data")
    }else{

    try {

        const preuser = await users.findOne({email : email})
        console.log(preuser)

        if(preuser){
            res.status(403).json("this is user is already exist")
        }else{
            const adduser = await new users({
                name, age, work, mobile, email, add, desc
            });
            await adduser.save();
            res.status(201).json(adduser)
            console.log(adduser)
        }

    } catch (error) {
        res.status(422).json(error)
    }
}

});

// get all user data

router.get("/getdata", async(req,res)=>{
    try {
        const userdata = await users.find();
        res.status(200).json(userdata)
    } catch (error) {
        res.status(422).json("error")
    }
});

// get individual user
router.get("/getuser/:id", async(req,res)=>{
try {
    const {id} = req.params;
    const userindividual = await users.findById({_id : id})
    
    if(userindividual){
        
        res.status(200).json(userindividual)
    }else{
        res.status(200).json({message : "user not avalabel"})
    }
} catch (error) {
    res.status(422).json("user not found")
}
})



// update individual user
router.patch("/updateuser/:id", async(req,res)=>{
    try {
        const {id} = req.params;
        const updateduser = await users.findByIdAndUpdate(id,req.body,{new : true})
       
        if(updateduser){
           res.status(200).json(updateduser)
        }else{
            res.status(200).json({message : "this data not avalabel or unabel to update or Fake id"})
        }
    } catch (error) {
        res.status(422).json("user not update")
    }
    })



    // delete user
    router.delete("/deleteuser/:id", async(req,res)=>{
        try {
            const {id} = req.params;
            const deleteuser = await users.findByIdAndDelete({_id : id})
        
            if(deleteuser){
                res.status(200).json(deleteuser)
            }else{
                res.status(200).send({message : "user not avalabel or Already deleted"})
            }
        } catch (error) {
            res.status(422).json("user not delete")
        }
    })

module.exports = router