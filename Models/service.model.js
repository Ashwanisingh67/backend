const { DENTAL_SERVICES } = require('../config/constants');

const dentalServices = {
   BASIC_CLEANING: {
    id: 'dental_cleaning',
    name: 'Basic Teeth Cleaning',
    price: DENTAL_SERVICES.BASIC_CLEANING, // Ensure this matches exactly
    description: 'Professional teeth cleaning and polishing',
    duration: '30 mins'
  },
  FILLING: {
    id: 'dental_filling',
    name: 'Tooth Filling',
    price: DENTAL_SERVICES.FILLING,
    description: 'Cavity filling with composite material',
    duration: '45-60 mins'
  },
  ROOT_CANAL: {
    id: 'dental_root_canal',
    name: 'Root Canal Treatment',
    price: DENTAL_SERVICES.ROOT_CANAL,
    description: 'Single sitting root canal treatment',
    duration: '90-120 mins'
  }
};

module.exports = {
  getServiceById: (serviceId) => {
    const service = Object.values(dentalServices).find(s => s.id === serviceId);
    if (!service) {
      throw new Error(`Service not found: ${serviceId}`);
    }
    return service;
  },
  getAllServices: () => Object.values(dentalServices)
};