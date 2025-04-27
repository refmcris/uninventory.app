import { Header } from "../components";

export const LandingWrapper = ({ children }) => {
  return (
    <div >
      <Header />
      <div >{children}</div>
    </div>
  );
};
