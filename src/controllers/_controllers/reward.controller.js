const db = require("../../models");
const User = db.user;
const Reward = db.reward;

const Op = db.Sequelize.Op;

exports.getRewards = async (req, res) => {
  Rewards.findAll({
    order: [
      ['createdAt', 'DESC'],
    ],
  })
    .then((rewards) => {
      res.status(200).send(rewards)
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

exports.getReward = async (req, res) => {
  Rewards.findOne({
    where: {
      id: req.query.id
    },
  })
    .then((reward) => {
      if (!reward) {
        return res.status(404).send({
          message: 'Rewards Not Found',
        });
      }
      return res.status(200).send(reward);
    })
    .catch((error) => {
      console.log(22222, error);
      res.status(400).send(error);
    });
};

exports.postReward = (req, res) => {
  Rewards.create({
      title: req.body.title,
      description: req.body.description,
      point: req.body.point,
      created_at: req.body.created_at,
      userId: req.userId
    })
    .then((reward) => {
      res.status(201).send(reward)
    })
    .catch((error) => {
      res.status(400).send(error)
    });
};

exports.putReward = (req, res) => {
  var updateReward = {
    title: req.body.title,
    description: req.body.description,
    point: req.body.point,
    created_at: req.body.created_at,
    userId: req.userId
  };
  Rewards.update(updateReward, {
    where: {id: req.params.id},
    returning: true,
  }).then(reward => {
    const updatedReward = reward[1][0]
    res.status(201).send(updatedReward)
  });
};
