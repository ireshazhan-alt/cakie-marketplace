export const Footer = () => (
  <footer className="border-t border-border mt-12">
    <div className="container py-14 grid md:grid-cols-4 gap-10">
      <div>
        <div className="font-display text-3xl text-chocolate mb-3">Cakie</div>
        <p className="text-sm text-muted-foreground max-w-xs">
          A premium marketplace connecting you with the world's finest cake artisans.
        </p>
      </div>
      {[
        { h: "Marketplace", l: ["Browse Cakes", "Categories", "Custom Orders", "Gift Cards"] },
        { h: "For Sellers", l: ["Become a Seller", "Seller Dashboard", "Pricing", "Resources"] },
        { h: "Company", l: ["About", "Journal", "Contact", "Press"] },
      ].map((c) => (
        <div key={c.h}>
          <h4 className="text-sm font-semibold text-chocolate mb-4 uppercase tracking-wider">{c.h}</h4>
          <ul className="space-y-2.5">
            {c.l.map((i) => (
              <li key={i}><a href="#" className="text-sm text-muted-foreground hover:text-chocolate transition-colors">{i}</a></li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div className="border-t border-border">
      <div className="container py-6 flex justify-between text-xs text-muted-foreground">
        <span>© 2026 Cakie. Crafted with care.</span>
        <span>Privacy · Terms</span>
      </div>
    </div>
  </footer>
);
