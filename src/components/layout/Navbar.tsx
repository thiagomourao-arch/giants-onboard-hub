import { Link, NavLink, useNavigate } from "react-router-dom";
import { Ship, LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/providers/AuthProvider";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const navLinkCls = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm transition-colors ${isActive ? "bg-secondary text-sidebar-primary" : "hover:bg-accent"}`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="flex items-center gap-2" aria-label="Giants OnBoard - Dashboard">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md" style={{ background: "var(--gradient-gold)" }}>
              <Ship className="h-5 w-5 text-foreground" />
            </span>
            <span className="font-semibold tracking-tight">Giants OnBoard</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/dashboard" className={navLinkCls} end>
            Dashboard
          </NavLink>
          <NavLink to="/reservas" className={navLinkCls}>
            Minhas Reservas
          </NavLink>
          <NavLink to="/programacao" className={navLinkCls}>
            Programação
          </NavLink>
          <NavLink to="/faq" className={navLinkCls}>
            FAQ
          </NavLink>
          <NavLink to="/contato" className={navLinkCls}>
            Contato
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:block text-sm text-muted-foreground">{user?.name}</div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="sm" className="rounded-full">
                <LogOut className="h-4 w-4 mr-2" /> Sair
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate("/reservas")}>Minhas Reservas</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/programacao")}>Programação</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/faq")}>FAQ</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/contato")}>Contato</DropdownMenuItem>
              <DropdownMenuItem onClick={logout} className="text-destructive">Sair</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Abrir menu" onClick={() => setOpen((o) => !o)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t bg-background">
          <div className="container py-2 flex flex-col">
            <NavLink to="/dashboard" className={navLinkCls} onClick={() => setOpen(false)} end>
              Dashboard
            </NavLink>
            <NavLink to="/reservas" className={navLinkCls} onClick={() => setOpen(false)}>
              Minhas Reservas
            </NavLink>
            <NavLink to="/programacao" className={navLinkCls} onClick={() => setOpen(false)}>
              Programação
            </NavLink>
            <NavLink to="/faq" className={navLinkCls} onClick={() => setOpen(false)}>
              FAQ
            </NavLink>
            <NavLink to="/contato" className={navLinkCls} onClick={() => setOpen(false)}>
              Contato
            </NavLink>
            <Button variant="secondary" className="mt-2" onClick={logout}>Sair</Button>
          </div>
        </div>
      )}
    </header>
  );
}
