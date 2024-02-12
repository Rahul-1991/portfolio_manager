import { useState, useEffect } from 'react'
import './App.css'
import PortfolioSummary from './components/PortfolioSummary'
import PortfolioComponents from './components/PortfolioComponents'


function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/portfolio_data');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setData(data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="main-body">
      <PortfolioSummary total={data.totalInvestment} />
      <PortfolioComponents components={data.transactions} />
    </div>
  )
}

export default App
