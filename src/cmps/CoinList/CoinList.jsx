

import { CoinPreview } from '../CoinPreview/CoinPreview'
import './CoinList.scss'

export const CoinList = ({ coins }) => {

    return (
        <ul className="flex justify-between coin-list">
            {coins.map((coin, idx) => {
                return <CoinPreview coin={coin} key={idx} />
            })}
        </ul>
    )
}

