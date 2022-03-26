import React from "react";
import AuthBoxStyles from "./styles/AuthBox.styles";

type AuthBoxProps = {
  title: string;
};

const AuthBox: React.FC<AuthBoxProps> = (props) => {
  return (
    <AuthBoxStyles>
      <div className='box'>
        <div className='logo'>CENXEN</div>
        <div className='title'>{props.title}</div>
        <div className='content'>{props.children}</div>
      </div>
    </AuthBoxStyles>
  );
};

export default AuthBox;
