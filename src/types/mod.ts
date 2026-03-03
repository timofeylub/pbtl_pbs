export type ModType = 'skin' | 'vehicle' | 'map';

export interface Mod {
  id: string;
  type: ModType;
  name: string;
  author: string;
  description: string;
  cover: string;
  screenshots: string[];
  downloads: {
    modsfire?: string;
    sharemods?: string;
  };
  compatibleModel?: string;
  city?: string;
}
