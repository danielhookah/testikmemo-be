const db = require("../models");
const Op = db.Sequelize.Op;
const User = db.user;
const Habits = db.habit;
const Day = db.day;

exports.getMe = (req, res) => {
  User.findByPk(req.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User Not Found",
        });
      }
      return res.status(200).send(user.dataValues);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

exports.getFriendsData = (req, res) => {
  User.findAll({
    where: {
      id: {
        [Op.not]: req.userId,
      },
    },
    include: [
      {
        model: Habits,
        as: "habits",
        required : true,
        include: [
          {
            model: Day,
            as: "days",
            where: {
              date: {
                [Op.between]: [new Date(req.query.from), new Date(req.query.to)],
              },
            },
            required: false,
          }
        ]
      },
    ],
  })
    .then((friends) => {
      if (!friends) {
        return res.status(404).send({
          message: "Friends Not Found",
        });
      }

      const preparedFriends = friends.map(async (friend) => {
        const preparedHabits = friend.habits.map(async (habit) => {
          const totalDaysCompleted = await Day.findAll({
            raw: true,
            where: {
              habitId: habit.id,
              completedCount: habit.countPerDay,
            },
          });

          return { ...habit.toJSON(), totalDaysCompleted: totalDaysCompleted.length, };
        });

        return { ...friend.toJSON(), habits: await Promise.all(preparedHabits) }
      })

      Promise.all(preparedFriends).then((friends) => {
        res.status(200).send(friends);
      });
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};
