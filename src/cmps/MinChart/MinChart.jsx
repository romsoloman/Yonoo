import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { coinsService } from '../../services/coins.service';
import './MinChart.scss'



export const MinChart = ({ range, coinId, price }) => {
    const [coinPrice, setCoinPrice] = useState([]);

    useEffect(() => {
        loadCoinPrice();
    }, [])

    const loadCoinPrice = async () => {
        const coin = await coinsService.getMarketGraph(range, coinId);
        setCoinPrice(coin)
    }

    const labels = coinPrice.map(period => period[0]);

    const data = {
        labels,
        datasets: [
            {
                label: '',
                fill: false,
                data: coinPrice.map(period => period[1]),
                borderColor: price > 0 ? 'green' : 'red',
                tension: 0.5,
                backgroundColor: 'white',
                pointRadius: 0,
            }
        ]
    }
    const options = {
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    display: false,
                }
            },
            y: {
                grid: {
                    display: false
                },
                ticks: {
                    display: false,
                }
            }
        }
    }
    return (
        (coinPrice.length > 0) && <div>
            <Line data={data} options={options} />
        </div>
    )
}

