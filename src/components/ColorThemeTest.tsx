// Temporary test component to verify golden theme colors
const ColorThemeTest = () => {
  return (
    <div className="p-8 space-y-6 bg-muted/30">
      <h2 className="text-2xl font-bold text-foreground mb-4">Color Theme Test</h2>

      {/* Golden gradient test */}
      <div className="p-4 bg-gradient-to-r from-golden to-golden-dark text-white rounded-lg shadow-golden">
        Golden Gradient Background
      </div>

      {/* Hover effects test */}
      <div className="p-4 bg-white border-2 border-transparent hover:border-golden/50 transition-all duration-300 hover:shadow-golden rounded-lg cursor-pointer">
        Hover for Golden Border & Shadow
      </div>

      {/* Warm shadows test */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-lg shadow-card">shadow-card</div>
        <div className="p-4 bg-white rounded-lg shadow-warm">shadow-warm</div>
        <div className="p-4 bg-white rounded-lg shadow-golden">shadow-golden</div>
      </div>

      {/* Typography colors */}
      <div className="space-y-2">
        <p className="text-foreground">Primary text (foreground)</p>
        <p className="text-muted-foreground">Secondary text (muted-foreground)</p>
        <p className="text-golden">Golden accent text</p>
        <p className="text-golden-dark">Golden dark text</p>
        <p className="text-warm-red">Warm red text</p>
      </div>
    </div>
  );
};

export default ColorThemeTest;