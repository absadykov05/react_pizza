// @ts-ignore
import React, {useEffect} from 'react';
import {setSortIndex} from '../Redux/homeReducer';
import {useDispatch, useSelector} from "react-redux";

const Sort: React.FC = () => {
    const sort = useSelector<{ home: { sort: string } }>(state => state.home.sort);
    const sortList: string[] = ['популярности (DESC)', 'популярности (ASC)', 'цене (DESC)', 'цене (ASC)', 'алфавиту (DESC)', 'алфавиту (ASC)'];
    const sortArray: string[] = ['rating&order=desc', 'rating&order=acs', 'price&order=desc', 'price&order=acs', 'name&order=desc', 'name&order=acs'];
    const dispatch = useDispatch();
    const [isVisible, setIsVisible] = React.useState<boolean>(false);

    const sortRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            const _event = event as MouseEvent & { path: Node[] };
            if (sortRef.current && !_event.path.includes(sortRef.current)) {
                setIsVisible(false);
            }
        }
        document.addEventListener('click', handleClick);
        return () => document.body.addEventListener('click', handleClick);
    }, [])

    return (
        <div className="sort" ref={sortRef} style={{cursor: "pointer"}}>
            <div className="sort__label" onClick={() => setIsVisible(true)}>
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"></path>*/}
                </svg>
                <b>Сортировка по:</b><span><>{sort}</></span>
            </div>
            {isVisible && <div className="sort__popup">
                <ul>
                    {sortList.map((e, i) => <li key={i} onClick={() => {
                        dispatch(setSortIndex(sortArray[i]));
                    }}
                                                className={sort === sortArray[i] ? 'active' : ''}>{e}</li>)
                    }
                </ul>
            </div>}
        </div>
    );
};

export default Sort;
