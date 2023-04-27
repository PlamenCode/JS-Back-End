const facilityController = require("express").Router();
const { body, validationResult} = require('express-validator');


const { hasRole } = require("../middlewares/guards");
const { getAllFacilities, addFacility } = require("../services/facilityService");
const { createFacility } = require("../services/facilityService");
const { getById } = require("../services/roomService");
const parseError = require("../utils/parser");


facilityController.get("/create", hasRole('admin'), (req, res) => {
    res.render("createFacility", {
        title: "Facility Create",
    });
});


facilityController.post("/create",
    hasRole('admin'),
    body('label').trim().notEmpty().withMessage('The label shoud be at least 1 cherecter long.'),
    body('iconUlr').trim(),
  async (req, res) => {
    const errors = validationResult(req);
    try {
        if(errors.length > 0){
            throw errors;
        }
        await createFacility(req.body.label, req.body.iconUrl);
        res.redirect("/catalog");
    } catch (err) {
        res.render("createFacility", {
            title: "Facility Create",
            error: parseError(err),
            body:{
                label: req.body.label,
                iconUrl: req.body.iconUrl
            }
        });
    }
});

facilityController.get("/:roomId/decorateRoom", async (req, res) => {
    const roomId = req.params.roomId;
    const room = await getById(roomId);

    if(!req.user || req.user._id != room.owner){
        return res.redirect('/auth/login')
    }

    const facilities = await getAllFacilities();
    facilities.forEach((f) => {
        if ( (room.facilities || []).some(( id ) => id.toString() == f._id.toString() )) {
            f.checked = true;
        }
    });

    res.render("decorate", {
        title: "Decorate Room Facilities",
        room,
        facilities,
    });
});

facilityController.post("/:roomId/decorateRoom", async (req, res) => {
    const roomId = req.params.roomId;
    const room = await getById(roomId);
    const ids = Object.keys(req.body);
    
    
    if(!req.user || req.user._id != room.owner){
        return res.redirect('/auth/login')
    }

    await addFacility(roomId, ids);
    res.redirect(`/facility/${roomId}/decorateRoom`);
});

module.exports = facilityController;
