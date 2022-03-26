import styled from "styled-components";

const styles = styled.div`
  width: 100vw;
  height: 100vh;

  .box {
    width: 25%;
    height: 100%;
    min-width: 400px;
    max-width: 700px;
    margin: 0 auto;
    padding: 40px 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  .logo {
    font-size: 40px;
    font-family: "Orbitron", sans-serif;
    margin: 40px 0;
    cursor: context-menu;
  }

  .title {
    font-size: 25px;
    margin: 20px 0 30px;
  }

  .content {
    margin: 20px 0;
    width: 100%;
  }
`;

export default styles;
