import { GoogleBookVolume, InterfaceLivro } from './interfaces';

export class InterfaceConvertidaParaLivro implements InterfaceLivro {
  title: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: Date;
  description?: string;
  previewLink?: string;
  thumbnail?: string;

  constructor(volume: GoogleBookVolume) {
    if (!volume?.volumeInfo) {
      throw new Error('Invalid volume data provided');
    }

    const { volumeInfo } = volume;

    this.title = volumeInfo.title || 'Título indisponível';
    this.authors = volumeInfo?.authors;
    this.publisher = volumeInfo?.publisher;
    this.publishedDate = InterfaceConvertidaParaLivro.parseDateString(
      volumeInfo.publishedDate
    );
    this.description = volumeInfo?.description;
    this.previewLink = volumeInfo?.previewLink;
    this.thumbnail = volumeInfo.imageLinks?.thumbnail;
  }

  // Classe com método privado vira incompatível estruturalmente, por isso foi tornado estático.
  private static parseDateString(dateString?: string): Date | undefined {
    if (!dateString) return undefined;

    try {
      const date = new Date(dateString + 'T00:00:00');
      return isNaN(date.getTime()) ? undefined : date;
    } catch {
      return undefined;
    }
  }
}
