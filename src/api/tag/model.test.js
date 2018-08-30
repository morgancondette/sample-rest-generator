import { Tag } from '.'
import { User } from '../user'

let user, tag

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  tag = await Tag.create({ created_by: user, title: 'test', slug: 'test', content: 'test', cover: 'test', visible: 'test', meta_title: 'test', meta_description: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = tag.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(tag.id)
    expect(typeof view.created_by).toBe('object')
    expect(view.created_by.id).toBe(user.id)
    expect(view.title).toBe(tag.title)
    expect(view.slug).toBe(tag.slug)
    expect(view.content).toBe(tag.content)
    expect(view.cover).toBe(tag.cover)
    expect(view.visible).toBe(tag.visible)
    expect(view.meta_title).toBe(tag.meta_title)
    expect(view.meta_description).toBe(tag.meta_description)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = tag.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(tag.id)
    expect(typeof view.created_by).toBe('object')
    expect(view.created_by.id).toBe(user.id)
    expect(view.title).toBe(tag.title)
    expect(view.slug).toBe(tag.slug)
    expect(view.content).toBe(tag.content)
    expect(view.cover).toBe(tag.cover)
    expect(view.visible).toBe(tag.visible)
    expect(view.meta_title).toBe(tag.meta_title)
    expect(view.meta_description).toBe(tag.meta_description)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
