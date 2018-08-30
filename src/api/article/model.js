import mongoose, { Schema } from 'mongoose'

const articleSchema = new Schema({
  created_by: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String
  },
  slug: {
    type: String
  },
  content: {
    type: String
  },
  cover: {
    type: String
  },
  visible: {
    type: Boolean
  },
  meta_title: {
    type: String
  },
  meta_description: {
    type: String
  },
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }]
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

articleSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      created_by: this.created_by.view(full),
      title: this.title,
      slug: this.slug,
      content: this.content,
      cover: this.cover,
      visible: this.visible,
      meta_title: this.meta_title,
      meta_description: this.meta_description,
      tags: this.tags,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Article', articleSchema)

export const schema = model.schema
export default model