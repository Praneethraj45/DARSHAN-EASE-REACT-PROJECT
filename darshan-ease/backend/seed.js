const mongoose = require('mongoose');
const dotenv   = require('dotenv');
const Temple   = require('./models/Temple');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const temples = [
  {
    name: 'Tirumala Tirupati',
    location: 'Tirupati',
    state: 'Andhra Pradesh',
    emoji: '🛕',
    tag: 'Most visited',
    ticketPrice: 300,
    rating: 4.9,
    description: 'Sri Venkateswara Swamy temple, one of the most visited pilgrimage sites in the world.',
    availableSlots: [
      { time: '6:00 AM', capacity: 100 },
      { time: '7:00 AM', capacity: 100 },
      { time: '8:00 AM', capacity: 100 },
      { time: '9:00 AM', capacity: 100, booked: 100 },
      { time: '10:00 AM', capacity: 100, booked: 100 },
      { time: '11:00 AM', capacity: 100 },
      { time: '2:00 PM', capacity: 100 },
      { time: '4:00 PM', capacity: 100 },
      { time: '6:00 PM', capacity: 100 }
    ],
    poojaTypes: [
      { name: 'Darshan Only', price: 0, description: 'General darshan, no special pooja' },
      { name: 'Abhishekam', price: 500, description: 'Sacred bath of the deity with holy water' },
      { name: 'Sahasranama Archana', price: 300, description: 'Recitation of 1000 names with flowers' },
      { name: 'Kalyanam', price: 1500, description: 'Divine wedding ceremony of the deity' },
      { name: 'Ashtottara Archana', price: 200, description: '108-name archana with offerings' }
    ]
  },
  {
    name: 'Srisailam Mallikarjuna',
    location: 'Nandyal',
    state: 'Andhra Pradesh',
    emoji: '🏔',
    tag: 'Jyotirlinga',
    ticketPrice: 150,
    rating: 4.8,
    description: 'One of the 12 Jyotirlingas and 18 Shakti Peethas, located on the Nallamala hills.',
    availableSlots: [
      { time: '6:00 AM', capacity: 80 },
      { time: '8:00 AM', capacity: 80 },
      { time: '10:00 AM', capacity: 80 },
      { time: '12:00 PM', capacity: 80, booked: 80 },
      { time: '3:00 PM', capacity: 80 },
      { time: '5:00 PM', capacity: 80 }
    ],
    poojaTypes: [
      { name: 'Darshan Only', price: 0, description: 'General darshan' },
      { name: 'Abhishekam', price: 400, description: 'Sacred abhishekam to Shivalinga' },
      { name: 'Rudra Homam', price: 1200, description: 'Special fire ritual for Lord Shiva' }
    ]
  },
  {
    name: 'Kanaka Durga',
    location: 'Vijayawada',
    state: 'Andhra Pradesh',
    emoji: '🪔',
    tag: 'Shakti Peetha',
    ticketPrice: 100,
    rating: 4.7,
    description: 'Kanaka Durga temple on Indrakeeladri hill, one of the most important Shakti temples.',
    availableSlots: [
      { time: '5:30 AM', capacity: 60 },
      { time: '7:00 AM', capacity: 60 },
      { time: '9:00 AM', capacity: 60 },
      { time: '11:00 AM', capacity: 60 },
      { time: '4:00 PM', capacity: 60 },
      { time: '6:00 PM', capacity: 60 }
    ],
    poojaTypes: [
      { name: 'Darshan Only', price: 0, description: 'General darshan' },
      { name: 'Kumkuma Archana', price: 250, description: 'Special archana with kumkuma' },
      { name: 'Sahasranama Archana', price: 350, description: '1000 names archana' }
    ]
  },
  {
    name: 'Yadagirigutta Narasimha',
    location: 'Yadadri',
    state: 'Telangana',
    emoji: '⛩',
    tag: 'Newly rebuilt',
    ticketPrice: 200,
    rating: 4.8,
    description: 'Recently renovated temple of Lord Lakshmi Narasimha Swamy on Yadagiri hill.',
    availableSlots: [
      { time: '6:00 AM', capacity: 75 },
      { time: '8:00 AM', capacity: 75 },
      { time: '10:00 AM', capacity: 75, booked: 75 },
      { time: '12:00 PM', capacity: 75 },
      { time: '3:00 PM', capacity: 75 },
      { time: '5:00 PM', capacity: 75 }
    ],
    poojaTypes: [
      { name: 'Darshan Only', price: 0, description: 'General darshan' },
      { name: 'Abhishekam', price: 450, description: 'Panchamruta abhishekam' },
      { name: 'Astadala Pada Padmaradhana', price: 800, description: 'Special lotus feet pooja' }
    ]
  },
  {
    name: 'Bhadrachalam Ramaswamy',
    location: 'Bhadradri Kothagudem',
    state: 'Telangana',
    emoji: '🪷',
    tag: 'Ramaswamy',
    ticketPrice: 120,
    rating: 4.6,
    description: 'Famous Bhadrachalam temple on the banks of River Godavari, dedicated to Lord Rama.',
    availableSlots: [
      { time: '6:00 AM', capacity: 60 },
      { time: '8:00 AM', capacity: 60 },
      { time: '10:00 AM', capacity: 60 },
      { time: '3:00 PM', capacity: 60 },
      { time: '6:00 PM', capacity: 60 }
    ],
    poojaTypes: [
      { name: 'Darshan Only', price: 0, description: 'General darshan' },
      { name: 'Sitarama Kalyanam', price: 1000, description: 'Divine wedding of Sita and Rama' },
      { name: 'Ekantha Seva', price: 500, description: 'Special night service' }
    ]
  },
  {
    name: 'Annavaram Veera Venkata',
    location: 'East Godavari',
    state: 'Andhra Pradesh',
    emoji: '🌸',
    tag: 'Veera Venkata',
    ticketPrice: 80,
    rating: 4.5,
    description: 'Sri Veera Venkata Satyanarayana Swamy temple, a major pilgrimage site in AP.',
    availableSlots: [
      { time: '6:00 AM', capacity: 50 },
      { time: '8:00 AM', capacity: 50 },
      { time: '10:00 AM', capacity: 50 },
      { time: '4:00 PM', capacity: 50 },
      { time: '6:00 PM', capacity: 50 }
    ],
    poojaTypes: [
      { name: 'Darshan Only', price: 0, description: 'General darshan' },
      { name: 'Satyanaraya Vratha Pooja', price: 600, description: 'Full Satyanaraya pooja ritual' }
    ]
  }
];

const seedDB = async () => {
  try {
    await Temple.deleteMany({});
    await Temple.insertMany(temples);
    console.log('Temples seeded successfully!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDB();
