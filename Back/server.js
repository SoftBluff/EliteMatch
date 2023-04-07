import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
//import dummyUserRoutes from "./routes/dummyUserRoutes.js";
import express from "express";



const app = express();  

app.use(cors());
app.use(express.json());
//app.use(dummyUserRoutes);
app.use(userRoutes);
const PORT = process.env.PORT || 8080;



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
    });
