import Evaluation from '../models/evaluationModel.js';

export const evaluateBid = async (req, res) => {
  const { bidId, score } = req.body;

  try {
    const evaluation = await Evaluation.create({ bidId, score, userId: req.userId });
    res.status(201).send(evaluation);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const getEvaluations = async (req, res) => {
  try {
    const evaluations = await Evaluation.findAll({ where: { bidId: req.params.bidId } });
    res.status(200).send(evaluations);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
