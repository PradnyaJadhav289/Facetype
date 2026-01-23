import Mapping from "../models/Mapping.js";

export const createMapping = async (req, res) => {
  try {
    const mapping = await Mapping.create(req.body);
    res.status(201).json(mapping);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMappings = async (req, res) => {
  const mappings = await Mapping.find();
  res.json(mappings);
};
