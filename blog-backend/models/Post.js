import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters long'],
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    minlength: [10, 'Content must be at least 10 characters long'],
    maxlength: [10000, 'Content cannot exceed 10000 characters']
  },
  author: {
    type: String,
    default: 'Anonymous',
    trim: true,
    maxlength: [100, 'Author name cannot exceed 100 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  views: {
    type: Number,
    default: 0
  },
  tags: [{
    type: String,
    trim: true
  }],
  published: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Add text index for search functionality
postSchema.index({ title: 'text', content: 'text' });

// Virtual for post summary
postSchema.virtual('summary').get(function() {
  return this.content.substring(0, 150) + '...';
});

// Instance method to increment views
postSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

// Static method to find by author
postSchema.statics.findByAuthor = function(author) {
  return this.find({ author: author });
};

const Post = mongoose.model('Post', postSchema);

export default Post;
