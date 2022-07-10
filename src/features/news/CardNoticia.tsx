import { INoticiasNormalizadas } from "./types";
import {
  TarjetaNoticia,
  FechaTarjetaNoticia,
  DescripcionTarjetaNoticia,
  ImagenTarjetaNoticia,
  TituloTarjetaNoticia,
  BotonLectura,
} from "./styled";

const CardNoticia = ({noticia, setModal}: {
  noticia: INoticiasNormalizadas;
  setModal: React.Dispatch<React.SetStateAction<INoticiasNormalizadas | null>>;
}) => {
  return (
    <TarjetaNoticia>
      <ImagenTarjetaNoticia src={noticia.imagen} />
      <TituloTarjetaNoticia>{noticia.titulo}</TituloTarjetaNoticia>
      <FechaTarjetaNoticia>{noticia.fecha}</FechaTarjetaNoticia>
      <DescripcionTarjetaNoticia>
        {noticia.descripcionCorta}
      </DescripcionTarjetaNoticia>
      <BotonLectura onClick={() => setModal(noticia)}>Ver más</BotonLectura>
    </TarjetaNoticia>
  );
};

export default CardNoticia;
