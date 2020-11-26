import Category from './category';
import Employee from './employee';
import ExamType from './examType';

export default interface Exam {
  id: string;
  date: string;
  dueDate: string;
  expired: true;
  employee: Employee;
  type: ExamType;
  category: Category;
}
