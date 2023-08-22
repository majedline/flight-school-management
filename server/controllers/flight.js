const db = require('../models');
const { QueryTypes } = require('sequelize');
const dayjs = require('dayjs')


// const Flight = db.flight;
// const Instructor = db.instructor;
// const Student = db.student;

const getActiveFlightsExpandedQuery =
  `select f.flightID, s.studentID, i.instructorID, a.assetID, 
f.startDate, f.endDate, f.totalTime, f.active, f.flightStatus,
s.firstName as 'studentFirstName', s.middleName  as 'studentMiddleName', s.lastName  as 'studentLastName', s.email  as 'studentEmail',
i.firstName as 'instructorFirstName', i.middleName as 'instructorMiddleName', i.lastName as 'instructorLastName', i.email as 'instructorEmail',
a.name as 'assetName', a.type as 'assetType', a.callSign as 'assetCallSign'
from flights f
inner join students s on f.studentId = s.studentID
inner join instructors i on f.instructorId = i.instructorID
inner join assets a  on f.assetId = a.assetID
where f.active = true`;

const getActiveFlights = async (req, res) => {
  try {
    const flights = await db.sequelize.query(
      getActiveFlightsExpandedQuery,
      { type: QueryTypes.SELECT }
    );


    res.json({ flights });
  } catch (error) {
    res.status(500).json({ error: `Failed to get active flight: ${error.message}` });
  }
};


// Create a flight
const createFlight = async (req, res) => {
  console.log("createFlight");
  try {
    // Extract flight data from request body
    const { studentID, instructorID, assetID, startDate, endDate } = req.body;
    console.log(studentID, instructorID, assetID, startDate, endDate)

    // Create the flight in the database
    const newFlight = await db.flight.create({
      studentID,
      instructorID,
      assetID,
      startDate,
      endDate,
      active: true,
    });

    res.status(201).json({ message: 'Flight created successfully', flight: newFlight });
  } catch (error) {
    res.status(500).json({ error: `Failed to create flight: ${error.message}` });
  }
};


// Create a flight
const editFlight = async (req, res) => {
  console.log("editFlight");
  await updateFlightRecord(req, res, "EDIT");
};


const deleteFlight = async (req, res) => {
  console.log("deleteFlight");
  await updateFlightRecord(req, res, "DELETE");

}

const completeFlight = async (req, res) => {
  console.log("completeFlight");
  await updateFlightRecord(req, res, "COMPLETE");
}


const cancelFlight = async (req, res) => {
  console.log("cancelFlight");
  await updateFlightRecord(req, res, "CANCEL");
}

const updateFlightRecord = async (req, res, saveType) => {
  console.log("updateFlightRecord", saveType);
  try {
    // Get the flightID paramater
    const { flightID } = req.params;

    // Extract flight data from request body
    const { studentID, instructorID, assetID, startDate, endDate } = req.body;

    // Find the flight. Return an error if not found.
    const flight = await db.flight.findByPk(flightID);
    if (!flight) {
      return res.status(404).json({ error: 'Flight not found' });
    }

    console.log("Got the flight", flight);

    flight.studentID = studentID;
    flight.instructorID = instructorID;
    flight.assetID = assetID;
    flight.startDate = startDate;
    flight.endDate = endDate;


    flight.flightStatus = saveType;

    if (saveType === "COMPLETE") {
      flight.totalTime = (dayjs(endDate).diff(dayjs(startDate))) / 60000; // calculates the time in minutes
      flight.active = false;

    } else if (saveType === "DELETE" || saveType === "CANCEL") {
      flight.totalTime = 0;
      flight.active = false;

    } else if (saveType === "EDIT") {
      flight.totalTime = 0;
      flight.active = true;
    }
    //  Save the updated flight in the database
    await flight.save();

    res.status(201).json({ message: `${saveType} Flight Successfull`, flight: flight });
  } catch (error) {
    res.status(500).json({ error: `${saveType} Flight Failed: ${error.message}` });
  }
}


// const getAllFlights = async (req, res) => {
//     try {
//         // Fetch all flights with associated student, instructor, and asset data
//         const flights = await Flight.findAll({
//             include: [
//                 {
//                     model: Student,
//                     attributes: ['idStudent', 'firstName', 'lastName'],
//                 },
//                 {
//                     model: Instructor,
//                     attributes: ['idInstructor', 'firstName', 'lastName'],
//                 },
//                 // Add more includes for other related models like assets if needed
//             ],
//         });

//         // Extract the required data for each flight
//         const flightList = flights.map((flight) => ({
//             id: flight.id,
//             student: flight.student ? flight.student.dataValues : null,
//             instructor: flight.instructor ? flight.instructor.dataValues : null,
//             // Add more properties for other related models like assets if needed
//         }));

//         return res.status(200).json(flightList);
//     } catch (error) {
//         console.error('Error fetching all flights:', error);
//         return res.status(500).json({ error: 'Internal server error' });
//     }
// }


// const getFlightDetails = async (req, res) => {
//     try {
//         const flightId = req.params.flightId; // Assuming you pass the flightId as a URL parameter

//         // Fetch the flight data with associated studentId, instructorId, and assetId
//         const flight = await Flight.findByPk(flightId, {
//             include: [
//                 {
//                     model: Student,
//                     attributes: ['idStudent', 'firstName', 'lastName'],
//                 },
//                 {
//                     model: Instructor,
//                     attributes: ['idInstructor', 'firstName', 'lastName'],
//                 },
//                 // Add more includes for other related models like assets if needed
//             ],
//         });

//         if (!flight) {
//             return res.status(404).json({ error: 'Flight not found' });
//         }

//         // Extracting the required data from the flight object
//         const student = flight.student ? flight.student.dataValues : null;
//         const instructor = flight.instructor ? flight.instructor.dataValues : null;
//         // Add more variables for other related models like assets if needed

//         // Create the response object containing the student, instructor, and asset details
//         const flightDetails = {
//             student,
//             instructor,
//             // Add more properties for other related models like assets if needed
//         };

//         return res.status(200).json(flightDetails);
//     } catch (error) {
//         console.error('Error fetching flight details:', error);
//         return res.status(500).json({ error: 'Internal server error' });
//     }
// }


module.exports = {

  getActiveFlights,
  createFlight,
  editFlight,
  deleteFlight,
  completeFlight,
  cancelFlight

};
