import Session from "../models/Session.js";

export const createSession = async (req, res) => {
  try {
    console.log(req.body);
    const session = await Session.create(req.body);
    res.status(201).json(session);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getSessions = async (req, res) => {
  const sessions = await Session.find().populate("userId");
  res.json(sessions);
};
