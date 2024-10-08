import Fish from "../models/fish.js";

export const getAllFish = async (req, res) => {
  try {
    const { page = 1, search } = req.query;

    let fishes;
    if (search) {
      fishes = await Fish.aggregate([
        {
          $search: {
            autocomplete: {
              query: search,
              path: "name",
              tokenOrder: "any",
              fuzzy: {
                maxEdits: 1,
                prefixLength: 3,
                maxExpansions: 256,
              },
            },
          },
        },
        {
          $limit: 10,
        },
        {
          $skip: page * 10 - 10,
        },
      ]);
    } else {
      fishes = await Fish.find({})
        .limit(10)
        .skip(page * 10 - 10)
        .sort("createdAt");
    }

    return res.status(200).json(fishes);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch", error: error.message });
  }
};

export const getFish = async (req, res) => {
  try {
    const { fishId } = req.params;
    const fish = await Fish.findById(fishId);
    if (!fish) return res.status(404).json({ message: "Item not found" });

    return res.status(200).json({ message: "Item Found", fish });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch", error: error.message });
  }
};

export const addFish = async (req, res) => {
  try {
    const image = req.file ? req.file.originalname : null;

    // coba refacto lagi
    const fish = new Fish({
      name: req.body.name,
      weight: req.body.weight,
      price: req.body.price,
      image: image,
    });

    await fish.save();
    return res.status(201).json(fish);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to add new fish", error: error.message });
  }
};

export const editFish = async (req, res) => {
  try {
    const { fishId } = req.params;
    const fish = await Fish.findById(fishId);
    if (!fish) return res.status(404).json({ message: "Item not found" });
    const body = req.body;
    const image = req.file ? req.file.originalname : null;

    let updatedFish;
    if (image)
      updatedFish = await Fish.findByIdAndUpdate(
        fishId,
        { ...body, image },
        { new: true }
      );
    else
      updatedFish = await Fish.findByIdAndUpdate(fishId, body, { new: true }); // should be in object, if we put {body} means we put an object into object

    return res
      .status(200)
      .json({ message: "Success updating fish", updatedFish });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to update fish", error: error.message });
  }
};

export const deleteFish = async (req, res) => {
  try {
    const { fishId } = req.params;
    const fish = await Fish.findById(fishId);
    if (!fish) return res.status(404).json({ message: "Item not found" });

    await Fish.findByIdAndDelete(fishId);
    return res.status(200).json({ message: "Success deleting fish" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to delete fish", error: error.message });
  }
};
