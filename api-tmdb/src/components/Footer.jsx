import React from 'react';

const Footer = () => {
  // Pega o ano atual dinamicamente para que ele se atualize sozinho a cada ano.
  const currentYear = new Date().getFullYear();

  return (
    // Tag 'footer' semântica, com classes do Tailwind.
    // 'mt-auto' é a classe chave que empurra o rodapé para o final da página.
    <footer className="w-full mt-auto p-6 bg-slate-900 text-center border-t-2 border-amber-500">
      {/* Parágrafo com suas informações. */}
      <p className="text-slate-400">
        &copy; {currentYear} - Desenvolvido por Marcelo Giulian
      </p>
      {/* Container para os links das redes sociais. */}
      <div className="mt-2">
        {/* Link para o GitHub. 'target="_blank"' abre em uma nova aba. */}
        <a href="https://github.com/mgbmoura" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 mx-2 transition-colors">
          GitHub
        </a>
        <span className="text-slate-500">|</span>
        {/* Link para o LinkedIn. */}
        <a href="https://www.linkedin.com/in/marcelo-giulian" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 mx-2 transition-colors">
          LinkedIn
        </a>
      </div>
    </footer>
  );
};

export default Footer;