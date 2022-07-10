import { useEffect, useState } from "react";
import { SuscribeImage, CloseButton as Close } from "../../assets";
import { obtenerNoticias } from "./fakeRest";
import { INoticiasNormalizadas } from "./types";
import { normalizarNoticia } from "./utils";
import CardNoticia from "./CardNoticia";
import CardModal from "./CardModal";
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
        const data = respuesta?.map((n) => {
          return normalizarNoticia(n);
        });
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
        {modal ? (
          modal.esPremium ? (
            <ContenedorModal>
              <CardModal
                esPremium={true}
                setModal={setModal}
                imageSrc={SuscribeImage}
                imageAlt="mr-burns-excelent"
                titulo="Suscríbete a nuestro Newsletter"
                descripcion="Suscríbete a nuestro newsletter y recibe noticias de
                    nuestros personajes favoritos."
              />
            </ContenedorModal>
          ) : (
            <ContenedorModal>
              <CardModal
                esPremium={false}
                setModal={setModal}
                imageSrc={modal.imagen}
                imageAlt="news-image"
                titulo={modal.titulo}
                descripcion={modal.descripcion}
              />
            </ContenedorModal>
          )
        ) : null}
      </ListaNoticias>
    </ContenedorNoticias>
  );
};

export default Noticias;
