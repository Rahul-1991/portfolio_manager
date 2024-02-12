import { useState } from 'react'
import { BsGraphUpArrow } from "react-icons/bs"
import { GiPayMoney } from "react-icons/gi"
import { FaMoneyBillTrendUp } from "react-icons/fa6"
import { MdAttachMoney } from "react-icons/md"
import AssetSummary from './AssetSummary'
import { TbPigMoney } from "react-icons/tb"
import MutualfundSchemes from './assets/MutualfundSchemes'
import StockSchemes from './assets/StockSchemes'
import RDSchemes from './assets/RDSchemes'
import NSCSchemes from './assets/NSCSchemes'
import CryptoScheme from './assets/CryptoScheme'


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
  
    function getComponentData(component) {
      switch (component.type) {
        case "Mutual Funds":
          return {
            toggleVisibility: toggleMfVisibility,
            returnValue: component.current,
            logo: TbPigMoney,
            schemeComponent: <MutualfundSchemes isVisible={isMfVisible} component={component} />
          };
        case "Recurring Deposit":
          return {
            toggleVisibility: toggleRDVisibility,
            returnValue: component.maturity,
            logo: GiPayMoney,
            schemeComponent: <RDSchemes isVisible={isRDVisible} component={component} />
          };
        case "Stocks":
          return {
            toggleVisibility: toggleStockVisibility,
            returnValue: component.current,
            logo: BsGraphUpArrow,
            schemeComponent: <StockSchemes isVisible={isStockVisible} component={component} />
          };
        case "Nsc":
          return {
            toggleVisibility: toggleNscVisibility,
            returnValue: component.maturity,
            logo: FaMoneyBillTrendUp,
            schemeComponent: <NSCSchemes isVisible={isNscVisible} component={component} />
          };
        case "Crypto":
          return {
            toggleVisibility: toggleCryptoVisibility,
            returnValue: component.current,
            logo: MdAttachMoney,
            schemeComponent: <CryptoScheme isVisible={isCryptoVisible} component={component} />
          };
        default:
          return null;
      }
    }
  
    return (
      <div className="portfolio-components">
        {props.components.map(component => {
          const { toggleVisibility, returnValue, logo, schemeComponent } = getComponentData(component);
          return <div>
            <AssetSummary
              toggleVisibility={toggleVisibility}
              invested={component.invested}
              return={returnValue}
              gain={component.gain}
              type={component.type}
              logo={logo}
            />
            {schemeComponent}
          </div>
  
        })}
      </div>
    ); 
}

export default PortfolioComponents
