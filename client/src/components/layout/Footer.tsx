import { Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2 rounded-full">
                <img 
                  src="/images/AndreDuarte_Marca2.png" 
                  alt="Logo André Duarte" 
                  className="h-8 w-auto brightness-0 invert" 
                />
              </div>
              <div>
                <h3 className="font-serif text-xl font-medium">Andre Duarte Cesar de Oliveira</h3>
                <p className="text-xs opacity-80 tracking-wider uppercase">Psicólogo Clínico</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed max-w-xs">
              Um espaço seguro e ético para quem deseja compreender suas emoções e construir novos caminhos através da psicoterapia.
            </p>
            
            <div className="pt-2">
              <h5 className="text-sm font-medium mb-3 opacity-90">Redes Sociais</h5>
              <div className="flex gap-4">
                <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-accent hover:text-primary transition-all duration-300">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-accent hover:text-primary transition-all duration-300">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-6">
            <h4 className="font-serif text-lg font-medium border-b border-white/20 pb-2 inline-block">Navegação</h4>
            <div className="flex flex-col gap-2">
              <a href="#sobre" className="text-primary-foreground/80 text-sm hover:text-white transition-colors">Sobre Mim</a>
              <a href="#servicos" className="text-primary-foreground/80 text-sm hover:text-white transition-colors">Como Ajudo</a>
              <a href="#atendimento" className="text-primary-foreground/80 text-sm hover:text-white transition-colors">Atendimento</a>
              <a href="/blog" className="text-primary-foreground/80 text-sm hover:text-white transition-colors">Blog & Artigos</a>
              <a href="/diario" className="text-primary-foreground/80 text-sm hover:text-white transition-colors">Diário de Emoções</a>
              <a href="#contato" className="text-primary-foreground/80 text-sm hover:text-white transition-colors">Agendar Consulta</a>
            </div>
          </div>

          {/* Useful Links Column */}
          <div className="space-y-6 lg:col-span-2">
            <h4 className="font-serif text-lg font-medium border-b border-white/20 pb-2 inline-block">Apoio e Saúde Mental</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              <a href="https://cvv.org.br/links-uteis/" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 text-xs hover:text-white transition-colors">CVV - Centro de Valorização da Vida</a>
              <a href="http://www.setembroamarelo.org.br/" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 text-xs hover:text-white transition-colors">Movimento Setembro Amarelo</a>
              <a href="https://www.gov.br/saude" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 text-xs hover:text-white transition-colors">Ministério da Saúde</a>
              <a href="https://mapasaudemental.com.br/" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 text-xs hover:text-white transition-colors">Mapa da Saúde Mental</a>
              <a href="https://sage.saude.gov.br/paineis/planoCrack/lista_caps.php?output=html&" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 text-xs hover:text-white transition-colors">CAPS - Lista do Ministério da Saúde</a>
              <a href="https://vitaalere.com.br/sobre-o-suicidio/posvencao/grupo-de-sobreviventes/" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 text-xs hover:text-white transition-colors">Grupos de Apoio a Sobreviventes</a>
              <a href="http://www.abeps.org.br/" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 text-xs hover:text-white transition-colors">ABEPS - Prevenção do Suicídio</a>
              <a href="https://asecbrasil.org.br/" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 text-xs hover:text-white transition-colors">Movimento Saber lidar</a>
              <a href="https://www.podefalar.org.br/" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 text-xs hover:text-white transition-colors">Pode falar (13-24 anos)</a>
              <a href="https://www.gov.br/mulheres/pt-br/ligue180" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 text-xs hover:text-white transition-colors">Segurança Mulheres - Ligue 180</a>
              <a href="http://www.samaritans.org" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 text-xs hover:text-white transition-colors">Samaritanos de Londres</a>
              <a href="http://www.iasp.info" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 text-xs hover:text-white transition-colors">IASP - Prevenção do Suicídio</a>
              <a href="http://www.befrienders.org" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 text-xs hover:text-white transition-colors">Befrienders Worldwide</a>
              <a href="https://www.paho.org/pt" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 text-xs hover:text-white transition-colors">OPAS - Organização Pan-Americana</a>
            </div>
          </div>

          {/* Contact Column */}
          <div className="space-y-6">
            <h4 className="font-serif text-lg font-medium border-b border-white/20 pb-2 inline-block">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 text-accent shrink-0" />
                <span className="text-primary-foreground/80 text-sm">
                  Av. das Américas, 500 - Bloco 21<br />
                  Downtown - Barra da Tijuca<br />
                  Rio de Janeiro - RJ
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <a href="tel:+5521982525626" className="text-primary-foreground/80 text-sm hover:text-white transition-colors">
                  (21) 98252-5626
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} André Duarte Psicologia. Todos os direitos reservados.</p>
          <p>Desenvolvido com cuidado e ética.</p>
        </div>
      </div>
    </footer>
  );
}
