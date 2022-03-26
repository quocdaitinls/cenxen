import {
  IconButton,
  InputAdornment,
  OutlinedInputProps,
  TextField,
  TextFieldProps,
} from "@mui/material";
import {useState} from "react";
import {IoEye, IoEyeOff} from "react-icons/io5";

export type CexTextFieldProps = Omit<TextFieldProps, "variant">;

const CexTextField: React.FC<CexTextFieldProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = props?.type === "password";

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownShowPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const inputProps: OutlinedInputProps = {
    endAdornment: isPasswordField ? (
      <InputAdornment position='end'>
        <IconButton
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownShowPassword}
        >
          {showPassword ? <IoEyeOff /> : <IoEye />}
        </IconButton>
      </InputAdornment>
    ) : null,
  };

  return (
    <TextField
      {...props}
      variant='outlined'
      type={isPasswordField ? (showPassword ? "text" : "password") : props.type}
      InputProps={inputProps}
    >
      {props.children}
    </TextField>
  );
};

export default CexTextField;
