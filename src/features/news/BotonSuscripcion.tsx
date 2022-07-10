import { BotonSuscribir } from "./styled";
import { INoticiasNormalizadas } from "./types";

const BotonSuscripcion = ({
  setModal,
}: {
  setModal: React.Dispatch<React.SetStateAction<INoticiasNormalizadas | null>>;
}) => {
  return (
    <BotonSuscribir
      onClick={() =>
        setTimeout(() => {
          alert("Suscripto!");
          setModal(null);
        }, 1000)
      }
    >
      Suscríbete
    </BotonSuscribir>
  );
};

export default BotonSuscripcion;
