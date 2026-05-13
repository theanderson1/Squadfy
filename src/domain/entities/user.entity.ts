export interface User {
  id: string; 
  organizationId: string;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
}