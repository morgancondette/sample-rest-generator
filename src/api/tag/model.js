import mongoose, { Schema } from 'mongoose'

const tagSchema = new Schema({
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
  articles: [{ type: Schema.Types.ObjectId, ref: 'Article' }]
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

tagSchema.methods = {
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
      articles: this.articles,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Tag', tagSchema)

export const schema = model.schema
export default model
