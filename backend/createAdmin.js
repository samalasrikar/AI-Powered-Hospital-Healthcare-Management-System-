const mongoose = require('mongoose');
const User = require('./src/models/User');

mongoose.connect('mongodb+srv://HMS_admin:OYqLa1u5Os98TwgG@hospital-cluster.bmagxu1.mongodb.net/');

async function createAdmin() {
  const admin = await User.create({
    fullName: 'Super Admin',
    email: 'superadmin@test.com',
    password: 'Admin@123',
    role: 'SuperAdmin',
  });

  console.log('Admin created:', admin.email);
  process.exit();
}

createAdmin();