const Subject = require("../models/Subject");
const asyncHandler = require('express-async-handler');


const create = asyncHandler(
    async (req, res) =>{
        try{
            const {description} = req.body;

            const findSubject = await Subject.create({description: description});

            if(!findSubject){
                const createSubject = await Subject.create(req.body)
            }else{
                throw new Error('subject exists');
            }
            res.json(findSubject);
        }catch(err){
            throw new Error(err);
        }
    }
);

const getAllSubjects = asyncHandler(
    async (req,  res) =>{
        try {
            const findSubjects = await Subject.find();
            
            res.json(findSubjects);
        } catch (error) {
            throw new Error(err);
        }
    }
);

const getSubjectById = asyncHandler(
    async (req, res) => {
        const {id} = req.params;
        try {
            const findSubject = await Subject.findById(id);
            
            res.json(findSubject);
        } catch (error) {
            throw new Error(err);
        }
    }
);


const updateSubject = asyncHandler(
    async (req, res) => {
        const {id} = req.params;
        try {
            const updateSub = Subject.findByIdAndUpdate(id, 
                {
                    description:req?.body?.description
                },
                {
                    new: true,
                }
            );
            res.json(updateSub);
        } catch (error) {
            throw new Error(err);
        }
    }
);

const deleteSubject = asyncHandler(
    async (req, res) => {
        const {id} = req.params;
        try {
            const deleteSub = Subject.findByIdAndDelete(id);
            res.json(deleteSub);  
        } catch (error) {
            throw new Error(err);
        }
    }
);


module.exports = {create, getAllSubjects, getSubjectById, updateSubject, deleteSubject};