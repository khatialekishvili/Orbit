export interface User {
  id: number;
  name: string;          // "Leanne Graham"
  email: string;
  phone: string;
  company?: { name: string };
}
