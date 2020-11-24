import Category from './category';
import Employee from './employee';
import ExamType from './examType';

export default interface Exam {
  id: '0f83d817-2168-46be-941b-a6ebef7042a2';
  date: '2019-11-18T18:58:28.000Z';
  dueDate: '2020-05-16T18:58:28.000Z';
  expired: true;
  employee: Employee;
  type: ExamType;
  category: Category;
}
