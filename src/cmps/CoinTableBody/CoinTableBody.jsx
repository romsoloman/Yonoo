import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { TableBody, TableCell, TableRow } from '@material-ui/core';
import { utilService } from '../../services/util.service';
import './CoinTableBody.scss'
import { MinChart } from '../MinChart/MinChart';
import { OptionsMenu } from '../OptionsMenu';

export const CoinTableBody = ({ coins, order, orderBy, page, rowsPerPage, emptyRows, selected, isHide, handleClick }) => {
    const isSelected = (name) => selected.indexOf(name) !== -1;
    return (
        <TableBody>
            {utilService.stableSort(coins, utilService.getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                    const isItemSelected = isSelected(row.name);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                        <TableRow
                            hover
                            onClick={(event) => handleClick(event, row.name)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.name}
                            selected={isItemSelected}
                        >
                            <TableCell align="center" component="th" id={labelId} scope="row" padding="none" className={isHide ? 'hide-column' : null}>
                                {row.rank}
                            </TableCell>
                            <TableCell align="center"><div className="flex align-center"><img src={row.icon} alt="" />{row.name}</div></TableCell>
                            <TableCell align="center" style={row.priceChange1d > 0 ? { color: 'green' } : { color: 'red' }}>{row.priceChange1d}</TableCell>
                            <TableCell align="right">${row.price.toLocaleString()}</TableCell>
                            <TableCell align="right">{row.priceBtc.toFixed(8)}</TableCell>
                            <TableCell align="center">{utilService.nFormatter(row.marketCap, 2)}</TableCell>
                            <TableCell align="center">{utilService.nFormatter(row.volume, 2)}</TableCell>
                            <TableCell align="center"><MinChart range={'1w'} coinId={row.id} price={row.priceChange1w} /></TableCell>
                            <TableCell align="center"><OptionsMenu coinId={row.id} range={'24h'} /></TableCell>
                        </TableRow>
                    );
                })}
            {emptyRows > 0 && (
                <TableRow style={{ height: 53 }}>
                    <TableCell colSpan={6} />
                </TableRow>
            )}
        </TableBody>
    )
}

