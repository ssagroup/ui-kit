import re, os, sys
D='/Users/yaroslav/Desktop/SuperFolder/projects/ui-kit/packages/core/src/components/Icon/icons'
byname={}
for f in os.listdir(D):
    if not f.endswith('.tsx') or f in ('index.tsx','iconsList.tsx'): continue
    m=re.search(r"ICON_NAME = '([^']*)'", open(os.path.join(D,f)).read())
    if m: byname[m.group(1)]=f
def inner_of(icon):
    src=open(f'{D}/{byname[icon]}').read()
    inner=re.search(r'\{\.\.\.props\}>(.*?)</svg>', src, re.S).group(1)
    inner=inner.replace('{fill}','"#2B2D31"')
    inner=re.sub(r'(fill|stroke)="\"#2B2D31\""', r'\1="#2B2D31"', inner)
    # JSX prop names -> real SVG attribute names
    for a,b in [('fillRule','fill-rule'),('clipRule','clip-rule'),('strokeWidth','stroke-width'),
                ('strokeLinecap','stroke-linecap'),('strokeLinejoin','stroke-linejoin'),
                ('strokeMiterlimit','stroke-miterlimit'),('strokeDasharray','stroke-dasharray')]:
        inner=inner.replace(a+'=',b+'=')
    vb=re.search(r'viewBox="([^"]*)"', src).group(1)
    return inner, vb
def build(names, out, cols=10, S=3):
    BOX=24*S; PAD=14; LBL=15
    rows=(len(names)+cols-1)//cols
    cw=BOX+PAD*2; ch=BOX+PAD*2+LBL
    W=cw*cols; H=ch*rows
    p=[f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}"><rect width="{W}" height="{H}" fill="#fff"/>']
    for i,n in enumerate(names):
        inner,vb=inner_of(n)
        c,r=i%cols,i//cols
        x,y=c*cw+PAD, r*ch+PAD
        p.append(f'<g transform="translate({x},{y})">')
        p.append(f'<rect width="{BOX}" height="{BOX}" fill="none" stroke="#d8d8de" stroke-dasharray="2 2"/>')
        p.append(f'<svg width="{BOX}" height="{BOX}" viewBox="{vb}">{inner}</svg>')
        p.append(f'<text x="{BOX/2}" y="{BOX+11}" font-family="Helvetica" font-size="7" fill="#666" text-anchor="middle">{n}</text>')
        p.append('</g>')
    p.append('</svg>')
    open(out,'w').write('\n'.join(p))
if __name__=='__main__':
    names=[l.split('|')[0] for l in open(sys.argv[1])]
    build(names, sys.argv[2])
