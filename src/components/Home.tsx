import {useRouter} from "next/router";
import {HomeStyles} from "./Home.styles";

const Home = () => {
  const router = useRouter();

  return <HomeStyles></HomeStyles>;
};

export async function getServerSideProps() {
  console.log("get server side props");
  return {props: {}};
}

export default Home;
