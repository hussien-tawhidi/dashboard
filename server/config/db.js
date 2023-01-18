import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://hussien:Sultani_98@cluster0.ptfvqvv.mongodb.net/dashboard?retryWrites=true&w=majority"
    );

    console.log(`DB CONNECT`);
  } catch (err) {
      console.log(`NOT CONNECT _ ${err}`)
      process.exit(1)
  }
};


export default connectDB