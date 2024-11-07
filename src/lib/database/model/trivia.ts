// models/Trivia.js
import mongoose from 'mongoose';

const TriviaSchema = new mongoose.Schema({
  question: { type: String, required: true, maxlength: 300 },
  A: { type: String, required: true, maxlength: 255 },
  B: { type: String, required: true, maxlength: 255 },
  C: { type: String, required: true, maxlength: 255 },
  D: { type: String, required: true, maxlength: 255 },
  answer: { type: String, required: true, maxlength: 255 },
  difficulty: { type: String, required: true, maxlength: 255 },
  category: { type: String, required: true, maxlength: 255 },
});

export const Trivia= mongoose.models.trivia || mongoose.model('trivia', TriviaSchema);
