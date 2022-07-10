import BotonCerrar from "./BotonCerrar";
import BotonSuscripcion from "./BotonSuscripcion";
import { ICardModalProps } from "./types";
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
}: ICardModalProps) => {
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
