import assert from 'assert'
import 'babel-polyfill'
import * as itunesPodcast from './src/index.js'

describe('itunesPodcast', function () {
  let targetCollectionId = null
  describe('getPodcasts', function () {
    let responseByObjectQuery = null
    let responseByStringQuery = null
    let term = '이진우의 손에 잡히는 경제'
    before(async function () {
      let objectQuery = {
        country: 'KR',
        term: term
      }
      responseByObjectQuery = await itunesPodcast.getPodcasts(objectQuery)

      let stringQuery = term

      responseByStringQuery = await itunesPodcast.getPodcasts(stringQuery)
    })

    it('has resultCount', function () {
      assert.ok(responseByObjectQuery.hasOwnProperty('resultCount'))
    })

    it('term has existed test case', function () {
      targetCollectionId = responseByObjectQuery.results[0].collectionId
      assert.equal(responseByObjectQuery.results[0].kind, 'podcast')
    })

    it('has results', function () {
      assert.ok(responseByObjectQuery.hasOwnProperty('results'))
    })

    it('equal string query result with object query result', function () {
      assert.equal(responseByStringQuery.results[0].collectionId, responseByObjectQuery.results[0].collectionId)
    })
  })

  describe('getPodcastWithEpisodes', function () {
    let response = null
    before(async function () {
      response = await itunesPodcast.getPodcastWithEpisodes(targetCollectionId)
    })

    it('properties', function () {
      assert.ok(!!response)
      assert.ok(response.hasOwnProperty('episodes'))
      assert.ok(response.hasOwnProperty('title'))
      assert.ok(response.hasOwnProperty('description'))
      assert.ok(response.hasOwnProperty('author'))
    })
  })
})
