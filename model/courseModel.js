const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Course name is required.'],
    },
    description: {
        type: String,
        required: [true, 'Course description is required.'],
    },
    price: {
        type: Number,
        required: [true, 'Course price is required.'],
    },
    duration: {
        type: String,
        required: [true, 'Course duration is required.'],
    },
    level: {
        type: String,
        required: [true, 'Course level is required.'],
    },
    topics: {
        type: [String],
        required: [true, 'At least one topic is required.'],
    },
    schedule: {
        startDate: {
            type: Date,
            required: [true, 'Course start date is required.'],
        },
        endDate: {
            type: Date,
            required: [true, 'Course end date is required.'],
        },
        classDays: {
            type: [String],
            required: [true, 'At least one class day is required.'],
        },
        classTime: {
            type: String,
            required: [true, 'Class time is required.'],
        },
    },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
