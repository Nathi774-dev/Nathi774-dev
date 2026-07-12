// necessary for url routes
import { BrowserRouter, Routes, Route } from "react-router-dom";

// reusable components
import Layout from "./components/Layout";

// webpages
import Documents from "./pages/Documents";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Applications from "./pages/Applications";
import Interviews from "./pages/Interviews";
import CalendarPage from "./pages/Calendar";

// protecting routes with Authorization
// prventing logged out users from accessing these routes
import ProtectedRoute from "./routes/ProtectedRoute";
import MockInterview from "./pages/MockInterview";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" Component={Login} />
                <Route path="/register" Component={Register} />

                <Route 
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Dashboard />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route 
                    path="/applications"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Applications />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                {/* This route is for scheduling the interviews */}
                <Route 
                    path="/interviews"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Interviews />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                {/* This route is for uploading resumes */}
                <Route 
                    path="/documents"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Documents />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                {/* The first AI route */}
                <Route 
                    path="/mock-interview"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <MockInterview />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route 
                    path="/calendar"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <CalendarPage />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}