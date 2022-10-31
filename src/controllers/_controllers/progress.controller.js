const db = require("../../models");
const User = db.user;
const Progress = db.progress;

const Op = db.Sequelize.Op;

exports.getProgresses = async (req, res) => {
  Progress.findAll({
    order: [
      ['createdAt', 'DESC'],
    ],
  })
    .then((progresses) => {
      res.status(200).send(progresses)
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

exports.getProgress = async (req, res) => {
  Progress.findOne({
    where: {
      id: req.query.id
    },
  })
    .then((progress) => {
      if (!progress) {
        return res.status(404).send({
          message: 'Progress Not Found',
        });
      }
      return res.status(200).send(progress);
    })
    .catch((error) => {
      console.log(22222, error);
      res.status(400).send(error);
    });
};

exports.postProgress = (req, res) => {
  Progress.create({
      habitsPoints: req.body.habitsPoints,
      goalsPoints: req.body.goalsPoints,
      pointsUsed: req.body.pointsUsed,
      created_at: req.body.created_at,
      userId: req.userId
    })
    .then((progress) => {
      res.status(201).send(progress)
    })
    .catch((error) => {
      res.status(400).send(error)
    });
};

exports.putProgress = (req, res) => {
  var updateProgress = {
    habitsPoints: req.body.habitsPoints,
    goalsPoints: req.body.goalsPoints,
    pointsUsed: req.body.pointsUsed,
    created_at: req.body.created_at,
    userId: req.userId
  };
  Progress.update(updateProgress, {
    where: {id: req.params.id},
    returning: true,
  }).then(progress => {
    const updatedProgress = progress[1][0]
    res.status(201).send(updatedProgress)
  });
};
