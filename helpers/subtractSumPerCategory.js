function subtractSumPerCategory(transactions, color) {
  const sumPerCategoryArr = transactions.reduce((stats, transaction) => {

    for (const stat of stats) {
      if (stat.category === transaction.category) {
        stat.sum += transaction.amount;
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

  const totalAmount = sumPerCategoryArr.reduce((acc, item) => acc + item.sum, 0) 

  return { sumPerCategoryArr, totalAmount}
}

module.exports = subtractSumPerCategory;
