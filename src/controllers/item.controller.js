const db = require("../models");
const User = db.user;
const Item = db.item;
const ItemDate = db.itemDate;
const Tag = db.tag;

const Op = db.Sequelize.Op;

exports.getItems = async (req, res) => {
  const result = await Item.findAll({
    include: [
      {
        model: ItemDate,
        as: 'dates'
      },
      {
        model: Tag,
        as: 'tags'
      }
    ],
    order: [
      ['createdAt', 'DESC'],
      // [{ model: ItemDate, as: 'dates' }, 'createdAt', 'DESC'],
    ],
  })
    .then((items) => {
      res.status(200).send(items)
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

exports.getItem = async (req, res) => {
  Item.findAll({
    where: {
      '$dates.toDate$': `${req.params.date} 00:00:00.000000 +00:00`
    },
    include: [
      {
        model: ItemDate,
        as: 'dates'
      },
      {
        model: Tag,
        as: 'tags'
      }
    ]
  })
    .then((item) => {
      console.log(item[8])
      console.log(1111)
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
      title2: req.body.title2,
      label: req.body.label,
      value: req.body.value,
      created_at: req.body.created_at,
      dates: req.body.dates.map(el => {
        return {toDate: new Date(el)}
      }),
    }, {
      include: [
        {
          model: ItemDate,
          as: 'dates'
        },
        {
          model: Tag,
          as: 'tags'
        }
      ]
    })
    .then((item) => {
      // if (req.body.tags.length < 1) res.status(201).send(item)

      Tag.findAll({
        where: {
          id: {
            [Op.or]: [2]
            // [Op.or]: req.body.tags
          }
        }
      }).then(tags => {
        var myTags = [];
        for (let i = 0; i < tags.length; i++) {
          myTags.push(tags[i].title);
        }
        item.setTags(tags).then(() => {
          item.set('tags', tags)
          res.status(201).send(item)
        });
      });
    })
    .catch((error) => res.status(400).send(error));
};
