import axios from 'axios'
import Query from './dto/query.js'
import podcastParser from 'node-podcast-parser'

const instance = axios.create({
  baseURL: 'https://itunes.apple.com'
})

export const getPodcasts = function (options = {}) {
  if (typeof options === 'string') {
    options = {
      term: options
    }
  }
  let query = new Query(options)
  return instance.get('/search', {params: query}).then((response) => {
    return Promise.resolve(response.data)
  })
}

export const getPodcastWithEpisodes = function (collectionId) {
  return instance.get('/lookup', {params: {id: collectionId}})
  .then((response) => {
    let data = response.data
    if (data.resultCount < 1) {
      return Promise.reject('invalid itunes id')
    }
    let podcast = data.results[0]
    return Promise.resolve(podcast)
  })
  .then((podcast) => {
    let feedUrl = podcast.feedUrl
    if (typeof feedUrl !== 'string') {
      return Promise.reject('invalid itunes id')
    }
    return axios.get(podcast.feedUrl)
  })
  .then((feedResponse) => {
    return new Promise((response, reject) => {
      podcastParser(feedResponse.data, (err, data) => {
        if (err) {
          return reject(err)
        } else {
          return response(data)
        }
      })
    })
  })
}
