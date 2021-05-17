import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import './SwitchMode.scss'
import { useState } from 'react';

export const SwitchMode = ({ toggleDarkMode }) => {
    const [state, setState] = useState({
        checkedA: false,
        checkedB: true,
    });
    const handleChange = (event) => {
        toggleDarkMode();
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <FormGroup row>
            <FormControlLabel
                label="Dark Mode"
                control={
                    <Switch
                        checked={state.checkedA}
                        onChange={handleChange}
                        name="checkedA"
                        color="primary"
                    />
                }
            />
        </FormGroup>
    );
}

