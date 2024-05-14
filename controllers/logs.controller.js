import { asyncHandler } from "../utils/asyncHandler.js";
import { Log } from "../models/log.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const postLogs = asyncHandler(async (req, res) => {
  try {
    const logData = req.body;

    const validationResult = Log.validate(logData);

    if (validationResult.error) {
        return res.status(400).json(
          new ApiResponse(
            400,
            null,
            validationResult.error.message 
          )
        );
    }

    const log = new Log(logData);
    await log.save();

    return res.status(201).json(
      new ApiResponse(
        201,
        log,
        "Log created successfully"
      )
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json(
      new ApiResponse(
        500,
        null,
        "Internal Server Error"
      )
    )
  }
});


const getLogs = asyncHandler(async (req, res) => {
  try {
    let query = {};
    query = req.query;
    const logs = await Log.find(query);
    return res.status(200).json(
      new ApiResponse(
        200,
        logs,
        "Logs fetched successfully"
      )
    );
  } catch (error) {
    console.error("Error Fetching Logs" ,error);
    return res.status(500).json(
      new ApiResponse(
        500,
        null,
        "Internal Server Error"
      )
    )
  }
});

export { postLogs , getLogs};
