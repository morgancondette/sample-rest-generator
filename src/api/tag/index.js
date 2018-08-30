import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Tag, { schema } from './model'

const router = new Router()
const { title, slug, content, cover, visible, meta_title, meta_description } = schema.tree

/**
 * @api {post} /tags Create tag
 * @apiName CreateTag
 * @apiGroup Tag
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam title Tag's title.
 * @apiParam slug Tag's slug.
 * @apiParam content Tag's content.
 * @apiParam cover Tag's cover.
 * @apiParam visible Tag's visible.
 * @apiParam meta_title Tag's meta_title.
 * @apiParam meta_description Tag's meta_description.
 * @apiSuccess {Object} tag Tag's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Tag not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ title, slug, content, cover, visible, meta_title, meta_description }),
  create)

/**
 * @api {get} /tags Retrieve tags
 * @apiName RetrieveTags
 * @apiGroup Tag
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} tags List of tags.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /tags/:id Retrieve tag
 * @apiName RetrieveTag
 * @apiGroup Tag
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} tag Tag's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Tag not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /tags/:id Update tag
 * @apiName UpdateTag
 * @apiGroup Tag
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam title Tag's title.
 * @apiParam slug Tag's slug.
 * @apiParam content Tag's content.
 * @apiParam cover Tag's cover.
 * @apiParam visible Tag's visible.
 * @apiParam meta_title Tag's meta_title.
 * @apiParam meta_description Tag's meta_description.
 * @apiSuccess {Object} tag Tag's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Tag not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ title, slug, content, cover, visible, meta_title, meta_description }),
  update)

/**
 * @api {delete} /tags/:id Delete tag
 * @apiName DeleteTag
 * @apiGroup Tag
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Tag not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
