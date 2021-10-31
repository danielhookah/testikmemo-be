const db = require("../models");
const User = db.user;
const Item = db.item;
const ItemDate = db.itemDate;

const Op = db.Sequelize.Op;

exports.getItems = async (req, res) => {
  const result = await Item.findAll({
    include: [{
      model: ItemDate,
      as: 'dates'
    }],
    order: [
      ['createdAt', 'DESC'],
      // [{ model: ItemDate, as: 'dates' }, 'createdAt', 'DESC'],
    ],
  })
    .then((items) => res.status(200).send(items))
    .catch((error) => {
      res.status(400).send(error);
    });
};

exports.getItem = async (req, res) => {
  console.log(req.params.date)
  console.log(new Date(new Date(req.params.date).setHours(0,0,0,0)))
  Item.findAll({
    where: {
      '$dates.toDate$': `${req.params.date} 00:00:00.000000 +00:00`
    },
    include: {
      model: ItemDate,
      as: 'dates'
    }
  })
    .then((item) => {
      if (!item) {
        return res.status(404).send({
          message: 'Item Not Found',
        });
      }
      return res.status(200).send(item);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send(error);
    });
};

// add(req, res) {
//   return Classroom
//     .create({
//       class_name: req.body.class_name,
//     })
//     .then((classroom) => res.status(201).send(classroom))
//     .catch((error) => res.status(400).send(error));
// },

exports.postItem = (req, res) => {
  // Save User to Database
  Item
    .create({
      title: req.body.title,
      label: req.body.label,
      value: req.body.value,
      created_at: req.body.created_at,
      dates: req.body.dates.map(el => {
        return {toDate: new Date(el)}
      })
    }, {
      include: [{
        model: ItemDate,
        as: 'dates',
      }]
    })
    .then((item) => res.status(201).send(item))
    .catch((error) => res.status(400).send(error));
};
