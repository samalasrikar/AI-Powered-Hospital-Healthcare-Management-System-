const payments = [
  {
    id: 1,
    patientName: "John Doe",
    amount: 500,
    method: "UPI",
    status: "Pending"
  }
];

exports.getPayments = async (req, res) => {
  res.status(200).json({
    success: true,
    data: payments
  });
};

exports.createPayment = async (req, res) => {
  const payment = {
    id: payments.length + 1,
    ...req.body
  };

  payments.push(payment);

  res.status(201).json({
    success: true,
    data: payment
  });
};

exports.updatePaymentStatus = async (req, res) => {
  const payment = payments.find(
    p => p.id === Number(req.params.id)
  );

  if (!payment) {
    return res.status(404).json({
      success: false,
      message: "Payment not found"
    });
  }

  payment.status = req.body.status;

  res.status(200).json({
    success: true,
    data: payment
  });
};