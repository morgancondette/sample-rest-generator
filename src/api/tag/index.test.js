import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Tag } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, tag

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  tag = await Tag.create({ created_by: user })
})

test('POST /tags 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, title: 'test', slug: 'test', content: 'test', cover: 'test', visible: 'test', meta_title: 'test', meta_description: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.title).toEqual('test')
  expect(body.slug).toEqual('test')
  expect(body.content).toEqual('test')
  expect(body.cover).toEqual('test')
  expect(body.visible).toEqual('test')
  expect(body.meta_title).toEqual('test')
  expect(body.meta_description).toEqual('test')
  expect(typeof body.created_by).toEqual('object')
})

test('POST /tags 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /tags 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].created_by).toEqual('object')
})

test('GET /tags 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /tags/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${tag.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(tag.id)
  expect(typeof body.created_by).toEqual('object')
})

test('GET /tags/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${tag.id}`)
  expect(status).toBe(401)
})

test('GET /tags/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /tags/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${tag.id}`)
    .send({ access_token: userSession, title: 'test', slug: 'test', content: 'test', cover: 'test', visible: 'test', meta_title: 'test', meta_description: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(tag.id)
  expect(body.title).toEqual('test')
  expect(body.slug).toEqual('test')
  expect(body.content).toEqual('test')
  expect(body.cover).toEqual('test')
  expect(body.visible).toEqual('test')
  expect(body.meta_title).toEqual('test')
  expect(body.meta_description).toEqual('test')
  expect(typeof body.created_by).toEqual('object')
})

test('PUT /tags/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${tag.id}`)
    .send({ access_token: anotherSession, title: 'test', slug: 'test', content: 'test', cover: 'test', visible: 'test', meta_title: 'test', meta_description: 'test' })
  expect(status).toBe(401)
})

test('PUT /tags/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${tag.id}`)
  expect(status).toBe(401)
})

test('PUT /tags/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, title: 'test', slug: 'test', content: 'test', cover: 'test', visible: 'test', meta_title: 'test', meta_description: 'test' })
  expect(status).toBe(404)
})

test('DELETE /tags/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${tag.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /tags/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${tag.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /tags/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${tag.id}`)
  expect(status).toBe(401)
})

test('DELETE /tags/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
