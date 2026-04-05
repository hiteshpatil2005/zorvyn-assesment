const Record = require('../record/record.model');

exports.getSummary = async (req, res) => {
  const records = await Record.find();

  let income = 0, expense = 0;

  records.forEach(r => {
    if (r.type === 'income') income += r.amount;
    else expense += r.amount;
  });

  res.json({
    success: true,
    data: {
      totalIncome: income,
      totalExpense: expense,
      netBalance: income - expense
    }
  });
};