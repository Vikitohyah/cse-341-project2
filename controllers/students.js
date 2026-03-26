const { response } = require('express');
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db().collection('students').find();
        const students = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    
}

const getSingle = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json({ message: "Must use a valid student ID" });
            return;
        }

        const studentId = new ObjectId(req.params.id);
        const student = await mongodb.getDatabase().db().collection('students').findOne({_id: studentId });
        
        if (!student) {
            res.status(404).json({ message: "No student found with the given ID" });
            return;
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(student);
        
    } catch (err) {
        res.status(500).json({ message: err.message });   
    }
    
}

const createStudents = async (req, res) => {
    try {
        //swagger.tags=['students']
        const student = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            gender: req.body.gender,
            email: req.body.email,
            course: req.body.course,
            level: req.body.level,
            gpa: req.body.gpa,
            dateJoined: req.body.dateJoined
        };

        const response = await mongodb.getDatabase().db().collection('students').insertOne(student);
        if (response.acknowledged) {
            res.status(204).send();
        }else {
            res.status(500).json({ message: "Some error occurred while creating student" });
        } 
        
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    
}

const updateStudents = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json({ message: "Must use a valid student ID to update" });
            return;
        }
    
        //swagger.tags=['students']
        const student = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            gender: req.body.gender,
            email: req.body.email,
            course: req.body.course,
            level: req.body.level,
            gpa: req.body.gpa,
            dateJoined: req.body.dateJoined
        }

        const studentId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('students').replaceOne({_id: studentId }, student);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        }else {
            res.status(400).json({ message: "Some error occurred while updating student" });
        }
        
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    
}

const deleteStudents = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json({ message: "Must use a valid student ID to delete" });
            return;
        }
        //swagger.tags=['students']
        const studentId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('students').deleteOne({_id: studentId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        }else {
            res.status(500).json({ message: "Some error occurred while deleting student" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { getAll, getSingle, createStudents, updateStudents, deleteStudents}