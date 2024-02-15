function PortfolioSummary(props) {
    return (
      <div className="portfolio-summary">
        <div className="customer-name">
          <p>Hi Rahul</p>
        </div>
        <div className="net-worth">
          <p>Net Worth</p>
          <p className="portfolio-value">{props.total.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
        </div>
      </div>
    );
}

export default PortfolioSummary
