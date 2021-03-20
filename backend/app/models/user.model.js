module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name: String,
        username: String,
        password: String
      },
      { timestamps: true }
    );
  
    const user = mongoose.model("users", schema);
    return user;
  };