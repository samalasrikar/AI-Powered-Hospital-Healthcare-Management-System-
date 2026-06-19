const dischargedPatients = [];

exports.dischargePatient = async (req, res) => {
  const { patientId, dischargeSummary, finalBill } = req.body;

  const dischargeRecord = {
    patientId,
    dischargeSummary,
    finalBill,
    billingStatus: "Completed",
    bedStatus: "Released",
    dischargedAt: new Date()
  };

  dischargedPatients.push(dischargeRecord);

  res.status(200).json({
    success: true,
    message: "Patient discharged successfully",
    data: dischargeRecord
  });
};

exports.getDischarges = async (req, res) => {
  res.status(200).json({
    success: true,
    data: dischargedPatients
  });
};