// import { userCollection } from "../server.js";
// import userCollection from "../server.js";

// export const getAllUser = (req, res) => {
//   const user = req.body;

// };

export const createUser = async (req, res) => {
  try {
    const userCollection = req.app.locals.userCollection;

    const userData = req.body;

    // const userCollection = req.app.locals.userCollection;
    const result = await userCollection.insertOne(userData);
    res.status(201).json({
      success: true,
      insertedId: result.insertedId,
    });
  } catch (error) {
    res.status(500).json({
      message: error.massage,
    });
  }
};
