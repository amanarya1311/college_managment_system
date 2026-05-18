require("dotenv").config();

const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const Admin = require("./models/Admin");

mongoose.connect(process.env.MONGO_URI)

.then(async () => {

  console.log("MongoDB Connected");

  const hashedPassword =
    await bcrypt.hash("123456", 10);

  const existingAdmin =
    await Admin.findOne({
      email: "buddy@gmail.com",
    });

  if (existingAdmin) {

    console.log(
      "Admin already exists"
    );

    process.exit();

  }

  await Admin.create({

    email: "buddy@gmail.com",

    password: hashedPassword,

  });

  console.log(
    "Admin created successfully"
  );

  process.exit();

})

.catch((error) => {

  console.log(error);

});