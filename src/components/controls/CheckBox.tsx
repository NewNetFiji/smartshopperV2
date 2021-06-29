import React from 'react'
import { FormControl, FormControlLabel, Checkbox as MuiCheckbox, CheckboxProps } from '@material-ui/core';

export default function Checkbox(props: CheckboxProps) {

    const { name,  , value, onChange } = props;


    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <FormControl>
            <FormControlLabel
                control={<MuiCheckbox
                    name={name}
                    color="primary"
                    checked={value}
                    onChange={e => onChange(convertToDefEventPara(name, e.target.checked))}
                />}
                label={label}
            />
        </FormControl>
    )
}