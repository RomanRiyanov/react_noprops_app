import { createContext, useState, useEffect } from 'react';
import Form from '../Form/Form';
import List from '../List/List';
import styles from './App.module.css';

export interface EmployeeType {
  id?: string;
  name?: string;
  age?: string | number;
  subscription?: string;
  employment?: string;
}

export interface EmployeeContextProps {
  employee: EmployeeType[];
  setEmployee: React.Dispatch<React.SetStateAction<EmployeeType[]>>;
  deletetdId: string;
  setDeletetdId: React.Dispatch<React.SetStateAction<string>>;
}

const initialEmployeeData: EmployeeType[] = [
  {
    id: '123',
    name: 'Roman', 
    age: 31,
    subscription: 'Subscribed',
    employment: 'Unemployed'
  },
  {
    id: '234',
    name: 'Kseniia', 
    age: 28,
    subscription: 'Not Subscribed',
    employment: 'Employed'
  },
  {
    id: '345',
    name: 'Vladimir', 
    age: 82,
    subscription: 'Other',
    employment: 'Employed'
  },
  {
    id: '456',
    name: 'Maksim', 
    age: 14,
    subscription: 'Other',
    employment: 'Unemployed'
  },
]

export const EmployeeContext = createContext<EmployeeContextProps | undefined>(undefined);

function App() {
  const [employee, setEmployee] = useState<EmployeeType[]>([]);
  const [deletetdId, setDeletetdId] = useState<string>('');

  useEffect(() => {
    const storedEmployeeData = localStorage.getItem("employee_array");

    if (storedEmployeeData && storedEmployeeData !== '[]') {
      setEmployee(JSON.parse(storedEmployeeData));
    }
    else {
      localStorage.setItem("employee_array", JSON.stringify(initialEmployeeData));
      setEmployee(initialEmployeeData);
    }
  }, []);
  
  return (
    <div className={styles.app}>
      <EmployeeContext.Provider 
        value={{
          employee,
          setEmployee,
          deletetdId,
          setDeletetdId
        }}
      >
        <Form></Form>
        <List></List>
      </EmployeeContext.Provider>
    </div>
  )
}

export default App
