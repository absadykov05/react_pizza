import *as React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {homeSelector, setCategory} from '../Redux/homeReducer';

const Categories = () => {
    const {category} = useSelector(homeSelector);
    const dispatch = useDispatch();

    const categories: string[] = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
    return (
        <div className="categories__wrapper">
            <div className="categories">
                <ul>{
                    categories.map((e: string, i: number) => {
                        return <li key={i} className={category === i ? "active" : ""}
                                   onClick={() => dispatch(setCategory(i))}>{e}</li>
                    })
                }
                    {/* <li className={number === 1 ? "active" : ""} onClick={() => changeNumber(1)}>Все</li>
                <li className={number === 2 ? "active" : ""} onClick={() => changeNumber(2)}>Мясные</li>
                <li className={number === 3 ? "active" : ""} onClick={() => changeNumber(3)}>Вегетарианская</li>
                <li className={number === 4 ? "active" : ""} onClick={() => changeNumber(4)}>Гриль</li>
                <li className={number === 5 ? "active" : ""} onClick={() => changeNumber(5)}>Острые</li>
                <li className={number === 6 ? "active" : ""} onClick={() => changeNumber(6)}>Закрытые</li>*/}
                </ul>
            </div>
        </div>
    );
};

export default Categories;
