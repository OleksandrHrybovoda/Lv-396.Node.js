/* eslint-disable consistent-return */
const User = require('../../../models/user.model');
const helpers = require('../../../utils/helpers');
const cloudinary = require('../../../config/cloudinary');
const {
  arrKeys,
  userQueryOptions,
} = require('../../../config/config');

const getAll = async (req, res) => {
  const params = helpers.reducePropsToObject(userQueryOptions, req.query);
  try {
    const users = await User.find(params)
      .populate('manager')
      .populate('teamlead')
      .populate('deparment', 'name')
      .exec();
    res.json(users);
  } catch (err) {
    res.status(500).json({
      err,
    });
  }
};

const deleteOne = async (req, res) => {
  const {
    id,
  } = req.body;
  try {
    const user = await User.findByIdAndDelete(id).exec();
    if (!user) {
      res.status(404).json({
        err: 'User not found',
      });
      return 0;
    }
    res.json({
      deleted: user,
    });
  } catch (err) {
    res.status(500).json({
      err,
    });
  }
};

const updateOne = async (req, res) => {
  const {
    id,
  } = req.body;
  const user = helpers.reducePropsToObject(arrKeys, req.body);

  let contacts = helpers.readInsertedObject('contactName', 'contactValue', req);
  if (contacts) {
    contacts = contacts.map(el => ({
      contact_name: el.contactName,
      contact_value: el.contactValue,
    }));
    user.contacts = [...contacts];
  }

  let dates = helpers.readInsertedObject('dateTopic', 'date', req);
  if (dates) {
    dates = dates.map(el => ({
      topic: el.dateTopic,
      date: el.date,
    }));
    user.dates = [...dates];
  }

  if (req.file) {
    user.photoURL = req.file.url;
    user.photoID = req.file.public_id;
  }

  try {
    const doc = await User.findById(id);
    if (!doc) {
      res.status(404).json({
        err: 'User not found',
      });
      return 0;
    }
    if (user.photoID) {
      cloudinary.v2.api.delete_resources(user.photoID);
    }
    Object.assign(doc, user);
    doc.save();
    res.json(doc);
  } catch (err) {
    res.status(500).json({
      err,
    });
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id)
      .populate('manager')
      .populate('teamlead')
      .populate('department')
      .exec();

    if (!user) {
      res.status(404).json({
        err: 'User not found',
      });
      return 0;
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({
      err,
    });
  }
};

const updateWatched = async (req, res) => {
  const {
    id,
    issueID,
  } = req.body;
  try {
    const user = await User.findById(id).exec();
    if (user.watched_issues.toString().split(',').includes(issueID)) {
      res.status(400).json({
        err: 'Array already includes this issue',
      });
      return 0;
    }
    user.watched_issues = [...user.watched_issues, issueID];
    await user.save();
    res.json({
      success: 'updated',
    });
  } catch (err) {
    res.status(500).json({
      err,
    });
  }
};

const changeAvatar = async (req, res) => {
  const {
    id,
  } = req.body;
  console.log(id);
  try {
    const user = await User.findById(id);
    if (user.photoID) {
      await cloudinary.v2.api.delete_resources(user.photoID);
    }
    user.photoURL = req.file.url;
    user.photoID = req.file.public_id;
    await user.save();
    res.json(req.file);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err,
    });
  }
};

module.exports = {
  getAll,
  deleteOne,
  updateOne,
  getOne,
  updateWatched,
  changeAvatar,
};
