import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from "./App"
import Form from "./components/Form"
import SingleComponent from "./components/SingleComponent"
import UpdateForm from "./components/UpdateForm"
import Login from './components/Login'

const MyRoute = () => {
    
    document.title = 'SAIG Blog';
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<App />} />
                <Route path="/create" exact element={<Form />} />
                <Route path="/blog/:slug" exact element={<SingleComponent />} />
                <Route path="/blog/update/:slug" exact element={<UpdateForm />} />
                <Route path="/login" exact element={<Login />} />
            </Routes>
        </BrowserRouter>
    )

}

export default MyRoute;