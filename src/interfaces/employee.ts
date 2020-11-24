import Job from './job';

export default interface Employee {
  id: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  registrationNumber: string;
  isAdmin: boolean;
  photo: string;
  job: Job;
}
