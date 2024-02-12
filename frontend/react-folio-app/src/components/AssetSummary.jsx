import '../App.css'


function AssetSummary(props) {
    return (
        <div className="mutual-fund" onClick={props.toggleVisibility}>
          <props.logo size={24} color="blue" />
          <div className="component-heading">
            <p className="components-text">{props.type}</p> 
          </div>
          <div className="component-heading">
            <p className="components-text-heading">Invested</p>
            <p className="components-text">{props.invested.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
          </div>
          <div className="component-heading">
            <p className="components-text-heading">Return</p>
            <p className="components-text">{props.return.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
          </div>
          <div className="component-heading">
            <p className="components-text-heading">Gain/Loss</p>
            <p className="components-text">{props.gain.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
          </div>
        </div>
      )
}

export default AssetSummary