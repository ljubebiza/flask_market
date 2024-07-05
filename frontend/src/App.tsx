import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home";
import Header from "./componets/Header";
import ItemList from "./componets/ItemList";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/home");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const showData = await response.json();
        const {
          data: { items },
        } = showData;
        setData(items);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="App">
      <Header />
      <Home />
      <ItemList items={data} />
    </div>
  );
}

export default App;
