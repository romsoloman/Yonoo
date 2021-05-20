import { useEffect, useState, useContext, createContext } from 'react';
import { coinsService } from '../services/coins.service';

const CoinsContext = createContext();

export const CoinsProvider = ({ children }) => {
    const [coins, setCoins] = useState([]);
    const [coinsToCompare, setCoinsToCompare] = useState([]);

    useEffect(() => {
        loadCoins();
    }, [])



    const loadCoins = async () => {
        try {
            const coins = await coinsService.getCoinsRate();
            setCoins(coins);
        } catch (err) {
            console.log('err-cant load coins', err);
        }
    }

    const removeCoin = (coinId, isChart) => {
        const coinsData = isChart ? JSON.parse(JSON.stringify(coinsToCompare)) : JSON.parse(JSON.stringify(coins))
        const idx = coinsData.findIndex(coin => {
            coin.isAdd = false;
            return coin.id === coinId
        });
        if (idx !== -1) {
            coinsData.splice(idx, 1);
        }
        isChart ? setCoinsToCompare(coinsData) : setCoins(coinsData)
    }

    const addCoinToCompare = async (range, coinId) => {
        try {
            const compareCoinPrice = await coinsService.getMarketGraph(range, coinId);
            const coinsData = JSON.parse(JSON.stringify(coins))
            coinsData.forEach(coin => {
                if (coin.id === coinId) {
                    coin.priceRates = compareCoinPrice
                    coin.isAdd = true;
                    setCoinsToCompare(prevState => [...prevState, coin])
                }
            });
        } catch (err) {
            console.log('err- cant compare coins', err);
        }
    }


    return (
        <CoinsContext.Provider value={{
            coins, coinsToCompare, addCoinToCompare, removeCoin,
        }}>
            {children}
        </CoinsContext.Provider>
    )
}

export const useCoins = () => useContext(CoinsContext);