import { Header } from "../components";

export const LandingWrapper = ({ children }) => {
  return (
    <div style={{ paddingTop: "5rem" }}>
      <Header />
      <div>{children}</div>
    </div>
  );
};
