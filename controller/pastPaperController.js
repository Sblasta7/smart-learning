const asyncHandler = require('express-async-handler');
const PastPaper = require('../models/PastPaper');
const validateMongodbId = require('../utils/validateMongodbid');

const create = asyncHandler(
    async (req, res) =>{
        const {description} = req.body;
        try {
            const findPastPaper = PastPaper.findOne({description: description});

            if (!findPastPaper){
                const createPastPaper = PastPaper.create(req.body);
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
        const {id} = req.body;
        try {
            const findPastPaper = PastPaper.findById(id);
            res.json(findPastPaper);
        } catch (error) {
            throw new Error(error);
        }
    }
);

const getAllPastPapers = asyncHandler(
    async (req, res) =>{

        try {
            const findAll = PastPaper.find();
            res.json(findAll);
        } catch (error) {
            throw new Error(error);
        }
    }
);


const updatePastPaper = asyncHandler(
    async (req, res) =>{
        const {id} = req.body;
        
        try {
            const updatePaper = PastPaper.findByIdAndUpdate(id,
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
            const deletePaper = PastPaper.findByIdAndDelete(id);
            res.json(deletePaper);
        } catch (error) {
            throw new Error(error);
        }
    }
);

module.export = { create, findById, getAllPastPapers, updatePastPaper, deletePastPaper };