import *as React from 'react';
import {useCallback, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {homeSelector, onSearchTextChange, realSearch} from "../Redux/homeReducer";
import '../scss/components/_header.scss'
import debounce from 'lodash.debounce'
import {Link} from "react-router-dom";
import {cartSelector} from "../Redux/cartReducer";


const Header: React.FC = () => {
    const {cartItems} = useSelector(cartSelector);
    const {totalPrice} = useSelector(cartSelector);
    const {searchText} = useSelector(homeSelector);
    const dispatch = useDispatch();
    const inputRef = useRef(null);
    const search = debounce((text: string) => {
        dispatch(realSearch(text));
    }, 500);

    const onChange: (text: string) => void = useCallback((text) => {
        dispatch(onSearchTextChange(text));
        search(text);
    }, []);

    const totalCount: number = cartItems.reduce((sum: number, obj: any) => {
        sum += obj.count;
        return sum;
    }, 0);// initialValue = 0; IMPORTANT!!!

    return (
        <div className="header">
            <div className="container"><Link to="/">
                <div className="header__logo"><img width="42" height="42"
                                                   src="https://cdn-icons-png.flaticon.com/512/3132/3132693.png"
                                                   alt="Pizza logo"/>
                    <div><h1>Pizza js</h1><p>самая вкусная пицца во вселенной</p></div>
                </div>
            </Link>
                <div className="Search_root__eiX89">
                    <svg style={{width: 30, height: 30, marginRight: 5}} className="Search_icon__XMmYc"
                         enable-background="new 0 0 32 32" id="EditableLine"
                         version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="14" cy="14" fill="none" id="XMLID_42_" r="9" stroke="#000000"
                                stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"
                                stroke-width="2"></circle>
                        <line fill="none" id="XMLID_44_" stroke="#000000" stroke-linecap="round"
                              stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" x1="27"
                              x2="20.366"
                              y1="27" y2="20.366"></line>
                    </svg>
                    <input ref={inputRef} className="Search_input__klILD" placeholder="Поиск пиццы..."
                           value={searchText} onChange={(e) => onChange(e.target.value)}/>
                    {/*<button className='searchButton' onClick={SearchFunc}>Search
                    </button>*/}
                </div>

                <div className="header__cart"><Link className="button button--cart"
                                                    to="/cart"><>{totalPrice} ₽</>
                    <div className="button__delimiter"></div>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                            stroke="white" strokeWidth="1.8" strokeLinecap="round"
                            stroke-linejoin="round"></path>
                        <path
                            d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                            stroke="white" stroke-width="1.8" stroke-linecap="round"
                            strokeLinejoin="round"></path>
                        <path
                            d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                            stroke="white" stroke-width="1.8" stroke-linecap="round"
                            strokeLinejoin="round"></path>
                    </svg>
                    <span>{totalCount}</span></Link></div>
            </div>
        </div>
    );
};

export default Header;
