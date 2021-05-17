import { TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core';
import './CoinsTableHead.scss'
import { FilterMenu } from '../FilterMenu/FilterMenu'

const headCells = [
    { id: 'rank', numeric: true, disablePadding: true, label: '#' },
    { id: 'name', numeric: false, disablePadding: false, label: 'NAME' },
    { id: 'priceChange24h', numeric: true, disablePadding: false, label: '24H CHANGE' },
    { id: 'price', numeric: true, disablePadding: false, label: 'PRICE' },
    { id: 'priceBtc', numeric: true, disablePadding: false, label: 'PRICE IN BTC' },
    { id: 'marketCap', numeric: true, disablePadding: false, label: 'MARKET CAP' },
    { id: 'volume', numeric: true, disablePadding: false, label: 'VOLUME 24H' },
    { id: 'priceGraph7d', numeric: false, disablePadding: false, label: 'PRICE GRAPH (7D)' },
];

export const CoinsTableHead = (props) => {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'center'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell align="center">
                    <FilterMenu headCells={headCells} />
                </TableCell>
            </TableRow>
        </TableHead>
    );
}


