export interface INoticiasNormalizadas {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: number | string;
  esPremium: boolean;
  imagen: string;
  descripcionCorta?: string;
}
export interface ICardModalProps {
  esPremium: boolean;
  setModal: React.Dispatch<React.SetStateAction<null | INoticiasNormalizadas>>;
  imageSrc: string;
  imageAlt: string;
  titulo: string;
  descripcion: string;
}
