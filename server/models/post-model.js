import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "https://via.placeholder.com/600x400?text=Blog+Post",
    },
    category: {
      type: String,
      default: "uncategorized",
      enum: [
        "technology",
        "business",
        "health",
        "travel",
        "food",
        "lifestyle",
        "education",
        "entertainment",
        "sports",
        "other",
        "uncategorized",
      ],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    numberOfLikes: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

postSchema.index({ title: "text", content: "text" });

postSchema.virtual("formattedDate").get(function () {
  return this.createdAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

const Post = mongoose.model("Post", postSchema);

export default Post;
