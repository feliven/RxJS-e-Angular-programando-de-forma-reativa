export interface Livro {
  title: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: Date;
  description?: string;
  previewLink?: string;
  thumbnail?: string;
}

export interface ResultadoBusca {
  kind: string;
  totalItems: number;
  items: GoogleBookVolume[];
}

interface BookDetails {
  title: string;
  subtitle?: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  industryIdentifiers?: BookIdentifier[];
  readingModes?: ReadingModes;
  pageCount?: number;
  dimensions?: BookDimensions;
  printType?: string;
  mainCategory?: string;
  categories?: string[];
  averageRating?: number;
  ratingsCount?: number;
  maturityRating?: string;
  allowAnonLogging?: boolean;
  contentVersion?: string;
  panelizationSummary?: PanelizationSummary;
  imageLinks?: BookImageLinks;
  language?: string;
  previewLink?: string;
  infoLink?: string;
  canonicalVolumeLink?: string;
}

interface ReadingModes {
  text: boolean;
  image: boolean;
}

interface PanelizationSummary {
  containsEpubBubbles: boolean;
  containsImageBubbles: boolean;
}

interface BookImageLinks {
  smallThumbnail?: string;
  thumbnail?: string;
  small?: string;
  medium?: string;
  large?: string;
  extraLarge?: string;
}

interface BookIdentifier {
  type: string;
  identifier: string;
}

interface BookDimensions {
  height: string;
  width: string;
  thickness: string;
}

interface PriceInfo {
  amount: number;
  currencyCode: string;
}

interface PriceInfoMicros {
  amountInMicros: number;
  currencyCode: string;
}

interface Offer {
  finskyOfferType: number;
  listPrice: PriceInfoMicros;
  retailPrice: PriceInfoMicros;
  giftable: boolean;
}

interface FormatAvailability {
  isAvailable: boolean;
  acsTokenLink?: string;
  downloadLink?: string;
}

interface SalesInformation {
  country: string;
  saleability: string;
  isEbook: boolean;
  listPrice?: PriceInfo;
  retailPrice?: PriceInfo;
  buyLink?: string;
  offers?: Offer[];
}

interface AccessInformation {
  country: string;
  viewability: string;
  embeddable: boolean;
  publicDomain: boolean;
  textToSpeechPermission: string;
  epub: FormatAvailability;
  pdf: FormatAvailability;
  webReaderLink?: string;
  accessViewStatus: string;
  quoteSharingAllowed?: boolean;
}

interface SearchInfo {
  textSnippet: string;
}

export interface GoogleBookVolume {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: BookDetails;
  saleInfo: SalesInformation;
  accessInfo: AccessInformation;
  searchInfo?: SearchInfo;
}
