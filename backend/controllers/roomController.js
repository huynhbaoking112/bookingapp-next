const Room = require("../models/Room");
const { verifyToken, verifyTokenAdmin } = require("../middlewares/verifyToken");

const roomController = require("express").Router();

//getall

roomController.get("/", async (req, res) => {
  try {
    const type = req.query.type; //xac dinh loai localhost:3000/room?type=home
    let rooms;
    if (type) {
      rooms = await Room.find({ type: type }).limit(15); //gioi han 15 gia tri xuat
    } else {
      rooms = await Room.find({}).limit(15);
    }
    res.status(200).json(rooms);
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
});

//Dem so phong cua type
roomController.get("/find/types", async (req, res) => {
  try {
    const apartment = await Room.find({ type: "apartment" }).countDocuments();
    const villa = await Room.find({ type: "villa" }).countDocuments();
    const penthouse = await Room.find({ type: "penthouse" }).countDocuments();
    const bungalow = await Room.find({ type: "bungalow" }).countDocuments();

    res.status(200).json({ apartment, villa, bungalow, penthouse });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
});

//getone
roomController.get("/find/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const room = await Room.findById(id);
    if (!room) {
      return res.status(404).json({
        status: "Fail",
        message: "Can't found the room",
      });
    }
    res.status(200).json(room);
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
});

//create
roomController.post("/", verifyTokenAdmin, async (req, res) => {
  try {
    const createRoom = await Room.create(req.body);
    res.status(201).json(createRoom);
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
});

//update

roomController.patch("/:id", verifyTokenAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const updatedRoom = await Room.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json(updatedRoom);
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
});

//delete
roomController.delete("/:id", verifyTokenAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    await Room.findByIdAndDelete(id);
    res.status(200).json({
      status: "success",
      message: "Successfully deleted room",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
});

//book
roomController.patch("/bookRoom/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params["id"];
    const room = await Room.findById(id);
    let {arrayli} = req.body;
    // room.unavailableDates=[]
    room.unavailableDates.push(arrayli);
    room.save();
    res.status(201).json(arrayli);
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
});

module.exports = roomController;
