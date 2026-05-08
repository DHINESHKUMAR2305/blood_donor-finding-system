
const Request = require("../models/Request");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

exports.createRequest = async (req, res) => {
  try 
  {
    const { bloodGroup, units, location, message } = req.body;

    const newRequest = await Request.create(
    {
      requester: req.user,
      bloodGroup,
      units,
      location,
      message,
    });

    const donors = await User.find(
    {
      bloodGroup,
      isAvailable: true,
    });

    const requester = await User.findById(req.user);

    for (let donor of donors) 
    {
      const emailText = `
      Urgent Blood Request 🚨

      Name: ${requester.name}
      Phone: ${requester.phone}
      Address: ${location}

      Required Blood Group: ${bloodGroup}
      Units: ${units}

      Message: ${message || "Please help urgently"}

      Please contact immediately 🙏
      `;

      await sendEmail(donor.email, "Blood Request", emailText);
    }

    res.json(
    {
      message: "Request Sent Successfully ✅",
      request: newRequest,
    });
  } 
  catch(error) 
  {
    res.status(500).json({ message: "Server Error ❌" });
  }
};

exports.getMyRequests = async (req, res) => 
{
  try 
  {
    const requests = await Request.find({ requester: req.user });

    res.json(requests);
  } 
  catch(error) 
  {
    res.status(500).json({ message: "Server Error ❌" });
  }
};