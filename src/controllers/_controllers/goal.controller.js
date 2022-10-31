const db = require("../../models");
const Goal = db.goal;

const Op = db.Sequelize.Op;

exports.getGoals = async (req, res) => {
  Goal.findAll({
    include: [
      {
        model: Goal,
        as: "children",
      },
    ],
    order: [["createdAt", "DESC"]],
  })
    .then((goals) => {
      res.status(200).send(goals);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

exports.getGoal = async (req, res) => {
  Goal.findOne({
    include: [
      {
        model: Goal,
        as: "children",
      },
    ],
    where: {
      id: req.query.id,
    },
  })
    .then((goal) => {
      if (!goal) {
        return res.status(404).send({
          message: "Goal Not Found",
        });
      }
      return res.status(200).send(goal);
    })
    .catch((error) => {
      console.log(22222, error);
      res.status(400).send(error);
    });
};

exports.postGoal = (req, res) => {
  Goal.create({
    title: req.body.title,
    description: req.body.description,
    point: req.body.point,
    isCompleted: req.body.isCompleted,
    // todo
    // subGoal: req.body.interval,
    created_at: req.body.created_at,
    userId: req.userId,
  })
    .then((goal) => {
      res.status(201).send(goal);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

exports.putGoal = (req, res) => {
  var updateGoal = {
    title: req.body.title,
    description: req.body.description,
    point: req.body.point,
    isCompleted: req.body.isCompleted,
    // todo
    // subGoal: req.body.interval,
    created_at: req.body.created_at,
    userId: req.userId,
  };
  Goal.update(updateGoal, {
    where: { id: req.params.id },
    returning: true,
  }).then((goal) => {
    const updatedGoal = goal[1][0];
    res.status(201).send(updatedGoal);
  });
};

// todo
exports.toggleGoalCompleted = (req, res) => {};
