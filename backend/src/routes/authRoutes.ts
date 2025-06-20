import { Router, Response, Request } from "express";
import { registerSchema } from "../validation/authValidations.js";
import { ZodError } from "zod";
import { formatError, renderEmailEjs } from "../helper.js";
import prisma from "../config/database.js"
import { v4 as uuidv4 } from "uuid";

import bcrypt from "bcrypt";
import { emailQueue, emailQueueName } from "../jobs/EmailJob.js";
const router = Router();

router.post("/register",  async (req: Request, res: Response) : Promise<any> => {
  try {
    const body = req.body;
    const payload = registerSchema.parse(body);
    let user = await prisma.user.findUnique({
      where: { email: payload.email },
    });
    if (user) {
      return res.status(422).json({
        errors: {
          email: "Email already taken.please use another one.",
        },
      });
    }
    //   * Encrypt the password
    const salt = await bcrypt.genSalt(10);
    payload.password = await bcrypt.hash(payload.password, salt);

    const id = generateRandomNum();
    const token = await bcrypt.hash(id, salt);
    const url = `${process.env.APP_URL}/verify/email/?email=${payload.email}&token=${token}`;

    const html = await renderEmailEjs("verify-email", {
      name: payload.name,
      url: url,
    });
    await emailQueue.add(emailQueueName, {
      to: payload.email,
      subject: "Please verify your email Clash",
      html: html,
    });
    await prisma.user.create({
      data: {
        name: payload.name,
        email: payload.email,
        password: payload.password,
        email_verify_token: token,
      },
    });
    return res.json({ message: "User created successfully!" });
  } catch (error) {
    console.log("The error is ", error);
    if (error instanceof ZodError) {
      const errors = formatError(error);
      res.status(422).json({ message: "Invalid data", errors });
    } else {
      Logger.error({ type: "Register Error", body: JSON.stringify(error) });
      res
        .status(500)
        .json({ error: "Something went wrong.please try again!", data: error });
    }
  }
});

export default router;