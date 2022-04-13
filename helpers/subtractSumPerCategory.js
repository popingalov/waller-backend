function subtractSumPerCategory(transactions, color) {
  return transactions.reduce((stats, transaction) => {
    console.log(transaction, 'transaction');

    for (const stat of stats) {
      if (stat.category === transaction.category) {
        stat.type === '-'
          ? (stat.sum += transaction.amount)
          : (stat.sum -= transaction.amount);
        return stats;
      }
    }

    const { category, amount } = transaction;

    const newTransactionStatsObj = {
      color: color[category],
      category,
      sum: amount,
    };
    stats.push(newTransactionStatsObj);
    return stats;
  }, []);
}

module.exports = subtractSumPerCategory;
