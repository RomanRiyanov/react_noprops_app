import styles from './Form.module.css';
import { useContext, useState } from 'react';
import { FormEvent } from 'react';
import {EmployeeContext} from '../App/App';
import Switcher from '../Switcher/Switcher';

function Form() {
    const {employee, setEmployee, deletetdId, setDeletetdId} = useContext(EmployeeContext)!;

    const [employeeName, setEmployeeName] = useState<string>('');
    const [age, setAge] = useState<string>('');
    const [isSubscribed, setSubscribed] = useState<string>('Subscribed');
    const [isEmployed, setEmployed] = useState<boolean>(false);

    const resetForm = () => {
        setEmployeeName('');
        setAge('');
        setSubscribed('Subscribed');
        setEmployed(false);
    }

    const handleCreateEmployee = (event: FormEvent) => {
        event.preventDefault();

        const newItem = {
            name: employeeName, 
            age: age, 
            id: employeeName+age,
            subscription: isSubscribed,
            employment: isEmployed ? 'Employed' : 'Unemployed'
        }

        setEmployee(state => [...state, newItem]);
        localStorage.setItem("employee_array", JSON.stringify([...employee, newItem]));

        resetForm();
    }
    
    const handleDelete = () => {
        const res = [...employee].filter(elem => elem.id !== deletetdId);
        setEmployee(res);
        localStorage.setItem("employee_array", JSON.stringify(res));
        setDeletetdId('');
    }

    return ( 
        <form className={styles.form} onSubmit={handleCreateEmployee}>
            <label className={styles.formlabel}>Insert Row</label>

            <input className={styles.input} type="text" required minLength={2} maxLength={32} placeholder='Name' value={employeeName} onChange={e => setEmployeeName(e.target.value)}/>

            <input className={styles.input} type="number" required min={0} max={100} placeholder='Age' value={age} onChange={e => setAge(e.target.value)} />

            <select className={styles.input} name="select" value={isSubscribed} onChange={e => setSubscribed(e.target.value)}>
                <option value="Subscribed">Subscribed</option>
                <option value="Not Subscribed">Not Subscribed</option>
                <option value="Other">Other</option>
            </select>

            <label className={styles.label}>
                <input className={styles.checkbox} type="checkbox" id="mode" name="mode" checked={isEmployed} onChange={e => setEmployed(e.target.checked)}/>
                <span className={styles.visible}></span>
                Employed
            </label>

            <button type='submit'>Insert</button>

            <div className={styles.border}></div>

            <Switcher />
            
            <button type='button' onClick={handleDelete} disabled={deletetdId == ''}>Delete</button>

        </form>
    );
}

export default Form;