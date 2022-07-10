import { INoticias } from "./fakeRest";
import {INoticiasNormalizadas} from "./types";

export const normalizarNoticia = (noticia: INoticias): INoticiasNormalizadas => {
  const titulo = noticia.titulo
    .split(" ")
    .map((str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    })
    .join(" ");

  return ({
    id: noticia.id,
    titulo,
    descripcion: noticia.descripcion,
    fecha: `Hace ${calcularMinutosTranscurridos(noticia)} minutos`,
    esPremium: noticia.esPremium,
    imagen: noticia.imagen,
    descripcionCorta: noticia.descripcion.substring(0, 100),
  });
};

export const calcularMinutosTranscurridos = (noticia: INoticias): number => {
  const ahora = new Date();
  return Math.floor((ahora.getTime() - noticia.fecha.getTime()) / 60000);
};
