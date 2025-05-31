import express, { Application, Response, Request } from "express";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));



app.get("/", async (req: Request, res: Response) => {
  const html = await ejs.renderFile(__dirname)
  return res.render("emails/welcome", { name : "rahul kanyal"});
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});