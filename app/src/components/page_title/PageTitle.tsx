import "./PageTitle.css";

interface pageTitle {
    className?: string,
    title: string
}

function PageTitle({ className, title }: pageTitle) {
    return (
        <div className={`page-title-container ${className}`}>
            <hr className="page-title-line" />
            <h1 className="page-title">{title}</h1>
            <hr className="page-title-line" />
        </div>
    );
}

export default PageTitle;