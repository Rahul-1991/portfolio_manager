import PriceDisplay from '../PriceDisplay'


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

export default RDSchemes
