const express = require("express"); 
const mongoose = require("mongoose"); 
const bodyParser = require("body-parser");
const cors = require("cors"); 
const dotenv = require("dotenv");   
const app = express();
require("dotenv").config();
const {User} = require("./model/users"); //use for app. part 

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;
mongoose.connect(URL, {});

const connection = mongoose.connection; // MongoDB Connection
connection.once("open", () => {
  console.log("MongoDB Database Connection Successfull"); // Display in console if connection is successful
});

app.listen(PORT, () => {
  console.log(`Server is running on port number : ${PORT}`); // Dipaly in console if server is running
});

//------------------------------------------ Implementing API's in Router file -----------------------//
// user routes
const userRouter = require("./routes/userRoutes");
app.use("/user", userRouter);

//------------------------------------------- Directly Implementing API's in Server file ------------ //

//--------------- Get All -------------//
app.get("/getall", (req,res)=> {
  User.find()
  .then((user)=> {
    res.json(user);
  })
  .catch((err)=>{
    console.log(err);
  })

})

//---------------- Create user -------//
app.post("/add", (req, res) => {
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
})

//----------------- Update user ------//
app.put("/update/:id", async(req, res) => {
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
  
})

//----------- Delete user -----------//
app.delete("/delete/:id", async(req,res) => {
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
})

//------------ Get user by id----------//
app.get("/getone/:id", async(req, res) => {
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
})

//--------------- Search user----------//
app.get("/search", async(req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({
      status: false,
      message: "No search query provided!",
      data: undefined
    })
  }

  try{
    const users = await User.find({
      $or: [ 
        { First_Name: {$regex: query, $options: "i"} },
        { Last_Name: {$regex: query, $options: "i"} }
      ]
    });

    if(users.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No user found!",
        data: undefined
      })
    }

    res.status(200).json({
      status: true,
      message: "User fetched successfully!",
      data: users
    })
  }catch(err){
    res.status(500).json({
      status: false,
      message: "Error searching for user",
      data: undefined
    });
  }
})







  