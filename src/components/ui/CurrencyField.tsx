import TextField from "@material-ui/core/TextField";
import React from "react";
import NumberFormat from "react-number-format";

interface NumberFormatCustomProps {
  inputRef: (instance: NumberFormat | null) => void;
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export interface CurrencyFieldProps {
    id: string;
    lable: string
}

function NumberFormatCustom(props: NumberFormatCustomProps) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
}
interface State {   
    numberformat: string;
  }

export default function CurrencyField({id, lable}:CurrencyFieldProps) {
    const [values, setValues] = React.useState<State>({
      
        numberformat: '1320'
      });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
          ...values,
          [event.target.name]: event.target.value,
        });
      };

  return (
    <React.Fragment>
      <TextField        
        variant="outlined"
        fullWidth
        id={id}        
        onChange={handleChange}
        label={lable}
        name={id}
        type="number"
        InputProps={{
          inputComponent: NumberFormatCustom as any,
        }}
      />
    </React.Fragment>
  );
}
