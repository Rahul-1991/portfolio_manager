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

export default PercentDisplay
