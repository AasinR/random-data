import { Link } from "react-router-dom";
import "./DataCard.css";

function DataCard({ name, href }: {name: string, href: string}) {
    return (
        <Link className="data-card" to={href}>
            {name}
        </Link>
    );
}

export default DataCard;