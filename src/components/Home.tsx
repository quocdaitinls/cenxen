import {useEffect} from "react";
import {useRouter} from "next/router";
import useMe from "@apis/hooks/useMe";
import {Spinner} from "src/components/ui/Spinner";
import {HomeStyles} from "./Home.styles";

const Home = () => {
  const router = useRouter();
  // const {status, data, isLoading} = useMe();

  // useEffect(() => {
  //   if (data?.me) router.push("/auth");
  // }, [status, data, router]);

  return (
    <HomeStyles>
      {/* {isLoading ? <Spinner size={40} color='red' /> : null} */}
    </HomeStyles>
  );
};

export async function getServerSideProps() {
  console.log("get server side props");
  return {props: {}};
}

export default Home;
