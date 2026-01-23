import mongoose from "mongoose";

const mappingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    expression: {
      type: String,
      required: true
    },
    action: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const Mapping = mongoose.model("Mapping", mappingSchema);
export default Mapping;
