import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import {
  ArrowDown,
  ArrowRight,
  Check,
  Clock3,
  Download,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Zap,
} from "lucide-react";

import "./styles.css";

function Brand() {
  return (
    <a className="brand" href="#inicio">
      <img
        className="brand-icon"
        src="./public/ikai-icon.jpg"
        alt="Ikai"
      />
      <span>Ikai</span>
    </a>
  );
}

function Eyebrow({ children }) {
  return (
    <div className="eyebrow">
      <span />
      {children}
    </div>
  );
}

function PhonePreview() {
  const choices = [
    ["Estudar", "Aprender e focar"],
    ["Ler", "Conteúdos selecionados"],
    ["Ver conteúdo", "Uma sessão definida por você"],
  ];

  return (
    <div className="phone-wrap">
      <div className="glow" />

      <div className="phone">
        <div className="phone-speaker" />

        <div className="screen">
          <div className="status">
            <span>9:41</span>
            <span>● ● ▰</span>
          </div>

          <div className="app-top">
            <strong>Ikai</strong>
            <span className="tiny-dot" />
          </div>

          <div className="welcome">
            <small>BEM-VINDO DE VOLTA</small>

            <h2>
              Quer entrar
              <br />
              na Ikai agora?
            </h2>

            <p>
              Escolha conscientemente o que você quer fazer.
            </p>
          </div>

          {choices.map(([title, desc], i) => (
            <div
              className={`choice ${i === 0 ? "active" : ""}`}
              key={title}
            >
              <span>{i === 0 ? "◉" : "○"}</span>

              <div>
                <b>{title}</b>
                <small>{desc}</small>
              </div>

              <strong>→</strong>
            </div>
          ))}

          <div className="limit">
            <span>SEU LIMITE</span>
            <b>20 min</b>
            <span>por sessão</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    n: "01",
    icon: <Clock3 />,
    title: "Sessões conscientes",
    text: "Antes de entrar, você escolhe o que pretende fazer e define os limites da sessão. Quando ela termina, acabou.",
    large: true,
  },
  {
    n: "02",
    icon: <Search />,
    title: "Personalização manual",
    text: "Você cria seus próprios modos com filtros de área, assunto, idioma e formato.",
  },
  {
    n: "03",
    icon: <Zap />,
    title: "Sem feed infinito",
    text: "Uma quantidade finita de conteúdos. Sem autoplay e sem avançar automaticamente.",
  },
  {
    n: "04",
    icon: <Sparkles />,
    title: "Gamificação individual",
    text: "Conquistas, badges, streaks e side quests sem rankings ou comparação social.",
  },
];

