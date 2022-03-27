import {Box} from "@mui/material";
import styled from "@emotion/styled";

export const StyledAuthLoginForm = styled.form`
  width: 100%;
  text-align: center;

  .form__link-forgot {
    margin: 20px 0;
  }

  .form__link-register {
    margin-top: 30px;
  }

  .form__button-submit {
    width: 80%;
    margin: 10px 0;
  }

  .form__button-submit-loading {
    color: white;
  }

  .box-login {
    width: 70%;
    margin: 30px auto 0;
    text-align: center;

    .box-login__button {
      text-transform: none;
      font-size: 1rem;
      background-color: white;
      color: black;

      &:hover {
        background-color: inherit;
      }
    }
  }
`;

export const StyledThirdPartyLogin = styled(Box)`
  width: 70%;
  margin: 30px auto 0;
  text-align: center;

  .box-login__button {
    text-transform: none;
    font-size: 1rem;
    background-color: white;
    color: black;

    &:hover {
      background-color: inherit;
    }
  }
`;
