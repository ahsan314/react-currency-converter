import { useState } from "react";
import { InputBox } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  const initialAmount = "";
  const initialFromCurrency = "usd";
  const initialToCurrency = "pkr";
  const initialConvertedAmount = "0.00";

  const [amount, setAmount] = useState(initialAmount);
  const [fromCurrency, setFromCurrency] = useState(initialFromCurrency);
  const [toCurrency, setToCurrency] = useState(initialToCurrency);
  const [convertedAmount, setConvertedAmount] = useState(
    initialConvertedAmount
  );

  const currencyInfo = useCurrencyInfo(fromCurrency);
  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setConvertedAmount(amount);
    setAmount(Math.floor(convertedAmount));
  };

  const resetHandler = () => {
    setFromCurrency(initialFromCurrency);
    setToCurrency(initialToCurrency);
    setConvertedAmount(initialAmount);
    setAmount(initialConvertedAmount);
  };

  const convertCurrency = () => {
    setConvertedAmount((Number(amount) * currencyInfo[toCurrency]).toFixed(2));
  };

  return (
    <div
      className='w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat'
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
      }}
    >
      <div className='w-full'>
        <div className='w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30'>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convertCurrency();
            }}
          >
            <div className='w-full mb-1'>
              <InputBox
                label='From'
                amount={amount}
                currencyOptions={options}
                currencyChangeHandler={(currency) => setFromCurrency(currency)}
                amountChangeHandler={(amount) =>
                  amount > 0 ? setAmount(amount) : setAmount("")
                }
                selectedCurrency={fromCurrency}
              />
            </div>
            <div className='relative w-full h-0.5'>
              <button
                type='button'
                className='absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 hover:bg-blue-800 text-white px-2 py-0.5'
                onClick={swap}
              >
                swap
              </button>
            </div>
            <div className='w-full mt-1 mb-4'>
              <InputBox
                label='To'
                amount={convertedAmount}
                currencyOptions={options}
                currencyChangeHandler={(currency) => setToCurrency(currency)}
                amountChangeHandler={(amount) => setConvertedAmount(amount)}
                selectedCurrency={toCurrency}
                amountDisabled
              />
            </div>
            <button
              type='submit'
              className='w-full bg-blue-600 hover:bg-blue-800 text-white px-4 py-3 rounded-lg mb-2'
            >
              Convert {fromCurrency.toUpperCase()} to {toCurrency.toUpperCase()}
            </button>

            <button
              type='reset'
              className='w-full bg-gray-500 hover:bg-gray-700 text-white px-4 py-3 rounded-lg'
              onClick={resetHandler}
            >
              Reset
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
