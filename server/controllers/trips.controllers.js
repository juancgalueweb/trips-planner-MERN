const TripModel = require("../models/trip.model");

//Method to create a trip
const createTrip = async (req, res) => {
  try {
    const singleTrip = await TripModel.create(req.body);
    return res.json(singleTrip);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Method to find all trips
const getAllTrips = async (req, res) => {
  try {
    const allTrips = await TripModel.find({});
    return res.json(allTrips);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Method to find a trip by user ID
const getTripByUser = async (req, res) => {
  try {
    const tripsUser = await TripModel.find({ author: req.params.id });
    return res.json(tripsUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Method to find a trip by its ID
const getTripById = async (req, res) => {
  try {
    const getSingleTrip = await TripModel.findById({ _id: req.params.id });
    return res.json(getSingleTrip);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Method to delete a trip by its ID
const deleteTripById = async (req, res) => {
  try {
    await TripModel.deleteOne({ _id: req.params.id });
    return res.json({ message: "Trip successfully deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
};

//Method to update a trip by its ID
const updateTripById = async (req, res) => {
  try {
    const updatedTrip = await TripModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    return res.json(updatedTrip);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createTrip,
  getAllTrips,
  getTripByUser,
  getTripById,
  deleteTripById,
  updateTripById,
};
