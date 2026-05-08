
const User = require("../models/User");

exports.getUserProfile = async (req, res)=> 
{
  try 
  {
    const user = await User.findById(req.user).select("-password");

    res.json(user);
  } 
  catch(error) 
  {
    res.status(500).json({ message: "Server Error ❌" });
  }
};

exports.updateUserProfile = async(req, res)=> 
{
  try 
  {
    const { phone, address, isAvailable, email } = req.body;

    const user = await User.findById(req.user);

    if(!user) 
    {
      return res.status(404).json({ message: "User not found" });
    }

    if(email && email !== user.email) 
    {
      const existingUser = await User.findOne({ email });

      if(existingUser) 
      {
        return res.status(400).json({ message: "Email already exists ❌" });
      }

      user.email = email;
    }

    user.phone = phone || user.phone;
    user.address = address || user.address;
    user.isAvailable = isAvailable ?? user.isAvailable;

    const updatedUser = await user.save();

    res.json({
      message: "Profile Updated ✅",
      user: updatedUser,
    });
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).json({ message: "Server Error ❌" });
  }
};


exports.searchDonors = async(req, res) => 
{
  try 
  {
    let { bloodGroup, city } = req.query;

    let filter = {};

    const escapeRegex = (text) => 
    {
      return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    };

    if(bloodGroup) 
    {
      bloodGroup = escapeRegex(bloodGroup.trim());

      filter.bloodGroup = 
      {
        $regex: `^${bloodGroup}$`,
        $options: "i",
      };
    }

    if(city) 
    {
      city = city.trim();

      filter.address = 
      {
        $regex: city,
        $options: "i",
      };
    }

    console.log("FILTER:", filter);

    const donors = await User.find(filter).select("-password");

    console.log("RESULT:", donors);

    res.json(donors);
  } 
  catch(error) 
  {
    console.error(error);
    res.status(500).json({ message: "Server Error ❌" });
  }
};