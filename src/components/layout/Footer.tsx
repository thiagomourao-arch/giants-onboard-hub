import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container h-14 flex items-center justify-between text-sm">
        <span className="text-muted-foreground">© {new Date().getFullYear()} Giants OnBoard</span>
        <nav className="flex items-center gap-4">
          <Link to="/faq" className="hover:underline">FAQ</Link>
          <Link to="/contato" className="hover:underline">Formulário de Contato</Link>
        </nav>
      </div>
    </footer>
  );
}
