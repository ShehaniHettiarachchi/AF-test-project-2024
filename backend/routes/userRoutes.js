const express = require("express");
const router = express.Router();
const {User} = require("../model/users");

// ----- Insert new user -----//
http: router.route("/add").post((req, res)=> {
    const First_Name = req.body.First_Name;
    const Last_Name = req.body.Last_Name;
    const Address = req.body.Address;
    const Email = req.body.Email;
    const Contact_Number = req.body.Contact_Number;

    const NewUser = new User({
        First_Name,
        Last_Name,
        Address,
        Email,
        Contact_Number
    });

    NewUser.save()
    .then(() => {
        res.json("User Added Successfully!")
    })
    .catch((err)=>{
        console.log(err);
    });
});

//---- View all users -------//
http: router.route("/").get((req, res)=> {
    User.find()
    .then((user)=> {
        res.json(user);
    })
    .catch((err)=> {
        console.log(err);
    })
});

//---- Update user details ---//
http: router.route("/update/:id").put(async (req, res)=> {
    let userID = req.params.id;

    //destructure
    const {
        First_Name,
        Last_Name,
        Address,
        Email,
        Contact_Number
    } = req.body;

    const updateUser = {
        First_Name,
        Last_Name,
        Address,
        Email,
        Contact_Number
    };

    const update = await User.findByIdAndUpdate(userID, updateUser)
    .then(() => {
        res.status(200).send({status: "User Updated Successfully!"});
    })
    .catch((err) => {
        console.log(err);
        res
         .status(500)
         .send({ status: "Error with updating details!", error:err.message });
    });
});

//------- Delete user ----------//
http: router.route("/delete/:id").delete(async (req, res)=> {
    let userID = req.params.id;

    await User.findByIdAndDelete(userID)
    .then (() => {
        res.status(200).send({status: "User Deleted Successfully!"});
    })
    .catch((err)=> {
        console.log(err);
        res
        .status(500)
        .send({status: "Error with deleting details!", error:err.message});
    });
});

//------ Get details from one user -----//
http: router.route("/get/:id").get(async (req, res) => {
    let userID = req.params.id;

    const user = await User.findById(userID)
    .then ((user) => {
        res.json(user)
        res.status(200)
    })
    .catch ((err)=> {
        console.log(err);
        res
        .status(500)
        .send({status: "Error with get user", error:err.message});
    });
});

// ------- Search User --------------------//
http: router.get("/search", async (req, res) => {
    const { query } = req.query;

    if(!query) {
        return res.status(400).json({
            status: false,
            message: "No search query provided!",
            data: undefined
        });
    }
    try{
        const users = await User.find({
            $or: [
                { First_Name: {$regex: query, $options: "i" } },
                { Last_Name: {$regex: query, $options: "i" } },
            ]
        });

        if (users.length === 0) {
            return res.status(404).json({
                status: false,
                message: "No user found!",
                data: undefined
            });
        }

        res.status(200).json({
            status: true,
            message: "supplier fetched successfully!",
            data: users
        });
    } catch(err){
        res.status(500).json({
            status: false,
            message: "Error searching for user!",
            data: undefined
        });
    }
})

module.exports = router;