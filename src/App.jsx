import { Routes, Route } from "react-router-dom";
import AddTask from '@/AddTask.jsx';
import { Layout } from "@/components/layouts/Layout.jsx";
import { AuthLayout } from "@/components/layouts/AuthLayout.jsx";
import { LoginForm } from "@/components/login-form.jsx";
import { SignUpForm } from "@/components/sign-up-form.jsx";
import { ProtectedRoute } from "@/components/ProtectedRoute.jsx";

function App() {
  return (
      <Routes>
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>} >
          <Route index element={<AddTask />} />
          <Route path="add-task" element={<AddTask />} />
        </Route>
          <Route path="/login" element={<AuthLayout><LoginForm /></AuthLayout>} />
          <Route path="/sign-up" element={<AuthLayout><SignUpForm /></AuthLayout>} />
      </Routes>
  );
}

export default App;