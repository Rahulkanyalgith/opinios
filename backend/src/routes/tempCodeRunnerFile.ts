router.post("/register",  async (req: Request, res: Response) => {
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