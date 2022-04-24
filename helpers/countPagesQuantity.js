const countPagesQuantity = ({allTransactions, limit = 6}) => {
  return allTransactions.length / limit
};

module.exports = countPagesQuantity;