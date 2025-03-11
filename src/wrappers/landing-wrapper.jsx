import { Header } from "../components";

export const LandingWrapper = ({ children, headerBorderBottom }) => {
  return (
    <div className="relative">
      <Header withBorderBottom={headerBorderBottom} />
      {children}
    </div>
  );
};
