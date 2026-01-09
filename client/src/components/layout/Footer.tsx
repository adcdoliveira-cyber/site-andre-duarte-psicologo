import { Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
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
            <div className="inline-block bg-white/10 px-4 py-2 rounded-full text-sm font-medium">
              CRP: 05 71020
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
                  Portaria A - Sala 225 - Downtown<br />
                  Barra da Tijuca, Rio de Janeiro - RJ
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <a href="tel:+5521982525626" className="text-primary-foreground/80 text-sm hover:text-white transition-colors">
                  (21) 98252-5626
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <a href="mailto:atendimento@psicologoandreduarte.com" className="text-primary-foreground/80 text-sm hover:text-white transition-colors">
                  atendimento@psicologoandreduarte.com
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links & Social */}
          <div className="space-y-6">
            <h4 className="font-serif text-lg font-medium border-b border-white/20 pb-2 inline-block">Links Rápidos</h4>
            <div className="grid grid-cols-2 gap-2">
              <a href="#sobre" className="text-primary-foreground/80 text-sm hover:text-white transition-colors">Sobre Mim</a>
              <a href="#servicos" className="text-primary-foreground/80 text-sm hover:text-white transition-colors">Como Ajudo</a>
              <a href="#atendimento" className="text-primary-foreground/80 text-sm hover:text-white transition-colors">Atendimento</a>
              <a href="#contato" className="text-primary-foreground/80 text-sm hover:text-white transition-colors">Agendar</a>
            </div>
            
            <div className="pt-4">
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
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} André Duarte Psicologia. Todos os direitos reservados.</p>
          <p>Desenvolvido com cuidado e ética.</p>
        </div>
      </div>
    </footer>
  );
}
