const app = require("./src/app")
const connectDB = require("./src/DB/db")

connectDB();

app.listen(8000, () => {
    console.log("Server is running on http://localhost:8000");
});