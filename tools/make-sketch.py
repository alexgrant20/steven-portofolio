"""Turn the colour portrait cut-out into a pencil-sketch version for the hero.

Usage:  python tools/make-sketch.py [input.png] [output.png]
Defaults: assets/img/portrait.png (or portofolio.png) -> assets/img/portrait-sketch.png
Requires Pillow (pip install pillow). Local tool only; not deployed.
"""
import sys
from pathlib import Path

from PIL import Image, ImageChops, ImageFilter, ImageOps

ROOT = Path(__file__).resolve().parent.parent
IMG = ROOT / "assets" / "img"


def sketch(src: Image.Image) -> Image.Image:
    rgba = src.convert("RGBA")
    alpha = rgba.getchannel("A")
    gray = ImageOps.grayscale(rgba)

    # Classic colour-dodge pencil effect: gray / (1 - blur(inverted gray)).
    blur = ImageOps.invert(gray).filter(ImageFilter.GaussianBlur(radius=max(2, src.height // 90)))
    g, d = gray.load(), ImageChops.invert(blur).load()
    out = Image.new("L", gray.size)
    o = out.load()
    for y in range(gray.height):
        for x in range(gray.width):
            denom = d[x, y]
            o[x, y] = 255 if denom == 0 else min(255, g[x, y] * 255 // denom)

    # Deepen strokes, then add back faint shading so dark suits don't vanish.
    out = ImageOps.autocontrast(out, cutoff=1)
    out = out.point(lambda v: int(255 * (v / 255) ** 1.8))
    out = Image.blend(out, ImageOps.autocontrast(gray), 0.4)

    result = Image.merge("RGBA", (out, out, out, alpha))
    return result


def main() -> None:
    default_in = IMG / "portrait.png" if (IMG / "portrait.png").exists() else IMG / "portofolio.png"
    src_path = Path(sys.argv[1]) if len(sys.argv) > 1 else default_in
    dst_path = Path(sys.argv[2]) if len(sys.argv) > 2 else IMG / "portrait-sketch.png"

    src = Image.open(src_path)
    result = sketch(src)

    # Self-check: same size, transparency preserved.
    assert result.size == src.size, "sketch size differs from source"
    assert result.mode == "RGBA", "sketch lost its alpha channel"
    assert result.getchannel("A").getextrema() == src.convert("RGBA").getchannel("A").getextrema()

    result.save(dst_path, optimize=True)
    print(f"{src_path.name} -> {dst_path.relative_to(ROOT)} {result.size}")


if __name__ == "__main__":
    main()
