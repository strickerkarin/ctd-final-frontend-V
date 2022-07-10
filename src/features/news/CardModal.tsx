import BotonCerrar from "./BotonCerrar";
import BotonSuscripcion from "./BotonSuscripcion";
import { INoticiasNormalizadas } from "./types";
import {
  TarjetaModal,
  DescripcionModal,
  ImagenModal,
  TituloModal,
  CotenedorTexto,
} from "./styled";

const CardModal = ({
  esPremium,
  setModal,
  imageSrc,
  imageAlt,
  titulo,
  descripcion,
}: {
  esPremium: boolean;
  setModal: React.Dispatch<React.SetStateAction<null | INoticiasNormalizadas>>;
  imageSrc: string;
  imageAlt: string;
  titulo: string;
  descripcion: string;
}) => {
  return (
    <TarjetaModal>
      <BotonCerrar setModal={setModal} />
      <ImagenModal src={imageSrc} alt={imageAlt} />
      <CotenedorTexto>
        <TituloModal>{titulo}</TituloModal>
        <DescripcionModal>{descripcion}</DescripcionModal>
        {esPremium && <BotonSuscripcion setModal={setModal} />}
      </CotenedorTexto>
    </TarjetaModal>
  );
};

export default CardModal;
