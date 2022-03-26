import {Button, CircularProgress} from "@mui/material";
import styled from "styled-components";

const StyledAuthSubmitButton = styled(Button)`
  width: 80%;
  margin: 10px 0;
`;

const StyledCircularProgress = styled(CircularProgress)`
  color: white;
`;

type AuthSubmitButtonProps = {
  className?: string;
  circularClassName?: string;
  loading?: boolean;
  content?: string;
};

export const AuthSubmitButton: React.FC<AuthSubmitButtonProps> = ({
  className,
  circularClassName,
  loading,
  content,
  children,
}) => {
  const Loading = () => (
    <StyledCircularProgress className={circularClassName} size={20} />
  );

  return (
    <StyledAuthSubmitButton
      className={className}
      type='submit'
      variant='contained'
      size='large'
      disabled={loading}
      endIcon={loading ? <Loading /> : null}
    >
      {content || children}
    </StyledAuthSubmitButton>
  );
};
