import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Tag } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Tag.create({ ...body, created_by: user })
    .then((tag) => tag.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Tag.find(query, select, cursor)
    .populate('created_by')
    .populate('articles')
    .then((tags) => tags.map((tag) => tag.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Tag.findById(params.id)
    .populate('created_by')
    .populate('articles')
    .then(notFound(res))
    .then((tag) => tag ? tag.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Tag.findById(params.id)
    .populate('created_by')
    .populate('articles')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'created_by'))
    .then((tag) => tag ? Object.assign(tag, body).save() : null)
    .then((tag) => tag ? tag.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Tag.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'created_by'))
    .then((tag) => tag ? tag.remove() : null)
    .then(success(res, 204))
    .catch(next)
