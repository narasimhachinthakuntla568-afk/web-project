interface FooterProps {
  go: (p: string) => void;
}

export const Footer = ({ go }: FooterProps) => {
  const sections: [string, string[]][] = [
    ["Shop", ["New Arrivals", "Tops", "Bottoms", "Dresses", "Sale"]],
    ["Help", ["Size Guide", "Returns", "Shipping", "Contact"]],
    ["About", ["Our Story", "Sustainability", "Careers"]]
  ];

  return (
    <footer className="footer-v2">
      <div className="footer-grid-v2">
        <div>
          <div className="footer-logo-v2">DRIP</div>
          <div className="footer-desc-v2">Minimalist fashion for the generation that defines cool.</div>
        </div>
        {sections.map(([title, links]) => (
          <div key={title}>
            <div className="footer-title-v2">{title}</div>
            {links.map((l: string) => <span key={l} className="footer-link-v2" onClick={() => go("shop")}>{l}</span>)}
          </div>
        ))}
      </div>
      <div className="footer-bottom-v2">
        <span>© 2025 DRIP. All rights reserved.</span>
        <div className="flex gap-18">{["Privacy","Terms","Cookies"].map(l=><span key={l} className="cursor-pointer">{l}</span>)}</div>
      </div>
    </footer>
  );
};
