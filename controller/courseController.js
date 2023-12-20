const Course = require('../model/courseModel');

exports.getAllCourse = async (req, res) => {
    const courses = await Course.find({});
    res.status(200).json({
        status: 'success',
        length: courses.length,
        courses
    });
};

exports.CreateCourse = async (req, res) => {
    try {
        const course = await Course.create(req.body);
        res.status(201).json({
            status: 'success',
            course
        });
    } catch (err) {
        return res.status(400).json({
            status: 'error',
            message: 'Provide all fields'
        });
    }
};

exports.getCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({
            status: 'error',
            message: 'Invalid ID'
        });
        res.status(200).json({
            status: 'success',
            course
        });
    } catch (err) {
        return res.status(404).json({
            status: 'error',
            message: 'Invalid ID'
        });
    }
}

exports.deleteCourse = async (req, res) => {
    try {
        await Course.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success'
        });
    } catch (err) {
        return res.status(404).json({
            status: 'error',
            message: 'Invalid ID'
        });
    }
}

exports.updateCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body);
        if (!course) return res.status(404).json({
            status: 'error',
            message: 'Invalid ID'
        });
        res.status(200).json({
            status: 'success',
            course
        });
    } catch (err) {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid ID or fields'
        });
    }
}