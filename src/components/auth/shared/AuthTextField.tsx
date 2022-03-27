import {FieldHookConfig, useField} from "formik";
import styled from "@emotion/styled";
import {css} from "@emotion/css";
import CexTextField, {CexTextFieldProps} from "./CexTextField";

const StyledAuthTextField = styled(CexTextField)`
  border-radius: 10px;
  color: red;

  .root {
    margin: 100px;
  }
`;

const StyledInputRoot = css`
  border-radius: 20px;
`;

export type AuthTextFieldProps<V = any> = CexTextFieldProps &
  FieldHookConfig<V>;

export const AuthTextField: React.VFC<AuthTextFieldProps> = (props) => {
  const [field, meta] = useField(props);
  const {touched, error} = meta;

  return (
    <StyledAuthTextField
      {...field}
      {...props}
      fullWidth
      margin='dense'
      // size='small'
      InputProps={{
        className: "root",
      }}
      error={touched && Boolean(error)}
      helperText={touched && error}
    />
  );
};
