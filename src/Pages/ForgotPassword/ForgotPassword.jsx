import React, {useState} from 'react'
import "./forgotPassword.css"
import { useNavigate, Link } from 'react-router-dom'
import { Navbar } from '../../components/LandingPage/components';
import AlertMessage from "../../components/Alert/AlertMessage";


const ForgotPassword = () => {

    let navigate = useNavigate();

    const [forgotPasswordInputs, setForgotPasswordInputs] = useState({});
    const [Alert, setAlert] = useState(null);

    const showAlert = (message, type) => {
        setAlert({
            message: message,
            type: type
        })

        setTimeout(() => {
            setAlert(null);
        }, 2000);
    }


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setForgotPasswordInputs(values => ({ ...values, [name]: value }))
    }

    const handleForgetPassword = (e) => {
        e.preventDefault();

        fetch("http://127.0.0.1:8000/api/forgot-password", {
            method: "POST",
            body: JSON.stringify({
                "email": forgotPasswordInputs.emailAddress,
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((json) => {
                showAlert(json["response"], "success");
                if(json.success === false){
                    setTimeout(() => {
                        navigate('/register');
                    }, 1500);
                }
            })
    }


    return (

        <div className="forgot-password-container">
            <Navbar />
            <AlertMessage alert={Alert} />
            <div className="row justify-content-center m-0">
                <div className="col-11 col-sm-11 col-md-7 col-lg-4 forgot-password-card">
                    <h1 className="forgot-password-h1">Forgot Password</h1>
                    <form onSubmit={handleForgetPassword}>
                        <div>
                            <label for="emailAddress" className="form-label forgot-password-input-label">Email Address</label>
                            <input type="email" value={forgotPasswordInputs.emailAddress || ""} onChange={handleChange} className="form-control forgot-password-input-field" id="forgot-password-email" name="emailAddress" placeholder="Email Address" required />
                        </div>
                        <div>
                            <button type="submit" className="btn forgot-password-input-submit" id='forgot-password-btn'>Reset Password</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}
export default ForgotPassword