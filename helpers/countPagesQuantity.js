const countPagesQuantity = ({allTransactions, limit}) => {
  return allTransactions.length / limit
};

module.exports = countPagesQuantity;