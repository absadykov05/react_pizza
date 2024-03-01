import *as React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addItem, cartItemCountSelector} from "../../Redux/cartReducer";
import {Link} from "react-router-dom";
import {ItemType} from "../../Redux/axiosReducer";

const Pizza: React.FC<ItemType> = ({id, name, price, img, types, sizes}) => {
    const [sizeIndex, setSizeIndex] = React.useState<number>(0);
    const [typeIndex, setTypeIndex] = React.useState<number>(0);
    const typeName: string[] = ['тонкое', 'традиционное'];
    const pizzaCount = useSelector(cartItemCountSelector(Number(id)));
    const dispatch = useDispatch();

    const addPizza = () => {
        const newPizza = {
            id: Number(id),
            title: name,
            price: price,
            src: img,
            type: typeName[typeIndex],
            count: 1,
            sizes: sizes[sizeIndex],
        };
        dispatch(addItem(newPizza));
    };
    /*    const pizzaCount = items.find(obj => {
            if (obj.id === props.id) {
                return obj.count;
            } else {
                return 0;
            }
        });*/
    return (
        <div className="pizza-block__wrapper">
            <div className="pizza-block">
                <Link to={"/pizza/" + String(id)}>
                    <img className="pizza-block__image" src={img} alt="Pizza"/>
                    <h4 className="pizza-block__title">{name}</h4></Link>
                <div className="pizza-block__selector">
                    <ul>
                        {types.map((e, i) => {
                            return <li key={i} className={typeIndex === i ? 'active' : ''}
                                       onClick={() => setTypeIndex(i)}>{typeName[e]}</li>
                        })}
                    </ul>
                    <ul>
                        {sizes.map((size, i) => {
                            return <li key={i} className={sizeIndex === i ? 'active' : ''}
                                       onClick={() => setSizeIndex(i)}>{size} см</li>
                        })}
                    </ul>
                </div>

                <div className="pizza-block__bottom">
                    <div className="pizza-block__price">от {price} ₽</div>
                    <button onClick={addPizza}
                            className="button button--outline button--add"
                            style={{display: 'flex', flexDirection: 'row', gap: 10}}>
                        <svg style={{marginTop: 2}} width="12" height="12" viewBox="0 0 12 12" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                                fill="white"></path>
                        </svg>
                        <div>Добавить</div>
                        {pizzaCount && pizzaCount.count}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Pizza;
