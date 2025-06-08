import express, { Application, Response, Request } from "express";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";
import Routes from "./routes/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));


app.use(Routes)

app.get("/", async (req: Request, res: Response) => {
  // const html = await ejs.renderFile(__dirname)
  // return res.render("emails/welcome", { name : "rahul kanyal"});

  await emailQueue.add(emailQueueName, {name:"rahul kanyal", age:21})
});


// queues import kar rahe hai 
import "./jobs/index.js";
import { emailQueue, emailQueueName } from "./jobs/EmailJob.js";

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});




