const Record = require('./record.model');

exports.createRecord = async (req, res) => {
  try {
    const record = await Record.create(req.body);
    res.json({ success: true, data: record });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getRecords = async (req, res) => {
  const { type, category } = req.query;

  let filter = {};
  if (type) filter.type = type;
  if (category) filter.category = category;

  const records = await Record.find(filter);
  res.json({ success: true, data: records });
};

exports.updateRecord = async (req, res) => {
  const record = await Record.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ success: true, data: record });
};

exports.deleteRecord = async (req, res) => {
  await Record.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "Deleted" });
};