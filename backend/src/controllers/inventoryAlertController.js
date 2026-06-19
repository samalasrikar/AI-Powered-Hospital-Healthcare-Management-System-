const alerts = [
  {
    type: "Low Stock",
    medicineName: "Paracetamol",
    message: "Stock below threshold"
  },
  {
    type: "Out of Stock",
    medicineName: "Amoxicillin",
    message: "No stock available"
  },
  {
    type: "Expired Medicine",
    medicineName: "Cough Syrup",
    message: "Medicine expired"
  },
  {
    type: "Expiring Medicine",
    medicineName: "Vitamin D",
    message: "Expires within 7 days"
  }
];

exports.getAlerts = async (req, res) => {
  res.status(200).json({
    success: true,
    data: alerts
  });
};