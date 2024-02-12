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

export default PriceDisplay
