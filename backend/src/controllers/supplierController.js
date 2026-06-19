const suppliers = [
  {
    id: 1,
    supplierName: "MediCare Pharma",
    contactNumber: "9876543210",
    email: "contact@medicare.com",
    address: "Hyderabad"
  },
  {
    id: 2,
    supplierName: "HealthPlus Distributors",
    contactNumber: "9123456780",
    email: "support@healthplus.com",
    address: "Bangalore"
  }
];

exports.getSuppliers = async (req, res) => {
  res.status(200).json({
    success: true,
    data: suppliers
  });
};

exports.createSupplier = async (req, res) => {
  const supplier = {
    id: suppliers.length + 1,
    ...req.body
  };

  suppliers.push(supplier);

  res.status(201).json({
    success: true,
    data: supplier
  });
};