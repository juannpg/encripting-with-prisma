import { prisma } from "../client";
import express from "express";

const router = express.Router();

router.post('/register', async(req, res) => {
  const { username, password } = req.body;

  if ( !username || !password) {
    return res.status(400).json({ message: 'Provide all fields' });
  }

  try {
    const user = await prisma.user.create({
      data: {
        username: username as string,
        password: password as string,
      },
    })

    if (!user) {
      return res.status(400).json({ message: 'User not created' });
    }

    return res.status(200).json({ message: 'User created', user });

  } catch (error) {
    return res.status(500).json({ message: 'Error creating user', error });
  }
});

router.post('/login', async(req, res) => {
  const { username, password } = req.body;

  if ( !username || !password) {
    return res.status(400).json({ message: 'Provide all fields' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username as string,
        password: password as string,
      },
    });
    
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User found', user });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

export default router;