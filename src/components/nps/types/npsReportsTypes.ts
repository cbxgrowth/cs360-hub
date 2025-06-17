
export interface Campaign {
  id: number;
  name: string;
  link: string;
  channel: string;
  sent: number;
  responses: number;
  responseRate: number;
  npsScore: number;
  status: string;
  createdAt: string;
  performance: { day: number; responses: number }[];
}

export interface QRCodeData {
  name: string;
  link: string;
}
