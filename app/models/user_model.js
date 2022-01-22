
module.exports = (mongoose) => mongoose.model(
  "User",
  new mongoose.Schema({
    email: {
      type: String,
      required: true
    },
    password: String,
    // role: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Role"
    // }
  })
)