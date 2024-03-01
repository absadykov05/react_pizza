import React from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";

const FullPizza: React.FC = () => {
    const {id} = useParams();
    const [pizza, setPizza] = React.useState<{ img: string, name: string, price: number }>({
        img: '',
        name: '',
        price: 0
    });

    React.useEffect(() => {
        try {
            const fetchPizzas = async () => {
                const {data} = await axios.get('https://62baca097bdbe01d528ff2cb.mockapi.io/pizzas/' + id);
                setPizza(data);
            }
            fetchPizzas().then(r => r);
        } catch (error) {
            alert('Ошибка при получений пиццы');
            console.log(error, 'fullData_about_1_pizza')
        }
    }, []);

    if (!pizza) {
        return <>...Loading</>;
    }
    return (
        <div style={{margin: 30}}>
            <img src={pizza.img} style={{width: 300, height: 300}}/>
            <h1>{pizza.name}</h1>
            <h4>{pizza.price} $</h4>
        </div>
    );
};

export default FullPizza;
