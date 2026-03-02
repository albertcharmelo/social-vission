import Link from "next/link";

const footerLinks = {
  Plataforma: [
    { href: "/marketplace", label: "Marketplace" },
    { href: "/causas", label: "Causas" },
    { href: "#", label: "Cómo funciona" },
  ],
  Recursos: [
    { href: "#", label: "Centro de ayuda" },
    { href: "#", label: "Blog" },
    { href: "#", label: "Términos de uso" },
  ],
  Comunidad: [
    { href: "#", label: "Proveedores" },
    { href: "#", label: "Organizaciones" },
    { href: "#", label: "Contacto" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-deep text-cloud/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-warmth flex items-center justify-center">
                <span className="text-white font-bold text-sm">SV</span>
              </div>
              <span className="text-cloud font-bold text-lg">
                Social Vission
              </span>
            </div>
            <p className="text-cloud/60 text-sm leading-relaxed">
              Contrata servicios profesionales y genera impacto social real en
              cada compra.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-cloud font-semibold text-sm mb-3">
                {title}
              </h4>
              <ul className="space-y-2">
                {items.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-cloud/50 hover:text-cloud text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-cloud/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-cloud/40 text-xs">
            &copy; 2026 Social Vission. Todos los derechos reservados.
          </p>
          <p className="text-cloud/40 text-xs">
            Cada compra genera impacto real.
          </p>
        </div>
      </div>
    </footer>
  );
}
