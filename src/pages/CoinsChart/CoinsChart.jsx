import './CoinsChart.scss'
import { Bar, Line } from 'react-chartjs-2';
import moment from 'moment';
import { useCoins } from '../../context/CoinsContext';
import { utilService } from '../../services/util.service';
import { CoinList } from '../../cmps/CoinList/CoinList';
import { lighten, makeStyles, Typography } from '@material-ui/core';
import ChartGroup from '../../cmps/ChartGroup/ChartGroup';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.primary,
                backgroundColor: theme.palette.secondary.primary,
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.primary,
            },
}));

export const CoinsChart = (props) => {
    const classes = useStyles();
    const [value, setValue] = useState('line');
    const { coinsToCompare } = useCoins();


    const labels = coinsToCompare.map(coin => coin.priceRates.map((period) => moment(period[0]).format('hh')));
    const data = {
        labels: labels[0],
        datasets: coinsToCompare.map(coin => {
            return {
                label: coin.symbol,
                data: coin.priceRates.map(period => period[1]),
                fill: false,
                borderColor: utilService.getRandomColor(),
                backgroundColor: utilService.getRandomColor(),
                tension: 1,
                pointRadius: 0,
            }
        }),
    };

    const options = {
        grid: {
            display: false
        },
        scales: {
            x: {
                ticks: {
                    maxTicksLimit: coinsToCompare.length > 0 && labels[0].length / 40
                }
            },
            y: {
                ticks: {
                    maxTicksLimit: coinsToCompare.length > 0 && labels[0].length
                }
            }
        }
    }

    const toggleChartValue = (event) => {
        setValue(event.target.value);
    };

    return (
        (coinsToCompare.length > 0) ? <section className="coins-chart">
            <header className='chart-header'>
                <ChartGroup toggleChartValue={toggleChartValue} value={value} />
                <CoinList coins={coinsToCompare} />
            </header>
            {value === 'line' && <Line data={data} options={options} />}
            {value === 'bar' && <Bar data={data} options={options} />}
        </section > : <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                No Crypto Currency To Compare !
                      </Typography>
    )
}

