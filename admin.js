// =====================================
// Database
const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: String,
  completed: Boolean,
  create_at: {type: Date, default: Date.now()},
});

const Project = mongoose.model('Project', ProjectSchema);

// =====================================
// Admin

const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminBroMongoose = require('@admin-bro/mongoose');

// use mongoose in AdminBro
AdminBro.registerAdapter(AdminBroMongoose);

// config
const adminBroOptions = new AdminBro({
  resources: [Project],
  rootPath: '/admin',
});

const router = AdminBroExpress.buildRouter(adminBroOptions);

// =================================
// Server

const express = require('express')
const app = express()

app.use(adminBroOptions.options.rootPath, router);

// =====================================
// Run App
const run = async () => {
  await mongoose.connect('', {
    useNewUrlParser: true,
    useUnifiedTopology: Boolean,
  });
  
  await app.listen(3333, () => console.log('AdminBro is under localhost:3333/admin'));
};

run();
