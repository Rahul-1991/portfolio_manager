import PriceDisplay from '../PriceDisplay'
import PercentDisplay from '../PercentDisplay'


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

  export default StockSchemes
  