export default function App() {
  const form = useRef(null);

  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  async function submit(e) {
    e.preventDefault();

    if (isSending) return;

    setIsSending(true);
    setMessage("");

    try {
      await emailjs.sendForm(
        "service_vuz78oo",
        "template_bl9nq7e",
        form.current,
        {
          publicKey: "qhXYuMJGY2jg8q5h4",
        }
      );

      setMessage(
        "Cadastro realizado! Você ficará por dentro das novidades da Ikai."
      );

      form.current.reset();
    } catch (error) {
      console.error("EMAILJS ERROR:", error);
      console.error("STATUS:", error?.status);
      console.error("TEXT:", error?.text);

    setMessage(
      `Erro ${error?.status || ""}: ${
        error?.text || "Erro desconhecido no EmailJS."
      }`
    );

    } finally {
      setIsSending(false);
    }
  }

  return (
    <>
      {/* NAVBAR */}
      <header className="nav">
        <Brand />

        <nav>
          <a href="#como-funciona">Como funciona</a>
          <a href="#principios">Princípios</a>
          <a href="#download">Download</a>
        </nav>

        <a className="nav-download" href="#download">
          Baixar app
        </a>
      </header>

      <main id="inicio">
        {/* HERO */}
        <section className="hero">
          <div className="hero-copy">
            <Eyebrow>
              Uma nova forma de usar redes sociais
            </Eyebrow>

            <h1>
              Você escolhe.
              <br />
              <em>A Ikai respeita.</em>
            </h1>

            <p className="hero-text">
              Uma rede social criada para transformar o
              consumo de conteúdo em uma escolha consciente
              — sem feed infinito, sem recomendações
              automáticas e sem disputar a sua atenção.
            </p>

            <div className="hero-actions">
              <a className="button primary" href="#download">
                Baixar a Ikai
                <ArrowDown size={16} />
              </a>

              <a
                className="button ghost"
                href="#como-funciona"
              >
                Conhecer a proposta
                <ArrowRight size={16} />
              </a>
            </div>

            <div className="platforms">
              <span>Disponível em breve</span>
              <i />
              <span>Android</span>
              <i />
              <span>iOS</span>
            </div>
          </div>

          <PhonePreview />
        </section>

        {/* MANIFESTO */}
        <section className="manifesto">
          <div className="manifesto-label">
            A ideia
          </div>

          <div>
            <h2>
              Uma rede social que não tenta{" "}
              <span>prender você.</span>
            </h2>

            <p>
              A Ikai não decide o que você quer ver.
              Você define seus interesses, seus limites
              e o objetivo de cada sessão.
            </p>
          </div>
        </section>

        {/* COMO FUNCIONA */}
        <section
          className="features"
          id="como-funciona"
        >
          <div className="section-heading">
            <Eyebrow>
              Como funciona
            </Eyebrow>

            <h2>
              Menos automático.
              <br />
              <em>Mais intencional.</em>
            </h2>
          </div>

          <div className="feature-grid">
            {features.map((feature) => (
              <article
                className={`feature-card ${
                  feature.large ? "large" : ""
                }`}
                key={feature.n}
              >
                <div className="feature-number">
                  {feature.n}
                </div>

                <div className="icon">
                  {feature.icon}
                </div>

                <h3>
                  {feature.title}
                </h3>

                <p>
                  {feature.text}
                </p>

                {feature.large && (
                  <div className="mini-ui">
                    <span>Objetivo</span>
                    <b>Estudar</b>

                    <span>Limite</span>
                    <b>20 min</b>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* PRINCÍPIOS */}
        <section
          className="principles"
          id="principios"
        >
          <div className="principles-copy">
            <Eyebrow>
              O princípio
            </Eyebrow>

            <h2>
              Low dopamine.
              <br />
              <em>Sem paternalismo.</em>
            </h2>

            <p>
              A Ikai não decide quanto você pode consumir.
              Ela apenas não tenta manipular sua atenção
              para que você fique mais tempo.
            </p>

            <div className="principle-list">
              {[
                "Notificações desativadas por padrão",
                "Sem recomendações baseadas no seu comportamento",
                "Sem rankings ou competição social",
                "Seus dados sob seu controle",
              ].map((item) => (
                <div key={item}>
                  <b>
                    <Check size={13} />
                  </b>

                  <span>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="quote-card">
            <span className="quote-mark">
              “
            </span>

            <p>
              O usuário deve dizer à Ikai o que quer
              consumir — e o sistema deve respeitar
              essa decisão.
            </p>

            <span className="quote-line" />

            <small>
              PRINCÍPIO IKAI
            </small>
          </div>
        </section>

        {/* PRIVACIDADE */}
        <section className="privacy">
          <div className="privacy-box">
            <div className="privacy-icon">
              <ShieldCheck size={30} />
            </div>

            <div>
              <Eyebrow>
                Privacidade por princípio
              </Eyebrow>

              <h2>
                Seus dados não são
                <br />
                <em>um produto.</em>
              </h2>

              <p>
                Armazenamento mínimo, compartilhamento
                externo iniciado por você, exportação
                simples e exclusão da conta. A Ikai não
                deve usar seus dados apenas porque
                tecnicamente pode.
              </p>
            </div>
          </div>
        </section>

        {/* DOWNLOAD */}
        <section
          className="download"
          id="download"
        >
          <div className="download-inner">
            <Eyebrow>
              Baixe a Ikai
            </Eyebrow>

            <h2>
              Seu tempo.
              <br />
              <em>Suas escolhas.</em>
            </h2>

            <p>
              O aplicativo está chegando.
              Cadastre-se para acompanhar o lançamento.
            </p>

            {/* FORMULÁRIO EMAILJS */}
            <form
              ref={form}
              className="signup"
              onSubmit={submit}
            >
              <label
                className="sr-only"
                htmlFor="email"
              >
                Seu e-mail
              </label>

              <input
                id="email"
                type="email"
                name="user_email"
                placeholder="seu@email.com"
                required
                disabled={isSending}
              />

              <button
                type="submit"
                disabled={isSending}
              >
                {isSending
                  ? "Enviando..."
                  : "Quero acompanhar"}

                {!isSending && (
                  <ArrowRight size={16} />
                )}
              </button>
            </form>

            <p
              className="form-message"
              aria-live="polite"
            >
              {message}
            </p>

            <div className="download-buttons">
              <button
                className="store disabled"
                type="button"
              >
                <Smartphone />

                <span>
                  <small>EM BREVE NA</small>
                  <b>Google Play</b>
                </span>
              </button>

              <button
                className="store disabled"
                type="button"
              >
                <Download />

                <span>
                  <small>EM BREVE NA</small>
                  <b>App Store</b>
                </span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer>
        <Brand />

        <p>
          Uma rede social feita para você.
        </p>

        <span>
          © 2026 Ikai
        </span>
      </footer>
    </>
  );
}