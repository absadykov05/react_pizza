import React from 'react';
import s from './NotFound.module.css';

const NotFound = () => {
    return (
        <div className={s.main}>
            <h1> Page Dont found :(</h1>
            <div> page is not exist in our site</div>
        </div>
    );
};

export default NotFound;
