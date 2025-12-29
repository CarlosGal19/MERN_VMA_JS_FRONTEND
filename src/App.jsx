import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthLayout from "./Layout/AuthLayout";
import ProtectedLayout from "./Layout/ProtectedLayout";

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ConfirmAccount from "./Pages/ConfirmAccount";
import ForgetPassword from "./Pages/ForgetPassword";
import UpdatePasswort from "./Pages/UpdatePassword";

import { AuthProvider } from "./Context/AuthProvider";
import ManagePatients from "./Pages/ManagePatients";
import { PatientProvider } from "./Context/PatientsProvider";
import EditProfile from "./Pages/EditProfile";
import ChangePassword from "./Pages/ChangePassword";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PatientProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="confirm/:token" element={<ConfirmAccount />} />
              <Route path="forget-password" element={<ForgetPassword />} />
              <Route path="forget-password/:token" element={<UpdatePasswort />} />
            </Route>
            <Route path="/admin" element={<ProtectedLayout />}>
              <Route index element={<ManagePatients />} />
              <Route path="profile" element={<EditProfile />} />
              <Route path="change-password" element={<ChangePassword />} />
            </Route>
          </Routes>

        </PatientProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
