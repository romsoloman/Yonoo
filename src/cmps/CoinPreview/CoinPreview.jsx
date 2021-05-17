
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { useCoins } from '../../context/CoinsContext'
import './CoinPreview.scss'

export const CoinPreview = ({ coin }) => {
    const { removeCoin } = useCoins();

    const handleRemoveCoin = (ev, coinId) => {
        ev.stopPropagation();
        removeCoin(coinId, true)
        console.log('removed');
    }

    return (
        <li className="flex coin-preview">
            <img src={coin.icon} alt="" />
            <p className="coin-name">{coin.name}</p>
            <p className="coin-symbol">{coin.symbol}</p>
            <DeleteOutlineIcon onClick={(ev) => handleRemoveCoin(ev, coin.id)} />
        </li >
    )
}

