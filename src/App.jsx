import { Routes, Route } from "react-router-dom";
import AddTask from './AddTask.jsx';
import { Layout } from "./Layout";
import { LoginForm } from "./components/login-form.jsx";
import { SignUpForm } from "./components/sign-up-form.jsx";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<AddTask />} />
          <Route path="add-task" element={<AddTask />} />
        </Route>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
      </Routes>
  );
}

export default App;