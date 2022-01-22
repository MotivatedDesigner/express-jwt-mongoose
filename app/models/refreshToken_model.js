
module.exports = (mongoose) => mongoose.model(
  "RefreshToken",
  new mongoose.Schema({
    token: String,
    isValid: {
      type: Boolean,
      default: true 
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  })
)
