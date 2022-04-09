function subtractSumPerCategory(transactions) {
  return transactions.reduce((stats, transaction) => {
    for (const stat of stats) {
      if (stat.category === transaction.category) {
        stat.sum += transaction.amount;
        return stats;
      }
    }

    const { category, amount } = transaction;

    const newTransactionStatsObj = {
      category,
      sum: amount,
    };

    return [...stats, newTransactionStatsObj];
  }, []);
}

module.exports = subtractSumPerCategory;
