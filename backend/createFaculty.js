require("dotenv").config();

const mongoose =
  require("mongoose");

const bcrypt =
  require("bcryptjs");

const Faculty =
  require("./module/Faculty");

mongoose.connect(
  process.env.MONGO_URI
);

const createFaculty =
  async () => {

    const hashedPassword =
      await bcrypt.hash(
        "123456",
        10
      );

    const faculty =
      new Faculty({

        name:
          "Rahul Sharma",

        email:
          "faculty@gmail.com",

        password:
          hashedPassword,

        department:
          "CS",

        subject:
          "MERN Stack",

      });

    await faculty.save();

    console.log(
      "Faculty Created"
    );

    process.exit();

  };

createFaculty();