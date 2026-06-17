const appointmentAssistant = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Query is required",
      });
    }

    const userQuery = query.toLowerCase();

    let department = "General Medicine";
    let doctors = [];
    let slots = [];

    if (userQuery.includes("heart")) {
      department = "Cardiology";
      doctors = ["Dr. Sharma", "Dr. Patel"];
      slots = ["10:00 AM", "2:00 PM"];
    } else if (userQuery.includes("skin")) {
      department = "Dermatology";
      doctors = ["Dr. Mehta", "Dr. Rao"];
      slots = ["11:00 AM", "4:00 PM"];
    } else if (
      userQuery.includes("child") ||
      userQuery.includes("kids")
    ) {
      department = "Pediatrics";
      doctors = ["Dr. Gupta", "Dr. Singh"];
      slots = ["9:00 AM", "1:00 PM"];
    } else {
      doctors = ["Dr. Kumar"];
      slots = ["12:00 PM"];
    }

    return res.status(200).json({
      success: true,
      department,
      doctors,
      slots,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  appointmentAssistant,
};