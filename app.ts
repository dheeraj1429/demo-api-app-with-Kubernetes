import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/demo-api-data", (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: "done this is working..." });
});

app.post("/task", (req: Request, res: Response, next: NextFunction) => {
  const { task } = req.body;

  if (task) {
    fs.writeFile(
      path.join(__dirname, "task.txt"),
      task,
      "utf8",
      (err: NodeJS.ErrnoException | null) => {
        if (err) {
          console.log(err);
        }
        return res.status(200).json({ message: "done" });
      }
    );
  } else {
    return res.status(500).json({ message: "Task is required!" });
  }
});

app.get("/get-task", (req: Request, res: Response, next: NextFunction) => {
  fs.readFile(
    path.join(__dirname, "task.txt"),
    "utf-8",
    (err: NodeJS.ErrnoException | null, data: string) => {
      if (err) {
        console.log(err);
      }
      return res.status(200).json({ message: data });
    }
  );
});

app.listen(port, () => {
  console.log("listening on port " + port);
});
