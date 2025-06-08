import { Router, Response, Request } from "express";
import { registerSchema } from "../validation/authValidations.js";
import { ZodError } from "zod";

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
try {
   const body = req.body;
const payload = registerSchema.parse(body);
res.json(payload)
} catch (error) {
 if (error instanceof ZodError) {
    return res.status(400).json({ error: error.message });
  }
       
}
})

export default router;