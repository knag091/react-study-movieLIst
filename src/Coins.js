import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);

  const [coinRank, setCoinRank] = useState(0);
  const [myPrice, setMyPrice] = useState(0);

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  function priceOnChange(event) {
    setMyPrice(event.target.value);
    return;
  }
  function coinOnChange(event) {
    setCoinRank(event.target.value);
    return;
  }

  return (
    <div>
      <h1>The Coins! {!loading ? "(" + coins.length + ")" : null}</h1>
      <div>
        <input onChange={priceOnChange} type="number" />
      </div>

      {loading ? (
        <strong>Loading..</strong>
      ) : (
        <select onChange={coinOnChange}>
          <option value={false}>select please</option>
          {coins.map((coin) => (
            <option key={coin.id} value={coin.rank}>
              {coin.rank} | {coin.name} ({coin.symbol}): {coin.quotes.USD.price}{" "}
              USD
            </option>
          ))}
        </select>
      )}

      <h1>
        {myPrice > 0 && coinRank
          ? `${myPrice / coins[coinRank - 1].quotes.USD.price} ${
              coins[coinRank - 1].symbol
            }`
          : "no"}
      </h1>
    </div>
  );
}

export default App;
