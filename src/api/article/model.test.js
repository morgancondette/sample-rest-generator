import { Article } from '.'
import { User } from '../user'

let user, article

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  article = await Article.create({ created_by: user, title: 'test', slug: 'test', content: 'test', cover: 'test', visible: 'test', meta_title: 'test', meta_description: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = article.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(article.id)
    expect(typeof view.created_by).toBe('object')
    expect(view.created_by.id).toBe(user.id)
    expect(view.title).toBe(article.title)
    expect(view.slug).toBe(article.slug)
    expect(view.content).toBe(article.content)
    expect(view.cover).toBe(article.cover)
    expect(view.visible).toBe(article.visible)
    expect(view.meta_title).toBe(article.meta_title)
    expect(view.meta_description).toBe(article.meta_description)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = article.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(article.id)
    expect(typeof view.created_by).toBe('object')
    expect(view.created_by.id).toBe(user.id)
    expect(view.title).toBe(article.title)
    expect(view.slug).toBe(article.slug)
    expect(view.content).toBe(article.content)
    expect(view.cover).toBe(article.cover)
    expect(view.visible).toBe(article.visible)
    expect(view.meta_title).toBe(article.meta_title)
    expect(view.meta_description).toBe(article.meta_description)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
