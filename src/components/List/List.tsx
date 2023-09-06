import styles from './List.module.css'
import { useContext, memo } from 'react';
import cn from 'classnames';
import {EmployeeContext} from '../App/App';
import { EmployeeType } from '../App/App';

interface EmployeeProps {
    item: EmployeeType;
}

const Employee = memo(function EmployeeString({item}: EmployeeProps) {
    const { setDeletetdId, deletetdId } = useContext(EmployeeContext)!;
    
    const employeeClassName = cn(styles.employee, {
        [styles.checked] : deletetdId == item.id
    })

    const handleClick = () => {
        setDeletetdId(item.id!);
    }

    return <li key={item.id} onClick={handleClick} className={employeeClassName}>
        <p className={styles.text}>{item.name}</p>
        <p className={styles.text}>{item.age}</p>
        <p className={styles.text}>{item.subscription}</p>
        <p className={styles.text}>{item.employment}</p>
    </li>;
  });

function List() {
    const {employee} = useContext(EmployeeContext)!;

    const headerClassName = cn(styles.employee, styles.header)

    return ( 
        <section className={styles.list}>
            <article className={headerClassName}>
                <p className={styles.text}>Name</p>
                <p className={styles.text}>Age</p>
                <p className={styles.text}>Subscription</p>
                <p className={styles.text}>Employement</p>
            </article>
            <ul className={styles.unordered}>
                {employee 
                    ? employee.map((item: EmployeeType) => <Employee key={item.id} item={item}/>)
                    : null
                }
            </ul>
        </section> 
    );
}


export default List;