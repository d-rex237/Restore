import Dashboard from "./Dashboard";
import Sidebar from "./components/Sidebar";


  function App() {
    return (
      <div style={{ display: "flex", height: "100vh" }}>
        <Sidebar/>
        <Dashboard/>
      </div>
    );
  }

export default App;
