import {Typography} from "@mui/material";
import {StyledAuthConfirmEmailNotification} from "./styles/AuthConfirmEmailContent.styles";
import {AuthContentSideFC, createAuthContent} from "./util/createAuthContent";

type MyProps = {
  success: boolean;
};

enum ConfirmEmailSide {
  NOTIFICATION,
}

const AuthConfirmEmailNotification: AuthContentSideFC<
  ConfirmEmailSide,
  MyProps
> = ({success}) => {
  const message = success ? "Confirm email success." : "Confirm email failure.";

  return (
    <StyledAuthConfirmEmailNotification>
      <Typography component='p' variant='body1'>
        {message}
      </Typography>
    </StyledAuthConfirmEmailNotification>
  );
};

const AuthConfirmEmailContent = createAuthContent(
  ConfirmEmailSide.NOTIFICATION,
  {
    [ConfirmEmailSide.NOTIFICATION]: AuthConfirmEmailNotification,
  }
);

export default AuthConfirmEmailContent;
