import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  address: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ['user', 'admin', 'company'],
    default: 'user',
  },
});

UserSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model('User', UserSchema);
