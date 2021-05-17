import axios from 'axios';

export const coinsService = {
    getCoinsRate,
    getMarketGraph
};

async function getCoinsRate() {
    try {
        const res = await axios.get('https://api.coinstats.app/public/v1/coins?skip=0&limit=50');
        return res.data.coins;
    } catch (error) {
        console.error(error);
    }
}

async function getMarketGraph(range, coinId) {
    try {
        const res = await axios.get(`https://api.coinstats.app/public/v1/charts?period=${range}&coinId=${coinId}`);
        return res.data.chart;
    } catch (error) {
        console.error(error);
    }
}