import './ChartGroup.scss'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';


export default function ChartGroup({ toggleChartValue, value }) {
    const handleChange = (event) => {
        toggleChartValue(event);
    }

    return (
        <FormControl component="fieldset">
            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange} className='mb-1' style={{ flexDirection: 'row' }}>
                <FormControlLabel value="line" control={<Radio />} label="Line" />
                <FormControlLabel value="bar" control={<Radio />} label="Bar" />
            </RadioGroup>
        </FormControl >
    );
}
