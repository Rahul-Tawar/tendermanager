import Bid from '../models/bidModel.js';

export const createBid = async (req, res) => {
  const { amount, tenderId } = req.body;

  try {
    const bid = await Bid.create({ amount, tenderId, userId: req.userId });
    res.status(201).send(bid);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const getBids = async (req, res) => {
  try {
    const bids = await Bid.findAll({ where: { tenderId: req.params.tenderId } });
    res.status(200).send(bids);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
