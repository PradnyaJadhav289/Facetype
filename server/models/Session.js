import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    
    typedText: {
      type: String
    },
    expressionLogs: [
      {
        expression: String,
        timestamp: Date
      }
    ],
    duration: {
      type: Number
    }
  },
  { timestamps: true }
);

const Session = mongoose.model("Session", sessionSchema);
export default Session;
