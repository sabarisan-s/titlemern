import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();
    navigate("/");
    localStorage.clear();
};

export default Logout;
