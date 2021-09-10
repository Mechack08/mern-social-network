const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

module.exports.userInfos = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Unkwon Id : " + req.params.id);

  await UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else res.send("Unkwon Id : " + err);
  }).select("-password");
};

module.exports.userUpdate = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Unkwon Id : " + req.params.id);

  try {
    await UserModel.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: {
          bio: req.body.bio,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        if (err) return res.status(500).send({ message: err });
      }
    ).select("-password");
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Unkwon Id : " + req.params.id);

  try {
    await UserModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted." });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.follow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToFollow)
  )
    return res
      .status(400)
      .send("Unkwon Id : " + req.params.id + " or " + req.body.idToFollow);

  try {
    //Add to the follower list
    await UserModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { followings: req.body.idToFollow } },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) res.status(201).json(docs);
        else return res.status(400).json(err);
      }
    );
    //add to following list
    await UserModel.findByIdAndUpdate(
      req.body.idToFollow,
      { $addToSet: { followers: req.params.id } },
      { new: true, upsert: true },
      (err, docs) => {
        /* if (!err) res.status(201).json(docs); */ //Pas moyen de retourner 2 fois
        if (err) return res.status(400).json(err);
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.unfollow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToUnfollow)
  )
    return res.status(400).send("Unkwon Id : " + req.params.id);

  try {
    //remove to the follower list
    await UserModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { followings: req.body.idToUnfollow } },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) res.status(201).json(docs);
        else return res.status(400).json(err);
      }
    );
    //remove to following list
    await UserModel.findByIdAndUpdate(
      req.body.idToUnfollow,
      { $pull: { followers: req.params.id } },
      { new: true, upsert: true },
      (err, docs) => {
        /* if (!err) res.status(201).json(docs); */ //Pas moyen de retourner 2 fois
        if (err) return res.status(400).json(err);
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
