const db = require('../models');

// Create a flight
const createFlight = async (req, res) => {
    try {
        // Extract flight data from request body
        const { studentId, instructorId, assetId, startDate, endDate } = req.body;

        // Create the flight in the database
        const newFlight = await db.Flight.create({
            studentId,
            instructorId,
            assetId,
            startDate,
            endDate,
            active: true,
        });

        res.status(201).json({ message: 'Flight created successfully', flight: newFlight });
    } catch (error) {
        res.status(500).json({ error: `Failed to create flight: ${error.message}` });
    }
};

// Edit a flight
const editFlight = async (req, res) => {
    try {
        // Extract flight ID and updated data from request body
        const { id } = req.params;
        const { studentId, instructorId, assetId, startDate, endDate } = req.body;

        // Find the flight in the database
        const flight = await db.Flight.findByPk(id);

        if (!flight) {
            return res.status(404).json({ error: 'Flight not found' });
        }

        // Update the flight's data
        flight.studentId = studentId;
        flight.instructorId = instructorId;
        flight.assetId = assetId;
        flight.startDate = startDate;
        flight.endDate = endDate;

        // Save the updated flight in the database
        await flight.save();

        res.json({ message: 'Flight updated successfully', flight });
    } catch (error) {
        res.status(500).json({ error: `Failed to edit flight: ${error.message}` });
    }
};

// Delete a flight
const deleteFlight = async (req, res) => {
    try {
        // Extract flight ID from request parameters
        const { id } = req.params;

        // Find the flight in the database
        const flight = await db.Flight.findByPk(id);

        if (!flight) {
            return res.status(404).json({ error: 'Flight not found' });
        }

        // Delete the flight from the database
        await flight.destroy();

        res.json({ message: 'Flight deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: `Failed to delete flight: ${error.message}` });
    }
};

// Complete a flight
const completeFlight = async (req, res) => {
    try {
        // Extract flight ID and total time from request body
        const { id } = req.params;
        const { totalTime } = req.body;

        // Find the flight in the database
        const flight = await db.Flight.findByPk(id);

        if (!flight) {
            return res.status(404).json({ error: 'Flight not found' });
        }

        // Update the flight's total time and set it to inactive
        flight.totalTime = totalTime;
        flight.active = false;

        // Save the updated flight in the database
        await flight.save();

        res.json({ message: 'Flight completed successfully', flight });
    } catch (error) {
        res.status(500).json({ error: `Failed to complete flight: ${error.message}` });
    }
};

module.exports = {
    createFlight,
    editFlight,
    deleteFlight,
    completeFlight
};
