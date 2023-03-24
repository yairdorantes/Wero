import "./App.css";
import { AuthProvider } from "./components/context/AuthContext";
import FIleCSV from "./components/FIleCSV";
import MyRoute from "./routes/MyRoute";
function App() {
  return (
    <>
      <AuthProvider>
        <MyRoute></MyRoute>
      </AuthProvider>
    </>
  );
}

export default App;
