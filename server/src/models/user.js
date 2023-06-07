import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: '',
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    default: '',
  },
  department: {
    type: String,
    default: '',
  },
  doj: {
    type: String,
    default: '',
  },
  role: {
    type: String,
    required: true,
  },
});

export default mongoose.model('User', userSchema);
