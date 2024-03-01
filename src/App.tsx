import './scss/app.scss';
// @ts-ignore
import Header from './Components/Header.tsx';
// @ts-ignore
import Home from "./Pages/Home.tsx";
import {Route, Routes,} from "react-router-dom";
import NotFound from "./Pages/NotFound/NotFound";
import Cart from "./Pages/Cart/Cart";
// @ts-ignore
import FullPizza from "./Pages/FullPizza.tsx"

function App() {
    return (
        <div id="root">
            <div className="wrapper">
                <Header/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='*' element={<NotFound/>}/>
                    <Route path='/pizza/:id' element={<FullPizza/>}/>
                    <Route path='/cart' element={<Cart/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
