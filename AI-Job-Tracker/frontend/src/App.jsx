import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Applications from "./pages/Applications";

import ProtectedRoute from "./routes/ProtectedRoute";

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

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}