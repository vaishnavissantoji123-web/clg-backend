const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log("LOGIN:", email, password);

  if (email === "admin@gmail.com" && password === "123456") {
    return res.json({ message: "Login success" });
  }

  res.status(401).json({ message: "Invalid credentials" });
};

module.exports = { loginUser };