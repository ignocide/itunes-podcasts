var assert = require('assert')
var itunesPodcast = require('./build/index.js')

describe('itunesPodcast', function () {
  let targetCollectionId = null
  describe('getPodcasts', function () {
    let responseByObjectQuery = null
    let responseByStringQuery = null
    let term = '이진우의 손에 잡히는 경제'
    before(function () {
      let objectQuery = {
        country: 'KR',
        term: term
      }
      let stringQuery = term
      return itunesPodcast.getPodcasts(objectQuery)
      .then(function (response) {
        responseByObjectQuery = response
        return itunesPodcast.getPodcasts(stringQuery)
      })
      .then(function (response) {
        responseByStringQuery = response
        return Promise.response
      })
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
    before(function () {
      return itunesPodcast.getPodcastWithEpisodes(targetCollectionId)
      .then(function (_response) {
        response = _response
        return Promise.resolve()
      })
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
//
// const test = async function () {
//   let queries = {
//     country: 'KR',
//     term: term
//   }
//   let response1 = await itunesPodcast.getPodcasts(queries)
//   console.log(response1)
//   //   {
//   //   resultCount: 1,
//   //   results:
//   //   [ { wrapperType: 'track',
//   //     kind: 'podcast',
//   //     artistId: 384922652,
//   //     collectionId: 437788220,
//   //     trackId: 437788220,
//   //     artistName: 'MBC',
//   //     collectionName: '이진우의 손에 잡히는 경제',
//   //     trackName: '이진우의 손에 잡히는 경제',
//   //     collectionCensoredName: '이진우의 손에 잡히는 경제'
//   //   }
//   //   ]
//   // }
//
//   itunesPodcast.getPodcastWithEpisodes(437788220).then((result) => {
//     // console.log(result)
//     // { categories:
//     //    [ 'Society & Culture>Philosophy',
//     //      'Science & Medicine>Medicine',
//     //      'Religion & Spirituality>Other' ],
//     //   title: '[지대넓얕] 지적 대화를 위한 넓고 얕은 지식',
//     //   link: 'http://cafe.naver.com/jdny.cafe',
//     //   description:
//     //    { long: '지적 대화를 위한 넓고 얕은 지식 채사장, 깡쌤, 덕실이, 김도인이 만들어가는 넓고 얕은 지식입니다.',
//     //      short: '지적 대화를 위한 넓고 얕은 지식 채사장, 깡쌤, 덕실이, 김도인이 만들어가는 넓고 얕은 지식입니다.' },
//     //   language: 'ko-kr',
//     //   author: '채사장, 깡쌤, 덕실이, 김도인',
//     //   owner: { name: '채사장, 깡쌤, 덕실이, 김도인' },
//     //   image: 'https://podty.gslb.toastoven.net/image/cast_image/7661/original/jidae.jpg',
//     //   explicit: false,
//     //   episodes:
//     //    [ { title: '155회 - [결산] 안녕, 지대넓얕',
//     //        description: '지금까지 지대넓얕을 사랑해주신 청취자 여러분 진심으로 감사드립니다.',
//     //        guid: '9066785',
//     //        published: 2017-08-19T22:23:05.000Z,
//     //        duration: 4272,
//     //        enclosure: [Object],
//     //        explicit: false },
//     //      { title: '[공지] 지대넓얕 시즌 종료 안내',
//     //        description: '팟캐스트 지대넓얕은 시즌을 마감합니다.\r\n8/20(일) 오전, 마지막 결산보고 방송이 업데이트 됩니다.\r\n지금까지 지대넓얕을 사랑해주신 청취자 여러분,\r\n진심으로 감사드립니다.',
//     //        guid: '8994131',
//     //        published: 2017-07-29T22:27:49.000Z,
//     //        duration: 72,
//     //        enclosure: [Object],
//     //        explicit: false },
//     //    ]
//     // }
//   })
// }
//
// test()
