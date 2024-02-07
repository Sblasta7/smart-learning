const asyncHandler = require('express-async-handler');
const PastPaper = require('../models/PastPaper');
const validateMongodbId = require('../utils/validateMongodbid');

const create = asyncHandler(
    async (req, res) =>{
        const {description} = req.body;
        try {
            const findPastPaper = await PastPaper.findOne({description: description});

            if (!findPastPaper){
                const createPastPaper = await PastPaper.create(req.body);
                res.json(createPastPaper);
            }
            else{
                throw new Error('Past paper already exists');
            }
        } catch (error) {
            throw new Error(error);
        }
    }
);

const findById = asyncHandler(
    async (req, res) =>{
        const {id} = req.params;
        try {
            const findPastPaper = await PastPaper
                .findById(id)
                .populate('subject');
            res.json(findPastPaper);
        } catch (error) {
            throw new Error(error);
        }
    }
);

const getAllPastPapers = asyncHandler(
    async (req, res) =>{
        try 
        {
            const findAll = await PastPaper
                .find()
                .populate("subject");
            res.json(findAll);
        } catch (error) {
            throw new Error(error);
        }
        
    }
);

const subjectQuery = asyncHandler(
    async (req, res) =>{
        try{
            const findPastPapers = await PastPaper.find(req.query);
            res.json(findPastPapers);
        }catch(err){
            throw new Error(err);
        }
    }
);


const updatePastPaper = asyncHandler(
    async (req, res) =>{
        const {id} = req.body;
        
        try {
            const updatePaper = await PastPaper.findByIdAndUpdate(id,
                {
                    description: req?.body?.description
                },
                {
                    new: true
                }
            );
            res.json(updatePaper);
        } catch (error) {
            throw new Error(error);
        }
    }
);


const deletePastPaper = asyncHandler(
    async (req, res) =>{
        const {id} = req.body;
        
        try {
            const deletePaper = await PastPaper.findByIdAndDelete(id);
            res.json(deletePaper);
        } catch (error) {
            throw new Error(error);
        }
    }
);

module.exports = { create, findById, getAllPastPapers, updatePastPaper, deletePastPaper, subjectQuery };