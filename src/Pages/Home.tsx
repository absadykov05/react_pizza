import React from 'react';
import Categories from "../Components/Categories";
import Sort from "../Components/Sort";
import Content from "../Components/Content";


const Home = () => {
    return (
        <div className="content">
            <div className="container">
                <div className="content__top">
                    <Categories/>
                    <Sort/>
                </div>
                <Content/>
            </div>
        </div>
    );
};

export default Home;
