const db = require("../../models");
const Habit = db.habit;
const Day = db.day;

const Op = db.Sequelize.Op;

exports.getHabits = async (req, res) => {
  Habit.findAll({
    where: {
      userId: req.userId,
    },
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
      },
    ],
    order: [["createdAt", "DESC"]],
  })
    .then((habits) => {
      const preparedHabits = habits.map(async (habit) => {
        const totalDaysCompleted = await Day.findAll({
          raw: true,
          where: {
            habitId: habit.id,
            completedCount: habit.countPerDay,
          },
        });

        return {
          ...habit.toJSON(),
          totalDaysCompleted: totalDaysCompleted.length,
        };
      });

      Promise.all(preparedHabits).then((habits) => {
        res.status(200).send(habits);
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send(error);
    });
};

exports.getHabit = async (req, res) => {
  Habit.findOne({
    where: {
      id: req.query.id,
    },
    include: [
      {
        model: Day,
        as: "days",
      },
    ],
  })
    .then((habit) => {
      if (!habit) {
        return res.status(404).send({
          message: "Habit Not Found",
        });
      }
      return res.status(200).send(habit);
    })
    .catch((error) => {
      console.log(22222, error);
      res.status(400).send(error);
    });
};

exports.postHabit = (req, res) => {
  Habit.create({
    title: req.body.title,
    description: req.body.description,
    point: req.body.point,
    interval: req.body.interval,
    countPerDay: req.body.countPerDay,
    isStopped: false,
    userId: req.userId,
  })
    .then((habit) => {
      res.status(201).send(habit);
    })
    .catch((error) => {
      console.log(2222, error);
      res.status(400).send(error);
    });
};

exports.putHabit = (req, res) => {
  var updateHabit = {
    title: req.body.title,
    description: req.body.description,
    point: req.body.point,
    interval: req.body.interval,
    countPerDay: req.body.countPerDay,
    isStopped: req.body.isStopped,
    userId: req.userId,
  };
  Habit.update(updateHabit, {
    where: { id: req.params.id },
    returning: true,
    include: [
      {
        model: Day,
        as: "days",
      },
    ],
  }).then((habit) => {
    const updatedHabit = habit[1][0];
    res.status(201).send(updatedHabit);
  });
};

exports.setHabitDay = async (req, res) => {
  const date = new Date(req.body.date);
  const habitId = req.params.id;
  const where = {
    date,
    habitId,
  };

  const habit = await Habit.findByPk(habitId);
  if (!habit) {
    return res.status(404).send({
      message: "Habit Not Found",
    });
  }

  try {
    const day = await Day.findOne({ where });
    if (!day) {
      const createdDay = await Day.create(
        {
          completedCount: req.body.completedCount,
          date,
          habitId,
        },
        { returning: true }
      );
      // update completedCount
      if (createdDay.completedCount === habit.countPerDay) {
        const updatedHabitData = await Habit.update(
          {
            ...habit,
            totalDaysCompleted: habit.totalDaysCompleted + 1,
          },
          { where: { id: habitId }, returning: true }
        );
        const updatedHabit = updatedHabitData[1][0];
        res
          .status(201)
          .send({ totalDaysCompleted: updatedHabit.totalDaysCompleted });
        return;
      }
      res.status(201).send(createdDay);
      return;
    }

    const prevDayCompleted = day.completedCount;
    const updatedDayData = await Day.update(
      { ...day, completedCount: req.body.completedCount },
      { where, returning: true }
    );
    const updatedDay = updatedDayData[1][0];

    let totalDaysCompletedUpdateVal = undefined;
    if (
      prevDayCompleted === habit.countPerDay &&
      updatedDay.completedCount.search("0") !== -1
    ) {
      totalDaysCompletedUpdateVal = -1;
    }
    if (
      prevDayCompleted.search("0") !== -1 &&
      updatedDay.completedCount === habit.countPerDay
    ) {
      totalDaysCompletedUpdateVal = 1;
    }
    if (totalDaysCompletedUpdateVal !== undefined) {
      const updatedHabitData = await Habit.update(
        {
          ...habit,
          totalDaysCompleted:
            habit.totalDaysCompleted + totalDaysCompletedUpdateVal,
        },
        { where: { id: habitId }, returning: true }
      );
      console.log(updatedHabitData[1][0].totalDaysCompleted)
      res
        .status(201)
        .send({ totalDaysCompleted: updatedHabitData[1][0].totalDaysCompleted });
      return;
    }
  } catch (e) {
    console.log(1111122222, e);
    res.status(500).send(e);
  }

  res.status(201).send({totalDaysCompleted: habit.totalDaysCompleted});
};
