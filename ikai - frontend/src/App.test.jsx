import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import emailjs from "@emailjs/browser";
import { describe, expect, it, vi } from "vitest";
import App from "./App.jsx";

vi.mock("@emailjs/browser", () => ({
  default: { sendForm: vi.fn() },
}));

function setup() {
  const user = userEvent.setup();
  const utils = render(<App />);
  const input = screen.getByLabelText("Seu e-mail");
  const button = screen.getByRole("button", { name: /quero acompanhar/i });
  return { user, input, button, ...utils };
}

describe("Estrutura da página", () => {
  it("renderiza as seções principais com os ids usados pelas âncoras", () => {
    const { container } = render(<App />);
    for (const id of ["inicio", "como-funciona", "principios", "download"]) {
      expect(container.querySelector(`#${id}`)).toBeInTheDocument();
    }
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Você escolhe.A Ikai respeita.");
  });

  it("aponta os links do menu para as seções corretas", () => {
    render(<App />);
    const nav = screen.getByRole("navigation");
    expect(within(nav).getByRole("link", { name: "Como funciona" })).toHaveAttribute("href", "#como-funciona");
    expect(within(nav).getByRole("link", { name: "Princípios" })).toHaveAttribute("href", "#principios");
    expect(within(nav).getByRole("link", { name: "Download" })).toHaveAttribute("href", "#download");
    expect(screen.getByRole("link", { name: "Baixar app" })).toHaveAttribute("href", "#download");
  });

  it("direciona os CTAs do hero para download e para a proposta", () => {
    render(<App />);
    expect(screen.getByRole("link", { name: /baixar a ikai/i })).toHaveAttribute("href", "#download");
    expect(screen.getByRole("link", { name: /conhecer a proposta/i })).toHaveAttribute("href", "#como-funciona");
  });

  it("carrega a logo da pasta public pela raiz do site (regressão do erro 404)", () => {
    render(<App />);
    const logos = screen.getAllByAltText("Ikai");
    expect(logos).toHaveLength(2);
    for (const logo of logos) {
      expect(logo).toHaveAttribute("src", "/ikai-icon.jpg");
      expect(logo.getAttribute("src")).not.toContain("public/");
    }
  });

  it("exibe os seis cartões de “Como funciona” na ordem", () => {
    render(<App />);
    const titles = screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent);
    expect(titles).toEqual([
      "Sessões conscientes",
      "Personalização manual",
      "Sem feed infinito",
      "Gamificação individual",
      "Sua privacidade importa",
      "Tempo com propósito",
    ]);
  });

  it("lista os quatro princípios do produto", () => {
    render(<App />);
    for (const item of [
      "Notificações desativadas por padrão",
      "Sem recomendações baseadas no seu comportamento",
      "Sem rankings ou competição social",
      "Seus dados sob seu controle",
    ]) {
      expect(screen.getByText(item)).toBeInTheDocument();
    }
  });

  it("mostra a simulação do app com as três escolhas e o limite de sessão", () => {
    render(<App />);
    for (const choice of ["Estudar", "Ler", "Ver conteúdo"]) {
      expect(screen.getByText(choice)).toBeInTheDocument();
    }
    expect(screen.getByText("20 min")).toBeInTheDocument();
  });

  it("mantém os botões das lojas inativos até o lançamento", () => {
    render(<App />);
    for (const store of ["Google Play", "App Store"]) {
      const button = screen.getByRole("button", { name: new RegExp(store) });
      expect(button).toHaveAttribute("type", "button");
      expect(button).toHaveClass("store", "disabled");
      expect(button).toHaveTextContent("EM BREVE NA");
    }
  });
});

