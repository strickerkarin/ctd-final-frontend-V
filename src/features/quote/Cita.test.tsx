import { rest } from "msw";
import { setupServer } from "msw/node";
import { API_URL } from "../../app/constants";
import { ICita } from "./types";
import { render } from "../../test-utils";
import Cita from "./Cita";
import { fireEvent, screen } from "@testing-library/react";

const handlers = [
  rest.get(API_URL, (req, res, ctx) => {
    const character = req.url.searchParams.get("character");
    if (!character) {
      const quote: ICita[] = [
        {
          quote: "Ahh! Sweet liquor eases the pain.",
          character: "Troy McClure",
          image:
            "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FTroyMcClure.png?1497567511112",
          characterDirection: "Right",
        },
      ];
      return res(ctx.json(quote));
    } else {
      const quote: ICita[] = [
        {
          quote: "Oh, so they have Internet on computers now!",
          character: "Homer Simpson",
          image:
            "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FHomerSimpson.png?1497567511939",
          characterDirection: "Right",
        },
      ];
      return res(ctx.json(quote));
    }
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Cita", () => {
  describe("Cuando se renderiza el componente", () => {
    test("Deberia mostrar el texto por default", () => {
      render(<Cita />);
      expect(
        screen.getByText("No se encontró ninguna cita")
      ).toBeInTheDocument();
    });
  });
  describe("Cuando la query se está ejecutando", () => {
    test("Debería mostrar el mensaje de cargando", () => {
      render(<Cita />);
      const button = screen.getByText("Obtener cita aleatoria");
      fireEvent.click(button);
      expect(screen.getByText("CARGANDO...")).toBeInTheDocument();
    });
  });
  describe("Cuando se ejecuta la query con éxito", () => {
    test("Debería obtener una cita aleatoria al hacer click en el botón de cita aleatoria", async () => {
      render(<Cita />);
      const button = screen.getByText("Obtener cita aleatoria");
      fireEvent.click(button);
      expect(
        await screen.findByText("Ahh! Sweet liquor eases the pain.")
      ).toBeInTheDocument();
    });
    test("Debería obtener una cita del personaje al pasar un nombre en el input", async () => {     
      render(<Cita />);
      const input = screen.getByPlaceholderText("Ingresa el nombre del autor");
      fireEvent.change(input, { target: { value: "Homer" } });
      const button = screen.getByText("Obtener Cita");
      fireEvent.click(button);
      expect(
        await screen.findByText("Oh, so they have Internet on computers now!")
      ).toBeInTheDocument();
    });
  });
  describe("Cuando se ejecuta la query con error 500", () => {
    test("Debería mostrar un mensaje de error", async () => {
      server.use(
        rest.get(`${API_URL}`, (req, res, ctx) => {
          return res(ctx.status(500));
        })
      );
      render(<Cita />);
      const input = screen.getByPlaceholderText("Ingresa el nombre del autor");
      fireEvent.change(input, { target: { value: "123456" } });
      const button = screen.getByText("Obtener Cita");
      fireEvent.click(button);
      expect(
        await screen.findByText("Por favor ingrese un nombre válido")
      ).toBeInTheDocument();
    });
  });
  describe("Cuando se oprime el botón borrar", () => {
    test("Debería limpiar el input", async () => {   
      render(<Cita />);
      //Se escribe un nombre en el input y se busca para luego asegurarnos que efectivamente lo borra
      const input = screen.getByPlaceholderText("Ingresa el nombre del autor");
      fireEvent.change(input, { target: { value: "Homer" } });
      const button = screen.getByText("Obtener Cita");
      fireEvent.click(button);
      const eraseButton = screen.getByText("Borrar");
      fireEvent.click(eraseButton);
      expect(
        await screen.findByText("Obtener cita aleatoria")
      ).toBeInTheDocument();
      expect(
        await screen.findByText("No se encontró ninguna cita")
      ).toBeInTheDocument();
      expect(input).toBeEmptyDOMElement();
    });
  });
});
