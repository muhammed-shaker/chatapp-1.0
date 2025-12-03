import { useNavigate } from "react-router-dom";

export default function Home (){
    const navigate = useNavigate();

    const handleStart = () => {
        navigate("/room");
    };

    return (
        <div className="home-div">
            <div className="content">
                <h1 className="home-h1">Welcome to my APP</h1>
                <p className="home-p">This application is a fast and easy-to-use chat platform that allows you to communicate instantly with your friends. It offers a clean interface, real-time messaging, and a smooth user experience. Whether you want to stay connected, share ideas, or just talk casually, the app makes communication simple, quick, and enjoyable.</p>
                <button className="home-button" onClick={handleStart}>Let's Start !</button>
            </div>
        </div>
    )
}