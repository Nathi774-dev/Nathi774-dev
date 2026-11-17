import mongoose from "mongoose";
import Reservation from "../models/reservation.js";
import { locations } from "../config/locations.js";

// GET for /api/reservations/locations
export const getLocations = async (req, res) => {
    return res.status(200).json({
        locations
    })
}

// GET /api/reservations/availability
export const getAvailableTables = async (req, res) => {
    try {
        const { locationId, date, time, guests } = req.query
        if (!locationId || !date || !time || !guests) {
            return res.status(400).json({
                message: "Please provide a name, date, time and amount of guests please."
            })
        }

        const location = locations.find(item => item.id === locationId)
        if (!location) {
            return res.status(404).json({
                message: 'Restuarant location not found.'
            });
        }

        const guestCount = Number(guests);

        // you can only have a maximum of 12 guests
        if (!Number.isInteger(guestCount) || guestCount < 1 ||  guestCount > 12) {
            return res.status(400).json({
                message: 'Guest count must be between 1 to 12 guests'
            });
        }
        const reservedTables = await Reservation.find({
            locationId,
            date,
            time,
            status: 'confirmed'
        }).select("tableId")

        const reservedIds = reservedTables.map(reservation => reservation.tableId)
        const availableTables = location.tables.filter(table => 
            table.seats >= guestCount && !reservedIds.includes(table.id)
        )

        return res.status(200).json({
            count: availableTables.length,
            availableTables
        })
    } catch (err) {
        console.error("Availability error: ", err)
        return res.status(500).json({
            message: 'Unable to check table availability'
        })
    }
}

// POST for /api/reservations
export const createReservation = async (req, res) => {
    try {
        const {
            locationId,
            tableId,
            date,
            time,
            guests
        } = req.body

        if (
            !locationId || tableId === undefined || !date || !time || guests === undefined
        ) {
            return res.status(400).json({
                message: "Please provide all reservation details."
            })
        }

        const location = locations.find(item => item.id === locationId)
        if (!location) {
            return res.status(404).json({
                message: "Restuarant location is not available"
            })
        }

        const table = location.tables.find(item => item.id === tableId)
        if (!table) {
            return res.status(404).json({
                message: "Table not found at this location."
            })
        }

        const guestCount = Number(guests)
        if (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > table.seats) {
            return res.status(400).json({
                message: "The selected table cannot accomodate this number of guests."
            })
        }

        // Validate date and time formats
        if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) {
            return res.status(400).json({
                message: 'Invalid reservation date or time'
            })
        }

        const newReservation = await Reservation.create({
            user: req.user.id,
            locationId,
            tableId: Number(tableId),
            date,
            time,
            guests: guestCount
        })

        return res.status(201).json({
            message: 'Reservation successfully created.',
            reservation: newReservation
        })
    } catch (err) {
        console.error('Create reservation error: ', err)
        if (err.code === 11000) {
            return res.status(409).json({
                message: "This table has already been reserved for that date and time"
            })
        }

        return res.status(500).json({
            message: "There was an error while trying to reserve a new table"
        })
    }
}

// GET for /api/reservations/my-reservation
export const getMyReservation = async (req, res) => {
    try {
        const reservations = await Reservation.find({ user: req.user.id }).sort({ date: 1, time: 1 })
        return res.status(200).json({
            count: reservations.length,
            message: "Successfully retrieved your reservations",
            reservations
        })
    } catch (err) {
        console.error("Get reservations error: ", err)
        return res.status(500).json({
            message: "Unable to receive your reservation"
        })
    }
}

// DELETE for /api/reservations/:id
// This cancels the customer's own reservations
export const cancelReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findOne({
            _id: req.params.id,
            user: req.user.id,
            status: "confirmed"
        })

        if (!reservation) {
            return res.status(404).json({
                message: "Reservation not found or already cancelled"
            })
        }

        reservation.status = "cancelled"
        await reservation.save()

        return res.status(200).json({
            message: "Reservation successfully cancelled"
        })
    } catch (err) {
        console.error("Cancel reservation error: ", err)
        return res.status(500).json({
            message: 'Unable to cancel reservation'
        })
    }
}