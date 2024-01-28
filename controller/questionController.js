const asyncHandler = require("express-async-handler");
const Question = require("../models/Question");
const validateMongodbId = require("../utils/validateMongodbid");


const create = asyncHandler(
    async (req, res) => {
        const {description} = req.body
        try{
            const findQuestion = Question.findOne({description: description});

            if(!findQuestion){
                const createQuestion = Question.create(req.body);

                res.json(createQuestion);
            }else{
                throw new Error('Question exists');
            }
        }catch(err){
            throw new Error(err);
        }
    }
);

const findById = asyncHandler(
    async (req, res) => {
        const {id} = req.params;
        validateMongodbId(id);
        try{
            const findQuestion = Question.findById(id);

            res.json(findQuestion);
            
        }catch(err){
            throw new Error(err);
        }
    }
);


const getAllQuestions = asyncHandler(
    async (req, res) => {
        try{
            const findQuestions = Question.find();

            res.json(findQuestions);
            
        }catch(err){
            throw new Error(err);
        }
    }
);


const updateQuestion = asyncHandler(
    
    async (req, res) => {
        const {id} = req.params;
        validateMongodbId(id);
        try{
            const updateQ = Question.findByIdAndUpdate(id, 
                {
                    description: req?.body?.description,
                    question_number: req?.body?.question_number,
                    image_url: req?.body?.image_url,
                    past_paper_id: req?.body?.past_paper_id,
                },
                {
                    new: true
                }
            );

            res.json(updateQ);
            
        }catch(err){
            throw new Error(err);
        }
    }
);


const deleteQuestion = asyncHandler(
    
    async (req, res) => {
        const {id} = req.params;
        validateMongodbId(id);
        try{
            const deleteQ = Question.findByIdAndDelete(id);

            res.json(deleteQ);
            
        }catch(err){
            throw new Error(err);
        }
    }
);

module.exports = { create,  findById, getAllQuestions, updateQuestion, deleteQuestion };
