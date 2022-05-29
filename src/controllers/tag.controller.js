const db = require("../models");
const Tag = db.tag;

exports.getTags = async (req, res) => {
  const result = await Tag.findAll({
    where: {
      userId: req.query.user
    },
    order: [
      ['createdAt', 'DESC'],
    ],
  })
    .then((tags) => {
      res.status(200).send(tags)
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

exports.postTag = (req, res) => {
  Tag
    .create({
      title: req.body.title,
      userId: req.userId,
    })
    .then((tag) => {
      res.status(201).send(tag)
    })
    .catch((error) => {
      res.status(400).send(error)
    });
};

exports.putTag = (req, res) => {
  var updateTag = {
    title: req.body.title,
  };
  Tag.update(updateTag, {
    where: {id: req.params.id},
    returning: true,
  }).then(tag => {
    res.status(201).send(tag[1][0])
  });
};
