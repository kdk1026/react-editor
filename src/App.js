import { BrowserRouter } from "react-router-dom";
import CommonRoute from "./components/CommonRoute";
import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <CommonRoute />
      </BrowserRouter>
    </div>
  );
}

export default App;
