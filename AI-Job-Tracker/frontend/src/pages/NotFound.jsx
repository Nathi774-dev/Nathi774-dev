import { Link } from "react-router-dom";

function NotFound() {
    return (
        <main className="auth-page">
            <section className="auth-card">
                <h1>404 Error</h1>
                <p>The page you're looking for does nto exist</p>
                <Link to="/" className="btn btn-primary">
                    Go Back Home
                </Link>
            </section>
        </main>
    )
}

export default NotFound;