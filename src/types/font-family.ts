export type FontFamiliesResponse = {
  families: FontFamily[];
  totalFamilies: number;
};

export type FontFamily = {
  idFont: number;
  url: string;
  idRegularFont: number;
  vendorId: string;
  price: {
    formatedPrice?: string;
    amount: number;
    currency: string;
  };
  idFamily: string;
  name: string;
  totalFonts: number;
  foundry: {
    id: string;
    name: string;
    totalFamilies: number;
  };
  images: {
    alphabet: {
      svg: string;
      width: number;
      height: number;
    };
  };
};

export type FontFamilyDetailsResponse = {
  idFont: number;
  url: string;
  price: {
    formatedPrice: string;
    amount: number;
    currency: string;
  };
  idFamily: string;
  name: string;
  totalFonts: number;
  foundry: {
    id: string;
    name: string;
    totalFamilies: number;
  };
  images: {
    alphabet: {
      svg: string;
    };
    pangram: {
      svg: string;
    };
  };
};
