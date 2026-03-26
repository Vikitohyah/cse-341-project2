const { response } = require('express');
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db().collection('courses').find();
        const courses = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    
}

const getSingle = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json({ message: "Must use a valid course ID" });
            return;
        }

        const courseId = new ObjectId(req.params.id);
        const course = await mongodb.getDatabase().db().collection('courses').findOne({_id: courseId });
        
        if (!course) {
            res.status(404).json({ message: "No course found with the given ID" });
            return;
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(course);
        
    } catch (err) {
        res.status(500).json({ message: err.message });   
    }
        
}

const createCourses = async (req, res) => {
    try {
        //swagger.tags=['courses']
        const courses = {
            courseCode: req.body.courseCode,
            courseName: req.body.courseName,
            creditUnits: req.body.creditUnits,
            lecturer: req.body.lecturer,
            department: req.body.department
        };
    
        const response = await mongodb.getDatabase().db().collection('courses').insertOne(courses);
        if (response.acknowledged) {
            res.status(204).send();
        }else {
            res.status(500).json({ message: "Some error occurred while creating course" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const updateCourses = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json({ message: "Must use a valid course ID to update" });
            return;
        }
        //swagger.tags=['courses']
        const courses = {
            courseCode: req.body.courseCode,
            courseName: req.body.courseName,
            creditUnits: req.body.creditUnits,
            lecturer: req.body.lecturer,
            department: req.body.department
        }
    
        const courseId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('courses').replaceOne({_id: courseId }, courses);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        }else {
            res.status(500).json({ message: "Some error occurred while updating course" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const deleteCourses = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json({ message: "Must use a valid course ID to delete" });
            return;
        }
        //swagger.tags=['courses']
        const courseId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('courses').deleteOne({_id: courseId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        }else {
            res.status(500).json({ message: "Some error occurred while deleting course" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { getAll, getSingle, createCourses, updateCourses, deleteCourses}