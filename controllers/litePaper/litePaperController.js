import ErrorHandler from "../../utils/errorHandler.js";
import litePaperModel from "../../models/litePaper/litePaperModel.js";

import dotenv from "dotenv";
import e from "express";
dotenv.config();
const litePaperController = {};

litePaperController.addLitePaper = async (req, res, next) => {
    try {
        let { heading, content } = req.body
        const litePapers = await litePaperModel.find();
        if (litePapers.length > 0) {
            return next(new ErrorHandler("Lite Paper already added", 400));
        }else{
            let conntent = {
                heading: heading,
                content: content,
            }
    
            const user = await litePaperModel.create(conntent);
            let message = "Content added successfully";
    
            res.status(201).json({
                success: true,
                statusCode: 201,
                msg: message,
                user: user
            });
        }
     
    } catch (error) {
        res.status(400).json({
            success: true,
            error: error.message,
        });
    }
};

litePaperController.editLitePaper = async (req, res, next) => {
    try {
        const { _id } = req.body;

        // Find the document by its _id
        const member = await litePaperModel.findById(_id);

        if (!member) {
            return next(new ErrorHandler("Data not found", 400));
        }

        // Update the document and await the result
        const update = await litePaperModel.findByIdAndUpdate(_id, req.body, {
            new: true,
        });

        res.status(200).json({
            success: true,
            data: update,
            statusCode: 200
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
};


litePaperController.deleteLitePaper = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return next(new ErrorHandler("Please provide the ID of the document to delete", 400));
        }
        const member = await litePaperModel.findById(id);
        if (!member) {
            return next(new ErrorHandler("Data not found", 404));
        }
        await litePaperModel.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Document deleted successfully",
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
};

litePaperController.getAllLitePapers = async (req, res, next) => {
    try {
        const litePapers = await litePaperModel.find();
        res.status(200).json({
            success: true,
            data: litePapers,
            statusCode: 200
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

export default litePaperController;
