import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Watch from "./Pages/Watch";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Profile from "./Pages/Profile";
import Upload from "./Pages/Upload";

import NotFound from "./Pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoutes";
import PublicRoute from "./components/PublicRoutes";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* ================= Protected Routes ================= */}

                {/* Home Feed */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />

                {/* Dashboard */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Profile */}
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

                {/* Upload */}
                <Route
                    path="/upload"
                    element={
                        <ProtectedRoute>
                            <Upload />
                        </ProtectedRoute>
                    }
                />

                {/* Playlists */}
                {/* <Route
                    path="/playlists"
                    element={
                        <ProtectedRoute>
                            <Playlists />
                        </ProtectedRoute>
                    }
                /> */}

                {/* Watch Video (Coming Next) */}
              <Route
    path="/watch/:videoId"
    element={
        <ProtectedRoute>
            <Watch />
        </ProtectedRoute>
    }
/>

                {/* ================= Public Routes ================= */}

                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/signup"
                    element={
                        <PublicRoute>
                            <Signup />
                        </PublicRoute>
                    }
                />

                {/* ================= 404 ================= */}

                <Route path="*" element={<NotFound />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;