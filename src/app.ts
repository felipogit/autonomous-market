import express, { Application } from "express"
import logics from "./logics";
import { json } from "body-parser";
import middlewares from "./middlewares";

const app: Application = express();
app.use(json());

app.post("/products", middlewares.nameExists, logics.create)

app.get("/products", logics.read)
app.get("/products/:id", middlewares.idExists, logics.retrieve)
app.delete("/products/:id", middlewares.idExists, logics.destroy)

app.patch("/products/:id", middlewares.nameExists, middlewares.idExists, logics.partialUpdate)

const PORT: number = 3000;
app.listen(PORT, (): void => {
    console.log(`Application is running on port: ${PORT}`)
})