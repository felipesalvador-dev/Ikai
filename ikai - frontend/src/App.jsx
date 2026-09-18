import { useState } from "react";
import {
  ArrowDown, ArrowRight, Check, Circle, Clock3, Download,
  Library, Search, ShieldCheck, Smartphone, Sparkles, Target, Zap
} from "lucide-react";
import "./styles.css";

function Brand() {
  return <a className="brand" href="#inicio"><span className="brand-mark">i</span><span>Ikay</span></a>;
}

function Eyebrow({ children }) {
  return <div className="eyebrow"><span />{children}</div>;
}

function PhonePreview() {
  const choices = [
    ["Estudar", "Aprender e focar"],
    ["Ler", "Conteúdos selecionados"],
    ["Ver conteúdo", "Uma sessão definida por você"]
  ];
  return (
    <div className="phone-wrap">
      <div className="glow" />
      <div className="phone">
        <div className="phone-speaker" />
        <div className="screen">
          <div className="status"><span>9:41</span><span>● ● ▰</span></div>
          <div className="app-top"><strong>Ikay</strong><span className="tiny-dot" /></div>
          <div className="welcome">
            <small>BEM-VINDO DE VOLTA</small>
            <h2>Quer entrar<br />na Ikay agora?</h2>
            <p>Escolha conscientemente o que você quer fazer.</p>
          </div>
          {choices.map(([title, desc], i) => (
            <div className={"choice " + (i === 0 ? "active" : "")} key={title}>
              <span>{i === 0 ? "◉" : "○"}</span>
              <div><b>{title}</b><small>{desc}</small></div>
              <strong>→</strong>
            </div>
          ))}
          <div className="limit"><span>SEU LIMITE</span><b>20 min</b><span>por sessão</span></div>
        </div>
      </div>
    </div>
  );
}

const features = [
  { n: "01", icon: <Clock3 />, title: "Sessões conscientes", text: "Antes de entrar, você escolhe o que pretende fazer e define os limites da sessão. Quando ela termina, acabou.", large: true },
  { n: "02", icon: <Search />, title: "Personalização manual", text: "Você cria seus próprios modos com filtros de área, assunto, idioma e formato." },
  { n: "03", icon: <Zap />, title: "Sem feed infinito", text: "Uma quantidade finita de conteúdos. Sem autoplay e sem avançar automaticamente." },
  { n: "04", icon: <Sparkles />, title: "Gamificação individual", text: "Conquistas, badges, streaks e side quests sem rankings ou comparação social." }
];

export default function App() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!email.trim()) return;
    setMessage("Cadastro realizado. Avisaremos quando a Ikay estiver disponível.");
    setEmail("");
  }

  return (
    <>
      <header className="nav">
        <Brand />
        <nav>
          <a href="#como-funciona">Como funciona</a>
          <a href="#principios">Princípios</a>
          <a href="#download">Download</a>
        </nav>
        <a className="nav-download" href="#download">Baixar app</a>
      </header>

      <main id="inicio">
        <section className="hero">
          <div className="hero-copy">
            <Eyebrow>Uma nova forma de usar redes sociais</Eyebrow>
            <h1>Você escolhe.<br /><em>A Ikay respeita.</em></h1>
            <p className="hero-text">Uma rede social criada para transformar o consumo de conteúdo em uma escolha consciente — sem feed infinito, sem recomendações automáticas e sem disputar a sua atenção.</p>
            <div className="hero-actions">
              <a className="button primary" href="#download">Baixar a Ikay <ArrowDown size={16} /></a>
              <a className="button ghost" href="#como-funciona">Conhecer a proposta <ArrowRight size={16} /></a>
            </div>
            <div className="platforms"><span>Disponível em breve</span><i /><span>Android</span><i /><span>iOS</span></div>
          </div>
          <PhonePreview />
        </section>

        <section className="manifesto">
          <div className="manifesto-label">A ideia</div>
          <div><h2>Uma rede social que não tenta <span>prender você.</span></h2><p>A Ikay não decide o que você quer ver. Você define seus interesses, seus limites e o objetivo de cada sessão.</p></div>
        </section>

        <section className="features" id="como-funciona">
          <div className="section-heading"><div><Eyebrow>Como funciona</Eyebrow><h2>Menos automático.<br /><em>Mais intencional.</em></h2></div></div>
          <div className="feature-grid">
            {features.map(f => (
              <article className={"feature-card " + (f.large ? "large" : "")} key={f.n}>
                <div className="feature-number">{f.n}</div>
                <div className="icon">{f.icon}</div>
                <h3>{f.title}</h3><p>{f.text}</p>
                {f.large && <div className="mini-ui"><span>Objetivo</span><b>Estudar</b><span>Limite</span><b>20 min</b></div>}
              </article>
            ))}
          </div>
        </section>

        <section className="principles" id="principios">
          <div className="principles-copy">
            <Eyebrow>O princípio</Eyebrow>
            <h2>Low dopamine.<br /><em>Sem paternalismo.</em></h2>
            <p>A Ikay não decide quanto você pode consumir. Ela apenas não tenta manipular sua atenção para que você fique mais tempo.</p>
            <div className="principle-list">
              {["Notificações desativadas por padrão","Sem recomendações baseadas no seu comportamento","Sem rankings ou competição social","Seus dados sob seu controle"].map(x => <div key={x}><b><Check size={13}/></b><span>{x}</span></div>)}
            </div>
          </div>
          <div className="quote-card"><span className="quote-mark">“</span><p>O usuário deve dizer à Ikay o que quer consumir — e o sistema deve respeitar essa decisão.</p><span className="quote-line" /><small>PRINCÍPIO IKAY</small></div>
        </section>

        <section className="privacy">
          <div className="privacy-box">
            <div className="privacy-icon"><ShieldCheck size={30}/></div>
            <div><Eyebrow>Privacidade por princípio</Eyebrow><h2>Seus dados não são<br /><em>um produto.</em></h2><p>Armazenamento mínimo, compartilhamento externo iniciado por você, exportação simples e exclusão da conta. A Ikay não deve usar seus dados apenas porque tecnicamente pode.</p></div>
          </div>
        </section>

        <section className="download" id="download">
          <div className="download-inner">
            <Eyebrow>Baixe a Ikay</Eyebrow>
            <h2>Seu tempo.<br /><em>Suas escolhas.</em></h2>
            <p>O aplicativo está chegando. Cadastre-se para acompanhar o lançamento.</p>
            <form className="signup" onSubmit={submit}>
              <label className="sr-only" htmlFor="email">Seu e-mail</label>
              <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" required />
              <button type="submit">Quero acompanhar <ArrowRight size={16}/></button>
            </form>
            <p className="form-message" aria-live="polite">{message}</p>
            <div className="download-buttons">
              <button className="store disabled" type="button"><Smartphone /><span><small>EM BREVE NA</small><b>Google Play</b></span></button>
              <button className="store disabled" type="button"><Download /><span><small>EM BREVE NA</small><b>App Store</b></span></button>
            </div>
          </div>
        </section>
      </main>

      <footer><Brand /><p>Uma rede social feita para você.</p><span>© 2026 Ikay</span></footer>
    </>
  );
}
