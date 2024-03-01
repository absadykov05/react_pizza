import *as React from 'react';
import {useEffect, useRef} from 'react';
import Pizza from "./PizzaBlock/Pizza";
import Skeleton from "./PizzaBlock/Skeleton";
import {useSelector} from "react-redux";
import Pagination from "./Pagination/Pagination";
import qs from "qs";
import {useNavigate} from 'react-router-dom';
import {homeSelector, setFilters} from "../Redux/homeReducer";
import {axiosSelector, fetchPizzas, setStatus} from "../Redux/axiosReducer";
import {UseAppDispatch} from "../Redux/redux-store";

// fe5f1e
// &: hover {}

const Content: React.FC = () => {
    const {category} = useSelector(homeSelector);
    const {sort} = useSelector(homeSelector);
    const {lastSearch} = useSelector(homeSelector);
    const {pagination} = useSelector(homeSelector);
    /*    const {cartItems} = useSelector(cartSelector);*/
    const {items} = useSelector(axiosSelector);
    const {status} = useSelector(axiosSelector);
    const dispatch = UseAppDispatch();
    const navigate = useNavigate();
    const isSearching = useRef(true);
    const isMounted = useRef(false);

    /*    type PizzaItemObj = { id: number, img: string, name: string, price: number, types: number[], sizes: number[] };*/
    /*    type FetchPizzasType = { sortName: string, lastSearch: string, category: number, pagination: number };*/

    const getPizzas = async () => {
        dispatch(fetchPizzas(
            {sortName: sort, lastSearch, category, pagination}
        ));
    }

    useEffect(() => {
        if (window.location.search) {

            const params = qs.parse(window.location.search.substring(1))
            console.log(params);
            dispatch(setFilters(params));
            isSearching.current = false;

        }

    }, [])
    useEffect(() => {
        if (isSearching.current) {
            dispatch(setStatus('loading'));
            getPizzas().then(r => r);
        }
        isSearching.current = true;
    }, [sort, lastSearch, category, pagination]);
    useEffect(() => {
        if (isMounted.current) {
            const qweryString = qs.stringify({
                sort, category, pagination
            });
            navigate(`?${qweryString}`);
        }

        /*        isMounted.current = true;*/
    }, [sort, lastSearch, category, pagination]);


    return (
        <div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {status == 'loading' ?
                    [...Array(4)].map((_, index) => {
                        return <Skeleton key={index}/>
                    })
                    : status == 'success' ? items.map((obj) => {
                            return <Pizza key={obj.id} id={obj.id} img={obj.img} name={obj.name}
                                          price={obj.price} types={obj.types}
                                          sizes={obj.sizes} count={0}/>
                        })
                        : <div>505 Server Error</div>
                }
            </div>


            <Pagination/>
        </div>
    );
};

export default Content;

/*
   <ul className="Pagination_root__uwB0O">
                <li className="previous"><a className="" tabIndex="0" role="button" aria-disabled="false"
                                            aria-label="Previous page" rel="prev">&lt;</a></li>
                <li><a rel="prev" role="button" tabIndex="0" aria-label="Page 1">1</a></li>
                <li className="selected"><a rel="canonical" role="button" tabIndex="-1"
                                            aria-label="Page 2 is your current page"
                                            aria-current="page">2</a>
                </li>
                <li><a rel="next" role="button" tabIndex="0" aria-label="Page 3">3</a></li>
                <li className="next"><a className="" tabIndex="0" role="button" aria-disabled="false"
                                        aria-label="Next page" rel="next">&gt;</a></li>
            </ul>
* */
