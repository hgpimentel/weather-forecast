import { CenteredContainer } from "..";

const Today: React.FC<{ message: string }> = ({ message }) => {
  return (
    <CenteredContainer>
      <h1>{message}</h1>
    </CenteredContainer>
  );
};

export default Today;
