class SearchQuery {
  constructor ({...query}) {
    if (query.limit && !isNaN(query.limit)) {
      if (query.limit < 1) {
        query.limit = 1
      } else if (query.limit > 200) {
        query.limit = 200
      }
    }

    if (query.lang) {
      if (['en_us', 'ja_jp'].indexOf(query.lang) === -1) {
        query.lang = 'en_us'
      }
    }
    query.country = query.country || 'US'

    this.term = query.term
    this.country = query.country
    this.media = 'podcast'
    this.entry = query.entry
    // this.attribute = query.attribute
    this.limit = query.limit
    this.lang = query.lang
  }
}

export default SearchQuery
