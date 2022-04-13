function subtractSumPerCategory(transactions, color) {
  const result = transactions.reduce((stats, transaction, id) => {
    // console.log(transaction, 'transaction');

    for (const stat of stats) {
      if (stat.category === transaction.category) {
        if (transaction.type === '+') {
          stat.plus += transaction.amount;
          return stats;
        }

        stat.minus
          ? (stat.minus += transaction.amount)
          : (stat.minus = transaction.amount);
        return stats;
      }
    }

    const { category, amount } = transaction;

    const newTransactionStatsObj =
      transaction.type === '+'
        ? {
            color: color[category],
            category,
            plus: amount,
          }
        : {
            color: color[category],
            category,
            minus: amount,
          };

    stats.push(newTransactionStatsObj);
    return stats;
  }, []);
  console.log(result);
  const newResult = result.reduce(
    (acc, curr) => {
      if (curr.plus) {
        acc.plus.push(curr);
        acc.totalPlus += curr.plus;
      }
      if (curr.minus) {
        acc.minus.push(curr);
        acc.totalMinus += curr.minus;
      }

      return acc;
    },
    { plus: [], minus: [], totalPlus: 0, totalMinus: 0 },
  );
  return newResult;
}

module.exports = subtractSumPerCategory;
