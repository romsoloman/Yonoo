import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import './OptionsMenu.scss'
import CloseIcon from '@material-ui/icons/Close';
import { useEffect, useRef, useState } from 'react';
import { useCoins } from '../../context/CoinsContext';
import { IconButton, Snackbar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    paper: {
        marginRight: theme.spacing(2),
    },
}));

export const OptionsMenu = ({ coinId, range }) => {

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [isAdd, setAdd] = useState(false)
    const anchorRef = useRef(null);
    const { removeCoin } = useCoins();
    const { addCoinToCompare } = useCoins();


    const handleNotificationClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAdd(false);
    };

    const handleToggle = (ev) => {
        ev.stopPropagation();
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }
    const handleRemoveCoin = (ev, coinId) => {
        ev.stopPropagation();
        removeCoin(coinId, false);
        handleClose(ev);
    }

    const handleAddToCompare = (ev, range, coinId) => {
        ev.stopPropagation();
        addCoinToCompare(range, coinId);
        setAdd(prevState => prevState = !prevState)
        handleClose(ev);
    }
    // return focus to the button when we transitioned from !open -> open
    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <div className={classes.root}>
            <div>
                <Button
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={(ev) => handleToggle(ev)}
                >
                    <MoreHorizIcon />
                </Button>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={isAdd}
                    autoHideDuration={1500}
                    onClose={handleNotificationClose}
                    message="Coin Added Succefully"
                    action={
                        <>
                            <IconButton size="small" aria-label="close" color="inherit" onClick={handleNotificationClose}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </>
                    }
                />
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal className='zIndex'>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                        <MenuItem onClick={(ev) => handleAddToCompare(ev, range, coinId)}>Add To Compare</MenuItem>
                                        <MenuItem onClick={(ev) => handleRemoveCoin(ev, coinId)}>Remove Coin</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </div>
    );
}

