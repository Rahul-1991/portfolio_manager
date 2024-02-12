import { useState, useEffect } from 'react'
import './App.css'
import { BsGraphUpArrow } from "react-icons/bs";
import { TbPigMoney } from "react-icons/tb";
import { GiPayMoney } from "react-icons/gi";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { MdAttachMoney } from "react-icons/md";


function PriceDisplay({ price }) {
  // Example: Determine if the price change is positive or negative
  const isPositive = price >= 0;

  return (
    <div style={{ display: 'inline-block' }} className={`${isPositive ? 'positive' : 'negative'}`}>
      <span>{price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</span>
      {isPositive ? (
        <span className="arrow">&#x25B2;</span> // Up arrow
      ) : (
        <span className="arrow">&#x25BC;</span> // Down arrow
      )}
    </div>
  );
}

function PercentDisplay({ percent }) {
  // Example: Determine if the price change is positive or negative
  const isPositive = percent >= 0;

  return (
    <div style={{ display: 'inline-block' }} className={`${isPositive ? 'positive' : 'negative'}`}>
      <span>{percent}%</span>
      {isPositive ? (
        <span className="arrow">&#x25B2;</span> // Up arrow
      ) : (
        <span className="arrow">&#x25BC;</span> // Down arrow
      )}
    </div>
  );
}

function PortfolioSummary(props) {
  return (
    <div className="portfolio-summary">
      <div className="customer-name">
        <p>Hi Rahul</p>
      </div>
      <div className="net-worth">
        <p>Net Worth</p>
        <p className="portfolio-value">&#x20B9; {props.total}</p>
      </div>
    </div>
  );
}

function MutualFund(props) {
  return (
    <div className="mutual-fund" onClick={props.toggleVisibility}>
      <TbPigMoney size={24} color="blue" />
      <div className="component-heading">
        <p className="components-text">{props.type}</p> 
      </div>
      <div className="component-heading">
        <p className="components-text-heading">Invested</p>
        <p className="components-text">{props.invested.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
      </div>
      <div className="component-heading">
        <p className="components-text-heading">Current</p>
        <p className="components-text">{props.current.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
      </div>
      <div className="component-heading">
        <p className="components-text-heading">Gain/Loss</p>
        <p className="components-text">{props.gain.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
      </div>
    </div>
  )
}

function Stocks(props) {
  return (
    <div className="mutual-fund" onClick={props.toggleVisibility}>
      <BsGraphUpArrow size={24} color="blue" />
      <div className="component-heading">
        <p className="components-text">{props.type}</p> 
      </div>
      <div className="component-heading">
        <p className="components-text-heading">Invested</p>
        <p className="components-text">{props.invested.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
      </div>
      <div className="component-heading">
        <p className="components-text-heading">Current</p>
        <p className="components-text">{props.current.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
      </div>
      <div className="component-heading">
        <p className="components-text-heading">Gain/Loss</p>
        <p className="components-text">{props.gain.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
      </div>
    </div>
  )
}

function MutualfundSchemes(props) {
  return (
    <div>
      {props.isVisible && <div className="mf-schemes">
        <div className="mf-summary">
          <div>
            <p className="components-text">{props.component.current.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
            <p className="components-text-heading">Current Value</p>
          </div>
          <div className="mf-summary-breakup">
            <p className="components-text-heading">Invested Value {props.component.invested.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <p className="components-text-heading">Total Returns</p>
              <PriceDisplay price={props.component.gain} />
            </div>
            <p className="components-text">XIRR</p>
          </div>
        </div>
        <div className="mf-scheme-header">
          <p className="components-text-heading">SCHEME NAME</p>
          <p className="components-text-heading">INVESTED</p>
          <p className="components-text-heading">RETURNS(%)</p>
          <p className="components-text-heading">CURRENT</p>
        </div>
        {props.component.investments.map(scheme => {
          return <div className="mf-scheme">
            <p className="components-text">{scheme.name}</p>
            {/* <div style={{ flex: 1 }}>
              <p className="components-text">-0.21%</p>
              <p className="components-text">-&#x20B9; 105.25</p>
            </div> */}
            <p className="components-text">{scheme.invested.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
            <div style={{ flex: 1 }}>
              <p className="components-text">{scheme.unrealisedGain.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
              {/* <p className="components-text">{scheme.returnPercent}%</p> */}
              <PercentDisplay percent={scheme.returnPercent} />
            </div>
            {/* <div style={{ flex: 1 }}>
              <p className="components-text">&#x20B9; 49,846</p>
              <p className="components-text">&#x20B9; 32,408</p>
            </div> */}
            <p className="components-text">{scheme.currentAmount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
          </div>
        })}
      </div>}
    </div>
  )
}

function StockSchemes(props) {
  return (
    <div>
      {props.isVisible && <div className="mf-schemes">
        <div className="mf-summary">
          <div>
            <p className="components-text">{props.component.current.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
            <p className="components-text-heading">Current Value</p>
          </div>
          <div className="mf-summary-breakup">
            <p className="components-text-heading">Invested Value {props.component.invested.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <p className="components-text-heading">Total Returns</p>
              <PriceDisplay price={props.component.gain} />
            </div>
          </div>
        </div>
        <div className="mf-scheme-header">
          <p className="components-text-heading">COMPANY</p>
          <p className="components-text-heading">INVESTED</p>
          <p className="components-text-heading">MKT PRICE</p>
          <p className="components-text-heading">RETURNS(%)</p>
          <p className="components-text-heading">CURRENT</p>
        </div>
        {props.component.investments.map(scheme => {
          return <div className="mf-scheme">
            <div style={{ flex: 1 }}>
              <p className="components-text">{scheme.name}</p>
              <p className="components-text">{scheme.qty} shares - Avg &#x20B9;317.01</p>
            </div>
            <div style={{ flex: 1 }}>
              <p className="components-text">{scheme.invested.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
            </div>
            <div style={{ flex: 1 }}>
              <p className="components-text">{scheme.currentPrice.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
            </div>
            <div style={{ flex: 1 }}>
              <p className="components-text">{scheme.unrealisedGain.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
              <PercentDisplay percent={scheme.returnPercent} />
            </div>
            <div style={{ flex: 1 }}>
              <p className="components-text">{scheme.currentAmount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
            </div>
          </div>
        })}
      </div>}
    </div>
  )
}

function RecurringDeposit(props) {
  return (
    <div className="mutual-fund" onClick={props.toggleVisibility}>
      <GiPayMoney size={24} color="blue" />
      <div className="component-heading">
        <p className="components-text">{props.type}</p> 
      </div>
      <div className="component-heading">
        <p className="components-text-heading">Invested</p>
        <p className="components-text">{props.invested.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
      </div>
      <div className="component-heading">
        <p className="components-text-heading">Maturity</p>
        <p className="components-text">{props.maturity.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
      </div>
      <div className="component-heading">
        <p className="components-text-heading">Gain/Loss</p>
        <p className="components-text">{props.gain.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
      </div>
    </div>
  ) 
}

function RDSchemes(props) {
  return (
    <div>
      {props.isVisible && <div className="mf-schemes">
        <div className="mf-summary">
          <div>
            <p className="components-text">{props.component.maturity.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
            <p className="components-text-heading">Maturity Value</p>
          </div>
          <div className="mf-summary-breakup">
            <p className="components-text-heading">Invested Value {props.component.invested.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <p className="components-text-heading">Total Returns</p>
              <PriceDisplay price={props.component.gain} />
            </div>
          </div>
        </div>
        <div className="mf-scheme-header">
          <p className="components-text-heading">SCHEME NAME</p>
          <p className="components-text-heading">INVESTED</p>
          <p className="components-text-heading">INSTALLMENT</p>
          <p className="components-text-heading">MATURITY DATE</p>
          <p className="components-text-heading">MATURITY AMOUNT</p>
        </div>
        {props.component.investments.map(scheme => {
          return <div className="mf-scheme">
            <div style={{ flex: 1 }}>
              <p className="components-text">{scheme.name}</p>
              <p style={{ fontSize: 13 }} className="components-text">Rate {scheme.rate}%</p>
            </div>
            <div style={{ flex: 1 }}>
              <p className="components-text">{scheme.invested.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
            </div>
            <div style={{ flex: 1 }}>
              <p className="components-text">{scheme.installment.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
            </div>
            <div style={{ flex: 1 }}>
              <p className="components-text">24th July 2024</p>
            </div>
            <div style={{ flex: 1 }}>
              <p className="components-text">{scheme.maturityAmount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
            </div>
          </div>
        })}
      </div>}
    </div>
  )
}

function NSCSchemes(props) {
  return (
    <div>
      {props.isVisible && <div className="mf-schemes">
        <div className="mf-summary">
          <div>
            <p className="components-text">{props.component.maturity.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
            <p className="components-text-heading">Maturity Value</p>
          </div>
          <div className="mf-summary-breakup">
            <p className="components-text-heading">Invested Value {props.component.invested.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <p className="components-text-heading">Total Returns</p>
              <PriceDisplay price={props.component.gain} />
            </div>
          </div>
        </div>
        <div className="mf-scheme-header">
          <p className="components-text-heading">SCHEME NAME</p>
          <p className="components-text-heading">INVESTED</p>
          <p className="components-text-heading">MATURITY DATE</p>
          <p className="components-text-heading">MATURITY AMOUNT</p>
        </div>
        {props.component.investments.map(scheme => {
          return <div className="mf-scheme">
            <div style={{ flex: 1 }}>
              <p className="components-text">{scheme.name}</p>
              <p style={{ fontSize: 13 }} className="components-text">Rate {scheme.rate}%</p>
            </div>
            <div style={{ flex: 1 }}>
              <p className="components-text">{scheme.invested.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
            </div>
            <div style={{ flex: 1 }}>
              <p className="components-text">24th July 2024</p>
            </div>
            <div style={{ flex: 1 }}>
              <p className="components-text">{scheme.maturityAmount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
            </div>
          </div>
        })}
      </div>}
    </div>
  )
}

function NSC(props) {
  return (
    <div className="mutual-fund" onClick={props.toggleVisibility}>
      <FaMoneyBillTrendUp size={24} color="blue" />
      <div className="component-heading">
        <p className="components-text">{props.type}</p> 
      </div>
      <div className="component-heading">
        <p className="components-text-heading">Invested</p>
        <p className="components-text">{props.invested.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
      </div>
      <div className="component-heading">
        <p className="components-text-heading">Maturity</p>
        <p className="components-text">{props.maturity.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
      </div>
      <div className="component-heading">
        <p className="components-text-heading">Gain/Loss</p>
        <p className="components-text">{props.gain.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
      </div>
    </div>
  )
}

function CryptoDeposit(props) {
  return (
    <div className="mutual-fund" onClick={props.toggleVisibility}>
      <MdAttachMoney size={24} color="blue" />
      <div className="component-heading">
        <p className="components-text">{props.type}</p> 
      </div>
      <div className="component-heading">
        <p className="components-text-heading">Invested</p>
        <p className="components-text">{props.invested.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
      </div>
      <div className="component-heading">
        <p className="components-text-heading">Current</p>
        <p className="components-text">{props.current.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
      </div>
      <div className="component-heading">
        <p className="components-text-heading">Gain/Loss</p>
        <p className="components-text">{props.gain.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
      </div>
    </div>
  ) 
}

function CryptoScheme(props) {
  return (
    <div>
      {props.isVisible && <div className="mf-schemes">
        <div className="mf-summary">
          <div>
            <p className="components-text">{props.component.current.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
            <p className="components-text-heading">Current Value</p>
          </div>
          <div className="mf-summary-breakup">
            <p className="components-text-heading">Invested Value {props.component.invested.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <p className="components-text-heading">Total Returns</p>
              <PriceDisplay price={props.component.gain} />
            </div>
          </div>
        </div>
        <div className="mf-scheme-header">
          <p className="components-text-heading">COMPANY</p>
          <p className="components-text-heading">INVESTED</p>
          <p className="components-text-heading">MKT PRICE</p>
          <p className="components-text-heading">RETURNS(%)</p>
          <p className="components-text-heading">CURRENT</p>
        </div>
        {props.component.investments.map(scheme => {
          return <div className="mf-scheme">
            <div style={{ flex: 1 }}>
              <p className="components-text">{scheme.name}</p>
              <p className="components-text">{scheme.qty} shares - Avg &#x20B9;317.01</p>
            </div>
            <div style={{ flex: 1 }}>
              <p className="components-text">{scheme.invested.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
            </div>
            <div style={{ flex: 1 }}>
              <p className="components-text">{scheme.currentPrice.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
            </div>
            <div style={{ flex: 1 }}>
              <p className="components-text">{scheme.unrealisedGain.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
              <PercentDisplay percent={scheme.returnPercent} />
            </div>
            <div style={{ flex: 1 }}>
              <p className="components-text">{scheme.currentAmount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
            </div>
          </div>
        })}
      </div>}
    </div>
  )
}


function PortfolioComponents(props) {
  const [isMfVisible, setIsMfVisible] = useState(false);
  const toggleMfVisibility = () => {
    setIsMfVisible(!isMfVisible);
  };

  const [isStockVisible, setIsStockVisible] = useState(false);
  const toggleStockVisibility = () => {
    setIsStockVisible(!isStockVisible);
  };

  const [isRDVisible, setIsRDVisible] = useState(false);
  const toggleRDVisibility = () => {
    setIsRDVisible(!isRDVisible);
  };

  const [isNscVisible, setIsNscVisible] = useState(false);
  const toggleNscVisibility = () => {
    setIsNscVisible(!isNscVisible);
  };

  const [isCryptoVisible, setIsCryptoVisible] = useState(false);
  const toggleCryptoVisibility = () => {
    setIsCryptoVisible(!isCryptoVisible);
  };

  return (
    <div className="portfolio-components">
      {props.components.map(component => {
        switch(component.type) {
          case "Mutual Funds":
            return <div>
                <MutualFund 
                  toggleVisibility={toggleMfVisibility} 
                  invested={component.invested}
                  current={component.current}
                  gain={component.gain} 
                  type={component.type}
                />
                <MutualfundSchemes isVisible={isMfVisible} component={component} />
              </div>
          case "Recurring Deposit":
            return <div> 
                <RecurringDeposit 
                  toggleVisibility={toggleRDVisibility} 
                  invested={component.invested}
                  maturity={component.maturity}
                  gain={component.gain} 
                  type={component.type}
                />
                <RDSchemes isVisible={isRDVisible} component={component} />
              </div>
          case "Stocks":
            return <div> 
                <Stocks 
                  toggleVisibility={toggleStockVisibility}
                  invested={component.invested}
                  current={component.current}
                  gain={component.gain} 
                  type={component.type}
                />
                <StockSchemes isVisible={isStockVisible} component={component} />
              </div>
          case "Nsc":
            return <div>
                <NSC 
                  toggleVisibility={toggleNscVisibility} 
                  invested={component.invested}
                  maturity={component.maturity}
                  gain={component.gain} 
                  type={component.type}
                />
                <NSCSchemes isVisible={isNscVisible} component={component} />
              </div>
          case "Crypto":
            return <div> 
              <CryptoDeposit 
                toggleVisibility={toggleCryptoVisibility} 
                invested={component.invested}
                current={component.current}
                gain={component.gain} 
                type={component.type}
              />
              <CryptoScheme isVisible={isCryptoVisible} component={component} />
            </div>
        }
      })}
    </div>
  );
}

function App() {
  console.log('inside 1');
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log('inside 2');
      try {
        const response = await fetch('http://127.0.0.1:5000/portfolio_data');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log(data);
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
