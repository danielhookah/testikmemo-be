const db = require("../../models");
const User = db.user;
const Phrase = db.phrase;

const Op = db.Sequelize.Op;

exports.getPhrases = async (req, res) => {
  Phrase.findAll({
    order: [
      ['createdAt', 'DESC'],
    ],
  })
    .then((phrases) => {
      res.status(200).send(phrases)
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

exports.getPhrase = async (req, res) => {
  Phrase.findOne({
    where: {
      id: req.query.id
    },
  })
    .then((phrase) => {
      if (!phrase) {
        return res.status(404).send({
          message: 'Phrase Not Found',
        });
      }
      return res.status(200).send(phrase);
    })
    .catch((error) => {
      console.log(22222, error);
      res.status(400).send(error);
    });
};

exports.postPhrase = (req, res) => {
  Phrase.create({
      title: req.body.title,
      created_at: req.body.created_at,
      userId: req.userId
    })
    .then((phrase) => {
      res.status(201).send(phrase)
    })
    .catch((error) => {
      res.status(400).send(error)
    });
};

exports.putPhrase = (req, res) => {
  var updatePhrase = {
    title: req.body.title,
    created_at: req.body.created_at,
    userId: req.userId
  };
  Phrase.update(updatePhrase, {
    where: {id: req.params.id},
    returning: true,
  }).then(phrase => {
    const updatedPhrase = phrase[1][0]
    res.status(201).send(updatedPhrase)
  });
};
