import { Routes, Route } from "react-router-dom";
import AddTodo from './AddTodo';
import { Layout } from "./Layout";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<AddTodo />} />
          <Route path="add-todo" element={<AddTodo />} />
        </Route>
      </Routes>
  );
}

export default App;