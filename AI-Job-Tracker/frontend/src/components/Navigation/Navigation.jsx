import { NavLink } from "react-router-dom";
import { useState } from "react";
import NavItem from "./NavItem";

export default function Navigation({ onLogout }) {
    const [aiIsOpen, setAiIsOpen] = useState(false);

    const linkClass = ({ isActive }) => {
        `nav-link ${isActive ? "active" : ""}`;
    }

    return (
        <header className="topbar">
            <div className="topbar-inner">
                <NavLink to="/" className="brand">
                    <span className="brand-mark">AI</span>
                    <span className="brand-text">
                        <strong>Job Tracker</strong>
                        <small>Career Assistant</small>
                    </span>
                </NavLink>
                <nav className="top-nav" aria-label="Main navigation">
                    <NavItem to="/" className={linkClass}>Dashboard</NavItem>
                    <NavItem to="/documents" className={linkClass}>Documents</NavItem>
                    <NavItem to="/applications" className={linkClass}>Applications</NavItem>
                    <NavItem to="/interviews" className={linkClass}>Interviews</NavItem>
                    <NavItem to="/calendar" className={linkClass}>Calendar</NavItem>
                    <NavItem to="/documents" className={linkClass}>Uploading Resumes</NavItem>
                    <NavItem to="/mock-interview" className={linkClass}>Make a mock interview</NavItem>

                    <div className="nav-dropdown">
                        <button
                            type="button"
                            className={`nav-link ${aiIsOpen ? "active" : ""}`}
                            onClick={() => setAiIsOpen((currentState) => !currentState)}
                            aria-expanded={aiIsOpen}
                        >
                            AI Tools
                            <span className="dropdown-arrow">⬇️</span>
                        </button>

                        {aiIsOpen && (
                            <div className="nav-dropdown-menu">
                                <NavLink to="/resume-analysis" className={linkClass} onClick={() => setAiIsOpen(false)}>
                                    Resume Analysis
                                </NavLink>
                                <NavLink to="/job-match" className={linkClass} onClick={() => setAiIsOpen(false)}>
                                    Job Match
                                </NavLink>
                                <NavLink to="/interview-coach" className={linkClass} onClick={() => setAiIsOpen(false)}>
                                    Interview Coach
                                </NavLink>
                                <NavLink to="/cover-letter" className={linkClass} onClick={() => setAiIsOpen(false)}>
                                    Cover Letter
                                </NavLink>
                                <NavLink to="/resume-rewriter" className={linkClass} onClick={() => setAiIsOpen(false)}>
                                    Resume Rewriter
                                </NavLink>
                                <NavLink to="/mock-interview" className={linkClass} onClick={() => setAiIsOpen(false)}>
                                    Mock Interview
                                </NavLink>
                            </div>
                        )}
                    </div>
                </nav>

                <button
                    type="button"
                    className="logout-button"
                    onClick={onLogout}
                >
                    Logout
                </button>
            </div>
        </header>
    )
}