import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";
import WrongBookPage from "./pages/WrongBookPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz/:mode" element={<QuizPage />} />
        <Route path="/wrong-book" element={<WrongBookPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
