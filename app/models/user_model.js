
module.exports = (mongoose) => mongoose.model(
  "User",
  new mongoose.Schema({
    email: String,
    password: String,
    // role: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Role"
    // }
  })
)