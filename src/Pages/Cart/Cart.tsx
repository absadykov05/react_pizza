import React from 'react';
import style from './Cart.module.scss';
import {useSelector} from "react-redux";
import {cartSelector, clearItem, deleteItem, minusPizzaCount, plusPizzaCount} from "../../Redux/cartReducer";
import {Link} from "react-router-dom";
import {UseAppDispatch} from "../../Redux/redux-store";

const Cart: React.FC = () => {
    const {cartItems, totalPrice} = useSelector(cartSelector);
    const dispatch = UseAppDispatch();

    const deletePizza = (index: number) => {
        dispatch(deleteItem(index));
    }

    const totalCount = cartItems.reduce((sum, obj) => {
        sum += obj.count;
        return sum;
    }, 0);// initialValue = 0; IMPORTANT!!!

    return (
        <div className={style.main}>
            {cartItems.length > 0 ?
                <>
                    <div className={style.header}>
                        <h2>Корзина</h2>
                        <span onClick={() => dispatch(clearItem())}>Очистить корзину</span>
                    </div>
                    <ul className={style.ul}>
                        {cartItems.map((obj, index) => {
                            return <li key={index} className={style.list}>
                                <img src={obj.src} style={{width: 60, height: 60}}/>
                                <div>{obj.title}</div>
                                <div style={{marginLeft: 35}}>{obj.price} $</div>
                                <div className={style.countButtons}>
                                    <div
                                        className={obj.count > 1 ? style.addPizzaButton : style.addPizzaButton_disabled}
                                        onClick={() => dispatch(minusPizzaCount(index))}>
                                        -
                                    </div>
                                    <div className={style.count}> {obj.count}</div>
                                    <div className={style.addPizzaButton}
                                         onClick={() => dispatch(plusPizzaCount(index))}>
                                        +
                                    </div>

                                </div>
                                <div onClick={() => deletePizza(index)}
                                     className={style.deleteButton}>
                                    ×
                                </div>
                            </li>
                        })}
                    </ul>
                    <div className={style.line}/>
                    <div className={style.bottomPart}>
                        <div>Всего пицц: {totalCount}</div>
                        <div>Сумма заказа: {totalPrice} ₽</div>
                    </div>
                </>
                : "Корзина пуста :("
            }
            <Link className={style.link} to='/'>Вернуться на главную</Link>
        </div>
    );
};

export default Cart;


/*                  <div className="button button--outline button--circle">
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                                    fill="#EB5A1E"></path>
                                <path
                                    d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                                    fill="#EB5A1E"></path>
                            </svg>
                        </div>
                        <div className="cart__item-remove">
                            <div className="button button--outline button--circle">
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                                        fill="#EB5A1E"></path>
                                    <path
                                        d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                                        fill="#EB5A1E"></path>
                                </svg>
                            </div>
                        </div>

*/
