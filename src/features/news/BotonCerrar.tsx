import { CloseButton } from "./styled";
import { CloseButton as Close } from "../../assets";
import { INoticiasNormalizadas } from "./types";

const BotonCerrar = ({
  setModal,
}: {
  setModal: React.Dispatch<React.SetStateAction<INoticiasNormalizadas | null>>;
}) => {
  return (
    <CloseButton onClick={() => setModal(null)}>
      <img src={Close} alt="close-button" />
    </CloseButton>
  );
};

export default BotonCerrar;
