const medicines = [
  {
    id: 1,
    medicineName: "Paracetamol",
    stock: 100
  },
  {
    id: 2,
    medicineName: "Amoxicillin",
    stock: 50
  }
];

const dispensingHistory = [];

exports.getMedicines = async (req, res) => {
  res.status(200).json({
    success: true,
    data: medicines
  });
};

exports.dispenseMedicine = async (req, res) => {
  const { medicineId, quantity } = req.body;

  const medicine = medicines.find(
    m => m.id === Number(medicineId)
  );

  if (!medicine) {
    return res.status(404).json({
      success: false,
      message: "Medicine not found"
    });
  }

  if (medicine.stock < quantity) {
    return res.status(400).json({
      success: false,
      message: "Insufficient stock"
    });
  }

  medicine.stock -= quantity;

  dispensingHistory.push({
    medicineName: medicine.medicineName,
    quantity,
    dispensedAt: new Date()
  });

  res.status(200).json({
    success: true,
    data: medicine
  });
};

exports.getDispensingHistory = async (req, res) => {
  res.status(200).json({
    success: true,
    data: dispensingHistory
  });
};