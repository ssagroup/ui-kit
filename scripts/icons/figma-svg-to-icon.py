import re, sys, os

ATTR_MAP = {
    'fill-rule': 'fillRule', 'clip-rule': 'clipRule',
    'stroke-width': 'strokeWidth', 'stroke-linecap': 'strokeLinecap',
    'stroke-linejoin': 'strokeLinejoin', 'stroke-miterlimit': 'strokeMiterlimit',
    'stroke-dasharray': 'strokeDasharray',
}
FIGMA_COLOR = '#2B2D31'

def fmt(n):
    s = f'{n:.4f}'.rstrip('0').rstrip('.')
    return s if s else '0'

def convert(svg_text, tx, ty, component, icon_name, transform_override=None):
    # body = everything between the outer <svg ...> and </svg>
    body = re.sub(r'^.*?<svg[^>]*>', '', svg_text, flags=re.S)
    body = re.sub(r'</svg>\s*$', '', body, flags=re.S).strip()
    # unwrap Figma grouping <g id="..."> that carries no transform
    body = re.sub(r'<g\s+id="[^"]*"\s*>(.*?)</g>', r'\1', body, flags=re.S)
    # drop Figma-only attributes
    body = re.sub(r'\s+(?:fill|stroke)-opacity="[^"]*"', '', body)
    body = re.sub(r'\s+id="[^"]*"', '', body)
    # colors -> themeable prop
    body = body.replace(f'fill="{FIGMA_COLOR}"', 'fill={fill}')
    body = body.replace(f'stroke="{FIGMA_COLOR}"', 'stroke={fill}')
    # kebab attrs -> camelCase
    for k, v in ATTR_MAP.items():
        body = body.replace(f'{k}=', f'{v}=')
    # stroke-only paths need explicit fill="none"
    def ensure_fill_none(m):
        tag = m.group(0)
        if 'stroke={fill}' in tag and 'fill=' not in tag:
            return tag[:-2] + ' fill="none"/>' if tag.endswith('/>') else tag
        return tag
    body = re.sub(r'<path\b[^>]*/>', ensure_fill_none, body)

    transform = transform_override or (
        f'translate({fmt(tx)}, {fmt(ty)})' if (tx or ty) else ''
    )
    indent = '      ' if transform else '    '
    body = '\n'.join(indent + ln.strip() for ln in body.splitlines() if ln.strip())
    if transform:
        inner = f'    <g transform="{transform}">\n{body}\n    </g>'
    else:
        inner = body

    return f"""import {{ SVGProps }} from '@components/Icon/types';

export const {component} = ({{ fill = '#000', size = 24, ...props }}: SVGProps) => (
  <svg
    width={{`${{size}}px`}}
    height={{`${{size}}px`}}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {{...props}}>
{inner}
  </svg>
);

export const ICON_NAME = '{icon_name}';
"""

if __name__ == '__main__':
    src, tx, ty, component, icon_name, dest = sys.argv[1:7]
    transform_override = sys.argv[7] if len(sys.argv) > 7 else None
    with open(src) as f:
        out = convert(f.read(), float(tx), float(ty), component, icon_name,
                      transform_override)
    with open(dest, 'w') as f:
        f.write(out)
    print(f'{component:14s} -> {dest}')
