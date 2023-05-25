// import { useRouter } from "next/router";
import Layout from "@/src/components/Layout";
import CustomCard from "@/src/components/Card";
import { StyledMain } from "./styles";

const Index = () => {
  // const router = useRouter();
  return (
    <Layout>
      <StyledMain>
        <CustomCard />
      </StyledMain>
    </Layout>
  );
};

export default Index;
