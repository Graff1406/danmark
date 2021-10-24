export declare interface Invoice {
  id?: string | number;
  name: string;
  price: string | number;
  qty: string | number;
  total?: string | number;
}

export declare interface Ids extends Array<number | string> { }

export declare interface Invoices extends Array<Invoice> { }