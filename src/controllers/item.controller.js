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
      '$dates.toDate$': `${req.query.date} 00:00:00.000000 +00:00`,
      userId: req.query.user
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
      if (!item) {
        return res.status(404).send({
          message: 'Item Not Found',
        });
      }
      return res.status(200).send(item);
    })
    .catch((error) => {
      console.log(22222, error);
      res.status(400).send(error);
    });
};

exports.postItem = (req, res) => {
  // Save User to Database
  Item
    .create({
      title: req.body.title,
      title2: req.body.title2,
      label: req.body.label,
      value: req.body.value,
      created_at: req.body.created_at,
      userId: req.userId,
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
            [Op.or]: req.body.tags
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
    .catch((error) => {
      res.status(400).send(error)
    });
};

exports.putItem = (req, res) => {
  var updateItem = {
    title: req.body.title,
    title2: req.body.title2,
    label: req.body.label,
    value: req.body.value,
    created_at: req.body.created_at,
    dates: req.body.dates.map(el => {
      return {toDate: new Date(el)}
    }),
  };
  Item.update(updateItem, {
    where: {id: req.params.id},
    returning: true,
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
  }).then(item => {
    const updatedItem = item[1][0]
    Tag.findAll({
      where: {
        id: {
          [Op.or]: req.body.tags
        }
      }
    }).then(tags => {
      var myTags = [];
      for (let i = 0; i < tags.length; i++) {
        myTags.push(tags[i].title);
      }
      updatedItem.setTags(tags).then(() => {
        updatedItem.set('tags', tags)
        res.status(201).send(updatedItem)
      });
    })
      .catch((error) => {
        console.log(111)
        console.log(error)
        console.log(111)
        res.status(400).send(error)
      });
  });
};

exports.toggleItemDone = (req, res) => {
  var data = {
    isDone: req.body.isDone,
  };
  ItemDate.update(data, {
    where: {id: req.params.dateId, itemId: req.params.id},
    returning: true,
  }).then(itemDate => {
    const updatedDate = itemDate[1][0]
    res.status(201).send(updatedDate)
  }).catch((error) => {
    console.log(error)
    res.status(400).send(error)
  });
};
