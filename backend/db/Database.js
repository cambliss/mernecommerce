const mongoose = require("mongoose");
const uri = process.env.MONGO_URI || "mongodb+srv://camblissworks:Cambliss123@cluster0.pk7ta.mongodb.net/camblissworks";

const connectDatabase = () => {
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`mongod connected with server: ${data.connection.host}`);
    });
};

module.exports = connectDatabase;
