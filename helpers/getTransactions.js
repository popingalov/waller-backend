const { Transaction } = require('../models');

const getTransactions = async (id, page = 1, limit = 6) => {
    const skip = (page - 1) * limit;

    return await Transaction.find(
        { owner: id },
        '-createdAt -updatedAt',
      )
        .sort({ dataFiltr: -1 })
        .skip(skip)
        .limit(limit)
        .populate('owner', 'email');
}

module.exports = getTransactions;