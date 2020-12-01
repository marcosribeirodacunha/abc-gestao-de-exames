/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import { MdChevronRight } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { subMonths } from 'date-fns';

import Loader from '../../components/Loader';
import Exam from '../../interfaces/exam';
import api from '../../services/api';
import { Container, Table } from './styles';

const EmployeesList: React.FC = () => {
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(true);
  const [exams, setExams] = useState<Exam[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const { data } = await api.get('exams', {
          params: {
            due_start: subMonths(new Date(), 1),
            due_end: new Date(),
          },
        });
        setExams(data);
      } catch (error) {
        if (error.response) toast.error(error.response.data.message);
        else {
          toast.error(
            'Um erro inexperado ocorreu. Por favor, tente mais tarde!'
          );
        }
      }
      setIsLoading(false);
    }

    loadData();
  }, []);

  function handleNavigateToDetails(id: string) {
    history.push(`exames/${id}`);
  }

  if (isLoading) return <Loader />;

  return (
    <Container>
      <h1>Exames a vencer</h1>

      <Table>
        <header>
          <strong>Funcionário</strong>
          <strong>Tipo de exame</strong>
          <strong>Categoria</strong>
          <strong>Vencimento</strong>
        </header>
        <main>
          {exams.length === 0 ? (
            <p>Nenhum exame a vencer no ultimo mês</p>
          ) : (
            exams.map(exam => (
              <div
                key={exam.id}
                onClick={() => handleNavigateToDetails(exam.id)}
              >
                <p>{exam.employee.name}</p>
                <p>{exam.type.name}</p>
                <p>{exam.category.name}</p>
                <p>{exam.dueDate}</p>
                <MdChevronRight size="24" />
              </div>
            ))
          )}
        </main>
      </Table>
    </Container>
  );
};

export default EmployeesList;
