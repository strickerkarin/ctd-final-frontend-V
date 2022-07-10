import { useEffect, useState } from "react";
import { SuscribeImage } from "../../assets";
import { obtenerNoticias } from "./fakeRest";
import { INoticiasNormalizadas } from "./types";
import { normalizarNoticia } from "./utils";
import CardNoticia from "./CardNoticia";
import CardModal from "./CardModal";
import {
  TITULO_NOTICIA_PREMIUM,
  DESCRIPCION_NOTICIA_PREMIUM,
  ALT_IMAGEN_PREMIUM
} from "./constantes";
import {
  ContenedorModal,
  ContenedorNoticias,
  ListaNoticias,
  TituloNoticias,
} from "./styled";

const Noticias = () => {
  const [noticias, setNoticias] = useState<INoticiasNormalizadas[]>([]);
  const [modal, setModal] = useState<INoticiasNormalizadas | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const obtenerInformacion = async () => {
      try {
        const respuesta = await obtenerNoticias();
        const data = respuesta?.map((n) => normalizarNoticia(n));
        setNoticias(data);
      } catch (error) {
        setError(JSON.stringify(error));
      }
    };
    obtenerInformacion();
  }, []);

  return (
    <ContenedorNoticias>
      <TituloNoticias>Noticias de los Simpsons</TituloNoticias>
      {error && <p>{error}</p>}
      <ListaNoticias>
        {noticias.map((n) => (
          <CardNoticia key={n.id} noticia={n} setModal={setModal} />
        ))}
        {modal && (
          <ContenedorModal>
            <CardModal
              esPremium={modal.esPremium}
              setModal={setModal}
              imageSrc={modal.esPremium ? SuscribeImage : modal.imagen}
              imageAlt={modal.esPremium ? ALT_IMAGEN_PREMIUM : "news-image"}
              titulo={modal.esPremium ? TITULO_NOTICIA_PREMIUM : modal.titulo}
              descripcion={
                modal.esPremium
                  ? DESCRIPCION_NOTICIA_PREMIUM
                  : modal.descripcion
              }
            />
          </ContenedorModal>
        )}
      </ListaNoticias>
    </ContenedorNoticias>
  );
};

export default Noticias;
