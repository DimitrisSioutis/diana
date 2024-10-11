import mongoose from 'mongoose';

// Define schema for fixtures
const fixtureSchema = new mongoose.Schema({
  home: { type: String, required: true },
  away: { type: String, required: true },
  homelogo: { type: String, required: true },
  awaylogo: { type: String, required: true },
  date: { type: String, required: true },
  score: { type: String, required: false },  // Optional
  highlights: { type: String, required: false },  // Optional (YouTube video URL)
});

// Create and export the Fixture model
export const Fixture = mongoose.model('Fixture', fixtureSchema);

