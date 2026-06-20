const Invoice = require("../models/Invoice");

const getRevenueAnalytics = async (req, res) => {
  try {
    const invoices = await Invoice.find();

    const now = new Date();

    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - 7);

    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );

    let dailyRevenue = 0;
    let weeklyRevenue = 0;
    let monthlyRevenue = 0;
    let totalRevenue = 0;

    let paidInvoices = 0;
    let pendingInvoices = 0;

    invoices.forEach((invoice) => {
      if (invoice.status === "Paid") {
        paidInvoices++;
        totalRevenue += invoice.totalAmount;

        if (invoice.updatedAt >= startOfDay) {
          dailyRevenue += invoice.totalAmount;
        }

        if (invoice.updatedAt >= startOfWeek) {
          weeklyRevenue += invoice.totalAmount;
        }

        if (invoice.updatedAt >= startOfMonth) {
          monthlyRevenue += invoice.totalAmount;
        }
      } else {
        pendingInvoices++;
      }
    });

    res.status(200).json({
      success: true,
      data: {
        dailyRevenue,
        weeklyRevenue,
        monthlyRevenue,
        totalRevenue,
        totalInvoices: invoices.length,
        paidInvoices,
        pendingInvoices,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getRevenueAnalytics,
};