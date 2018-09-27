## ITUNES-PODCAST

**itunes-podcasts** is module that can get **Podcast** in itunes  

using api site is [here](https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/)

### Install

```bash
npm install itunes-podcastss
```

### Usage


All functions in this module return Promise

##### Get Podcast List

#### queries  

query's type can be **object** or **string**

| config    | required  | etc     | default |
|:----------|:----------|:--------|:-------|
| term      | true     | search query |  |
| country | false     | [iso country code](http://en.wikipedia.org/wiki/ ISO_3166-1_alpha-2) | 'US' |
| entry | false     | 'podcastAuthor' or 'podcast' |  |
| lang | false     | 'en_us' or 'ja_jp' |  |
| limit | false | 1 to 200 | 50 |


note. country is not podcast's origin place, that is sending country

```js
import itunesPodcast from 'itunes-podcasts'
//or
var itunesPodcast = require('itunes-podcasts')

const queries = {
  country: 'KR',
  term: '이진우의 손에 잡히는 경제'
}
//or
const queries = '이진우의 손에 잡히는 경제'


itunesPodcast.getPodcasts(queries).then((response) => {
  //   {
  //   resultCount: 1,
  //   results:
  //   [ { wrapperType: 'track',
  //     kind: 'podcast',
  //     artistId: 384922652,
  //     collectionId: 437788220,
  //     trackId: 437788220,
  //     artistName: 'MBC',
  //     collectionName: '이진우의 손에 잡히는 경제',
  //     trackName: '이진우의 손에 잡히는 경제',
  //     collectionCensoredName: '이진우의 손에 잡히는 경제'
  //   }
  //   ]
  // }
})
```

#### get podcast and episodes  

collectionId is number of itunes's id  

parsing modules using [node-podcast-parser](https://www.npmjs.com/package/node-podcast-parser)  
so, result form is the same as node-podcast-parser module

```js
import itunesPodcast from 'itunes-podcasts'
//or
var itunesPodcast = require('itunes-podcasts')

const collectionId = 437788220
itunesPodcast.getPodcastWithEpisodes(collectionId).then((result) => {
  // console.log(result)
  // { categories: [ 'Business' ],
  //   title: '이진우의 손에 잡히는 경제',
  //   link: 'http://mini.imbc.com/index_v3.html?service=podcast&program=1000671100000100000',
  //   author: 'MBC',
  //   description:
  //    { long: 'MBC 표준FM 매일 오전 11시10분 ~ 12시',
  //      short: 'MBC 표준FM 매일 오전 11시10분 ~ 12시' },
  //   language: 'ko-ko',
  //   image: 'http://img.imbc.com/adams/Program/20176/131428386515631292.jpg',
  //   owner: { name: 'iMBC', email: 'imradio@imbc.co.kr' },
  //   episodes:
  //    [ { title: '9/27(목) 2부  "농가와 도심을 일자리로 이어주는 ‘푸마시’ 등"',
  //        description: '5. <주목! 농업 스타트업>\r\n"농가와 도심을 일자리로 이어주는 ‘푸마시’ 등" \r\n- 슈미트 조가연 팀장',
  //        enclosure: [Object],
  //        guid: 'http://podcastfile.imbc.com/cgi-bin/podcast.fcgi/podcast/economy/ECONOMY_20180927_2.mp3',
  //        published: 2018-09-27T02:40:00.000Z },
  //      { title: '9/27(목) 1부 "글로벌 생산거점으로 주목받는 베트남. 왜 베트남인가?"',
  //        description: '1. <오늘의 숫자>\r\n"0.75%포인트"\r\n\r\n2. <경제 뉴스 따라잡기>\r\n-이데일리 성문재 기자\r\n\r\n3. <친절한 경제>\r\n"오피스텔은 장기수선충당금을 안걷어도 되나요?"\r\n\r\n4. <이슈 인터뷰>\r\n"글로벌 생산거점으로 주목받는 베트남. 왜 베트남인가?" \r\n- 한국무역협회 김인산 베트남 호치민 지부장',
  //        enclosure: [Object],
  //        guid: 'http://podcastfile.imbc.com/cgi-bin/podcast.fcgi/podcast/economy/ECONOMY_20180927_1.mp3',
  //        published: 2018-09-27T02:05:00.000Z },
  //   ]}
  // }
})

```

### License

MIT
