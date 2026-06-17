const getInsights = async (req, res) => {
  try {
    const { question } = req.body;

    let insight = "";

    if (question.toLowerCase().includes("revenue")) {
      insight =
        "Revenue decreased due to fewer patient visits and lower appointment volume.";
    } else if (question.toLowerCase().includes("department")) {
      insight =
        "Cardiology currently has the highest patient load.";
    } else if (question.toLowerCase().includes("appointment")) {
      insight =
        "Peak appointment hours are between 10 AM and 1 PM.";
    } else {
      insight =
        "No specific insight available for this question.";
    }

    res.status(200).json({
      success: true,
      insight,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getInsights,
};