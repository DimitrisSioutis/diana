import mongoose from 'mongoose';

const articleSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    img:{
        type: String,
        required: true
    }
  },
  {
    timestamps: true,
  }
);

export const Article = mongoose.model('article', articleSchema);