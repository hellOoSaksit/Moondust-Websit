import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['Member', 'Admin' , 'Editor' ],
    default: 'Member',
  },
});

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      console.error('Error hashing password:', error);
      throw error;
    }
  }
  next();
});

UserSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    console.error('Error comparing password:', error);
    throw error;
  }
};

const User = mongoose.model('User', UserSchema);

export default User;
