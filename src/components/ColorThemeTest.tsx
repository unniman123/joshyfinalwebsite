// Temporary test component to verify golden theme colors
const ColorThemeTest = () => {
  return (
    <div className="p-8 space-y-6 bg-muted/30">
      <h2 className="text-2xl font-bold text-foreground mb-4">Color Theme Test</h2>

      {/* Golden gradient test */}
      <div className="p-4 bg-gradient-to-r from-brand-green to-brand-green-dark text-white rounded-lg shadow-brand">
        Golden Gradient Background
      </div>

      {/* Hover effects test */}
      <div className="p-4 bg-white border-2 border-transparent hover:border-brand-green/50 transition-all duration-300 hover:shadow-brand rounded-lg cursor-pointer">
        Hover for Golden Border & Shadow
      </div>

      {/* Warm shadows test */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-lg shadow-card">shadow-card</div>
        <div className="p-4 bg-white rounded-lg shadow-warm">shadow-warm</div>
        <div className="p-4 bg-white rounded-lg shadow-brand">shadow-brand</div>
      </div>

      {/* Typography colors */}
      <div className="space-y-2">
        <p className="text-foreground">Primary text (foreground)</p>
        <p className="text-muted-foreground">Secondary text (muted-foreground)</p>
        <p className="text-brand-green">Golden accent text</p>
        <p className="text-brand-green-dark">Golden dark text</p>
        <p className="text-warm-red">Warm red text</p>
      </div>
    </div>
  );
};

export default ColorThemeTest;