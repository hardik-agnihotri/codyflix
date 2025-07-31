import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";
import { generateToken } from "../utility/tokenGenerator";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });
    const token = generateToken(newUser.id);
    res.status(201).json({
      message: "User Created succesfully",
      User: newUser,
      token: token,
    });
  } catch (error) {
    console.error("Error in registering", error);
    res.status(400).json("Error in registering check logs");
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (!existingUser) {
      return res.status(400).json({ message: "User doesnt exists" });
    }

    const matchedPass = await bcrypt.compare(
      password,
      existingUser?.hashedPassword
    );
    if (!matchedPass) {
      return res.status(401).json({ message: "Please check you credentials" });
    }
    const token = generateToken(existingUser.id);
    console.log("Signing with secret:", process.env.JWT_secret);
    console.log("token on login:", token);

    return res.status(200).json({
      message: "User logged in successfulle",
      User: existingUser,
      token: token,
    });
  } catch (error) {
    console.error("Error while logging in", error);
    res.status(400).json("Error in login");
  }
};

export const testCheck = async (req: Request, res: Response) => {
  return res.json({ message: "Token recieved" });
};

export const oauthCallback = async (req: Request, res: Response) => {
  const { email, name, provider, providerId } = req.user as any;

  if (!email) return res.status(400).json({ msg: "No email found in profile" });

  let user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        name,
        provider,
        providerId,
      },
    });
  }

  const token = generateToken(user.id);

  // 🌐 Choose how to respond:
  // For frontend app: send via redirect or JSON
  res.redirect(`http://localhost:5173/oauth-success?token=${token}`);
  // Or just:
  // res.json({ token, user });
};

// create user profile getting controller from db

export const getProfile = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  try {
    const profiles = await prisma.profile.findMany({ where: { userId } });
    console.log(profiles);
    console.log("Response console", res.status(200).json(profiles));
    return res.status(200).json(profiles);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch profiles" });
  }
};

 export const createProfile = async(req:Request,res:Response)=>{
   const {username ,profileColor} = req.body;
    const userId = req.user?.id;

    if(!username) return  res.status(400).json({message:"Please enter username"})
      try {
    const profile = await prisma.profile.create({
      data: {
        username,
        profileColor,
        userId
      }
    });
    return res.status(201).json(profile);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to create profile' });
  }
    
}