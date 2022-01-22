
module.exports = (mongoose) => mongoose.model(
  "Role",
  new mongoose.Schema({
    name: String
  })
)