class Podcast {
  constructor ({...podcast}) {
    this.kind = podcast.kind
    this.artistId = podcast.artistId
    this.collectioId = podcast.collectioId
    this.artistName = podcast.artistName
    this.collectionName = podcast.collectionName
    this.trackName = podcast.trackName
    this.collectionCensoredName = podcast.collectionCensoredName
  }
}

export default Podcast
