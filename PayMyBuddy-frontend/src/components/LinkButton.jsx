import { Link } from "react-router-dom";

const LinkButton = ({ text, design }) => {
    return (
        <Link to="/" className={design}>
            {text}
        </Link>
    );
};

export default LinkButton;
