import { IconButton, makeStyles, SwipeableDrawer, Typography } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SwitchMode } from '../SwitchMode/SwitchMode';
import TableChartIcon from '@material-ui/icons/TableChart';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import './AppHeader.scss'

const useHeaderStyles = makeStyles((theme) => ({
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.primary,
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.primary,
            },
    title:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.primary,
                backgroundColor: theme.palette.secondary.primary,
                fontSize: '24px'
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.primary,
                fontSize: '24px'
            },
}));

export const AppHeader = ({ toggleDarkMode }) => {
    const classes = useHeaderStyles();
    const [size, setSize] = useState(window.innerWidth);
    const [state, setState] = useState({
        right: false,
    });

    useEffect(() => {
        window.addEventListener('resize', handleResize)
    }, [])

    const handleResize = () => {
        let resize = window.innerWidth
        setSize(resize);
    }

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };
    return (
        <header className="flex align-items justify-between app-header mt-3">
            <div className="logo">
                <Link to="/table">
                    <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                        Yonoo Finance
                    </Typography>
                </Link>
            </div>
            {size > 550 && <SwitchMode toggleDarkMode={toggleDarkMode} />}
            {['right'].map((anchor) => (
                <div key={anchor}>
                    <IconButton edge="start" className="app-header" color="inherit" aria-label="menu" onClick={toggleDrawer(anchor, true)}>
                        <MenuIcon />
                    </IconButton>
                    <SwipeableDrawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        onOpen={toggleDrawer(anchor, true)}
                    >
                        <ul className='flex column align-center justify-between hg wd mt'>
                            <Link to="/table" onClick={toggleDrawer(anchor, false)} className="flex justify-between align-center" style={{ width: '60%' }}>
                                <TableChartIcon className={classes.highlight} />
                                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                                    Table
                                </Typography>
                            </Link>
                            <Link to="/chart" onClick={toggleDrawer(anchor, false)} className="flex justify-between align-center" style={{ width: '60%' }}>
                                <TrendingUpIcon className={classes.highlight} />
                                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                                    Chart
                                </Typography>
                            </Link>
                            {size < 550 && <SwitchMode toggleDarkMode={toggleDarkMode} />}
                        </ul>
                    </SwipeableDrawer>
                </div>
            ))
            }
        </header >
    )
}

