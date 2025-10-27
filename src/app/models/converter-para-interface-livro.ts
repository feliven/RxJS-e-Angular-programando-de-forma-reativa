import { GoogleBookVolume } from './interfaces';

export class InterfaceConvertidaParaLivro {
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: Date;
  description: string;
  previewLink: string;
  thumbnail: string;

  constructor(volume: GoogleBookVolume) {
    (this.title = volume.volumeInfo?.title),
      (this.authors = volume.volumeInfo?.authors),
      (this.publisher = volume.volumeInfo?.publisher),
      (this.publishedDate = new Date(
        volume.volumeInfo?.publishedDate + 'T00:00:00'
      )),
      (this.description = volume.volumeInfo?.description),
      (this.previewLink = volume.volumeInfo?.previewLink),
      (this.thumbnail = volume.volumeInfo?.imageLinks.thumbnail);
  }
}
