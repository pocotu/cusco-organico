import { Routes, Route } from "react-router-dom";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";

import MainLayout from "@/layouts/MainLayout";

import IndexPage from "@/pages/Index";
import AboutPage from "@/pages/About";

import { LoginPage } from "@/pages/Login";
import { RegisterPage } from "@/pages/Register";

import Home from "@/pages/dashboard/Index";
import Profile from "@/pages/dashboard/Profile";
import Ventures from "@/pages/dashboard/Ventures";
import Products from "@/pages/dashboard/Products";
import Reviews from "@/pages/dashboard/Reviews";

import { DashboardLayout } from "@/layouts/DashboardLayout";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas compartidas */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<IndexPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Route>

      {/* Rutas públicas */}
      <Route
        element={
          <PublicRoute>
            <MainLayout />
          </PublicRoute>
        }
      >
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Rutas privadas */}
      <Route
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route path="/dashboard" element={<Home />} />
        <Route path="/dashboard/profile" element={<Profile />} />
        <Route path="/dashboard/ventures" element={<Ventures />} />
        <Route
          path="/dashboard/ventures/:ventureId/products"
          element={<Products />}
        />
        <Route path="/dashboard/reviews" element={<Reviews />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
