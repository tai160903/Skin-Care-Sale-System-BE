const User = require("../models/user");
const bcrypt = require("bcrypt");

const userRepository = {
  findAll: async () => {
    return await User.find();
  },
  findByEmail: async (email) => {
    return await User.findOne({ email });
  },
  findById: async (id) => {
    return await User.findById(id);
  },
  updateById: async (id, update) => {
    return await User.updateOne({ _id: id }, { $set: update });
  },
  findAllStaff : async () => {
    try {
        const staffList = await User.find({ role: "staff" });
        
        return staffList;
    } catch (error) {
        console.error("Error fetching staff:", error.message);
        throw error;
    }
},

createEmployee: async (data) => {
    try {
       const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data.password, salt);
      data.password = hashedPassword;
      const newUser = await User.create({
        email: data.email,
        password: data.password,
        role: "staff",
        isVerify : true , 
    });
    return newUser;
    } catch (error) {
        console.error("Error creating employee:", error.message);
        throw error;
    }
  },

  create: async (userData) => {
    return await User.create(userData);
  },
};

module.exports = userRepository;
