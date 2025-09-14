const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', 'src', 'components');

const walk = (dir) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.tsx?$/.test(entry.name)) {
      let content = fs.readFileSync(full, 'utf8');
      const before = content;
      // Replacement map
      const map = [
        [/bg-gradient-golden/g, 'bg-gradient-brand'],
        [/bg-gradient-golden/g, 'bg-gradient-brand'],
        [/bg-golden/g, 'bg-brand-green'],
        [/text-golden-dark/g, 'text-brand-green-dark'],
        [/text-golden/g, 'text-brand-green'],
        [/golden-light/g, 'brand-green-light'],
        [/golden-dark/g, 'brand-green-dark'],
        [/golden\/10/g, 'brand-green/10'],
        [/golden\/20/g, 'brand-green/20'],
        [/golden\/30/g, 'brand-green/30'],
        [/golden\/40/g, 'brand-green/40'],
        [/golden\/50/g, 'brand-green/50'],
        [/golden\/60/g, 'brand-green/60'],
        [/golden\/80/g, 'brand-green/80'],
        [/border-golden/g, 'border-brand-green'],
        [/shadow-golden/g, 'shadow-brand'],
        [/hover:shadow-golden/g, 'hover:shadow-brand'],
        [/hover:bg-golden/g, 'hover:bg-brand-green'],
        [/hover:text-golden/g, 'hover:text-brand-green'],
        [/text-golden\/80/g, 'text-brand-green/80'],
        [/bg-golden\/10/g, 'bg-brand-green/10'],
        [/from-golden/g, 'from-brand-green'],
        [/to-golden/g, 'to-brand-green'],
        [/via-golden/g, 'via-brand-green'],
        [/border-golden\/30/g, 'border-brand-green/30'],
        [/hover:border-golden\/50/g, 'hover:border-brand-green/50'],
        [/group-hover:text-golden/g, 'group-hover:text-brand-green'],
        [/fill-golden/g, 'fill-brand-green']
      ];
      for (const [re, rep] of map) content = content.replace(re, rep);
      if (content !== before) {
        fs.writeFileSync(full, content, 'utf8');
        console.log('Updated', full);
      }
    }
  }
};

walk(root);
console.log('replace-golden complete');