describe("Formulário de interesse (EmailJS)", () => {
  it("exige um e-mail válido no campo", () => {
    const { input } = setup();
    expect(input).toHaveAttribute("type", "email");
    expect(input).toBeRequired();
    expect(input).toHaveAttribute("name", "user_email");
  });

  it("não envia quando o campo está vazio", async () => {
    const { user, button } = setup();
    await user.click(button);
    expect(emailjs.sendForm).not.toHaveBeenCalled();
  });

  it("não envia quando o e-mail é inválido", async () => {
    const { user, input, button } = setup();
    await user.type(input, "usuario-sem-arroba");
    await user.click(button);
    expect(input).toBeInvalid();
    expect(emailjs.sendForm).not.toHaveBeenCalled();
  });

  it("envia o formulário ao EmailJS com o serviço, o template e a chave pública", async () => {
    emailjs.sendForm.mockResolvedValueOnce({ status: 200, text: "OK" });
    const { user, input, button, container } = setup();
    await user.type(input, "pessoa@exemplo.com");
    await user.click(button);
    expect(emailjs.sendForm).toHaveBeenCalledTimes(1);
    expect(emailjs.sendForm).toHaveBeenCalledWith(
      "service_vuz78oo",
      "template_bl9nq7e",
      container.querySelector("form.signup"),
      { publicKey: "qhXYuMJGY2jg8q5h4" },
    );
  });

  it("mostra a mensagem de sucesso e limpa o campo", async () => {
    emailjs.sendForm.mockResolvedValueOnce({ status: 200, text: "OK" });
    const { user, input, button } = setup();
    await user.type(input, "pessoa@exemplo.com");
    await user.click(button);
    expect(await screen.findByText(/cadastro realizado!/i)).toBeInTheDocument();
    expect(input).toHaveValue("");
    expect(button).toBeEnabled();
  });

  it("desabilita campo e botão e mostra “Enviando...” durante o envio", async () => {
    let resolve;
    emailjs.sendForm.mockReturnValueOnce(new Promise((r) => { resolve = r; }));
    const { user, input, button } = setup();
    await user.type(input, "pessoa@exemplo.com");
    await user.click(button);
    expect(button).toHaveTextContent("Enviando...");
    expect(button).toBeDisabled();
    expect(input).toBeDisabled();
    resolve({ status: 200, text: "OK" });
    expect(await screen.findByText(/cadastro realizado!/i)).toBeInTheDocument();
    expect(button).toHaveTextContent("Quero acompanhar");
  });

  it("não dispara um segundo envio enquanto o primeiro está pendente", async () => {
    let resolve;
    emailjs.sendForm.mockReturnValueOnce(new Promise((r) => { resolve = r; }));
    const { user, input, button } = setup();
    await user.type(input, "pessoa@exemplo.com");
    await user.click(button);
    await user.click(button);
    expect(emailjs.sendForm).toHaveBeenCalledTimes(1);
    resolve({ status: 200, text: "OK" });
    await screen.findByText(/cadastro realizado!/i);
  });

  it("mostra o erro retornado pelo EmailJS, mantém o e-mail e reabilita o envio", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    emailjs.sendForm.mockRejectedValueOnce({ status: 400, text: "Invalid template" });
    const { user, input, button } = setup();
    await user.type(input, "pessoa@exemplo.com");
    await user.click(button);
    expect(await screen.findByText("Erro 400: Invalid template")).toBeInTheDocument();
    expect(input).toHaveValue("pessoa@exemplo.com");
    expect(button).toBeEnabled();
    expect(console.error).toHaveBeenCalled();
  });

  it("usa uma mensagem padrão quando o erro não traz detalhes", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    emailjs.sendForm.mockRejectedValueOnce(new Error("falha de rede"));
    const { user, input, button } = setup();
    await user.type(input, "pessoa@exemplo.com");
    await user.click(button);
    expect(await screen.findByText(/Erro desconhecido no EmailJS\./)).toBeInTheDocument();
  });

  it("anuncia a mensagem em uma região aria-live", () => {
    const { container } = render(<App />);
    expect(container.querySelector(".form-message")).toHaveAttribute("aria-live", "polite");
  });
});
