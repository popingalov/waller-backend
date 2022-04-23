function subtractSumPerCategory(transactions, color) {
  const result = transactions.reduce((stats, transaction, id) => {
    // console.log(transaction, 'transaction');

    for (const stat of stats) {
      if (stat.category === transaction.category) {
        if (transaction.type === '+') {
          stat.value += transaction.amount;
          return stats;
        }

        stat.value
          ? (stat.value += transaction.amount)
          : (stat.value = transaction.amount);
        return stats;
      }
    }

    const { category, amount } = transaction;

    const newTransactionStatsObj =
      transaction.type === '+'
        ? {
            color: color[category],
            category,
            value: amount,
            type: '+',
          }
        : {
            color: color[category],
            category,
            value: amount,
            type: '-',
          };

    stats.push(newTransactionStatsObj);
    return stats;
  }, []);

  const newResult = result.reduce(
    (acc, curr) => {
      if (curr.type === '+') {
        acc.plus.push(curr);
        acc.totalPlus += curr.value;
      }
      if (curr.type === '-') {
        acc.minus.push(curr);
        acc.totalMinus += curr.value;
      }

      return acc;
    },
    { plus: [], minus: [], totalPlus: 0, totalMinus: 0 },
  );
  return newResult;
}

module.exports = subtractSumPerCategory;
