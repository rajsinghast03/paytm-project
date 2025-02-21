const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { Account } = require("../db");
const { default: mongoose } = require("mongoose");

const accountRouter = express.Router();

// /api/v1/account/balance
accountRouter.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({ userId: req._id });

  res.json({ balance: account.balance });
});

accountRouter.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { to, amount } = req.body;
    const sender = await Account.findOne({ userId: req._id }).session(session);

    if (sender.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Insufficient Balance" });
    }

    const receiver = await Account.findOne({ userId: to }).session(session);

    if (!receiver) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Recipient not found" });
    }

    await Account.updateOne(
      { userId: req._id },
      {
        $inc: {
          balance: -amount,
        },
      }
    ).session(session);

    await Account.updateOne(
      { userId: to },
      {
        $inc: {
          balance: amount,
        },
      }
    ).session(session);

    await session.commitTransaction();
    return res.status(200).json({ message: "Transaction successful!" });
  } catch (error) {
    await session.abortTransaction();
    res.json("Transaction Failed");
  } finally {
    session.endSession();
  }
});

module.exports = { accountRouter };
