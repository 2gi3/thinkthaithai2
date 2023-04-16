// export const getExchangeRate= async (newRate: string, baseCurrency = 'USD', amount = 5) =>{

//     try {
//         const raw = await fetch(`https://api.coinbase.com/v2/exchange-rates?currency=${baseCurrency}`);
//         const {data} = await raw.json();
//         const newCurrencyValue = data.rates[newRate] * amount
        
//         return newCurrencyValue
    
       
//       } catch (error) {
//         console.error(error)
//       }

// }

