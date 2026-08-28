#!/usr/bin/env python3
"""Compose the Pulse CPR 1200x630 Open Graph image as a baseline JPEG."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "og-image.jpg"
PHOTO = ROOT / "public" / "images" / "christine-oldenburg.jpg"

NAVY = (11, 31, 58)
NAVY_DEEP = (7, 21, 38)
NAVY_CARD = (18, 42, 74)
RED = (214, 40, 40)
RED_SOFT = (232, 96, 96)
WHITE = (255, 255, 255)
MIST = (226, 232, 240)
PINK = (248, 180, 180)

W, H = 1200, 630
# Facebook / LinkedIn / X safe inset (keep type and faces off the crop edges)
SAFE = 72


def font(weight: str, size: int) -> ImageFont.FreeTypeFont:
    names = {
        "regular": "Inter-Regular.ttf",
        "medium": "Inter-Medium.ttf",
        "semibold": "Inter-SemiBold.ttf",
        "bold": "Inter-Bold.ttf",
    }
    path = Path("/usr/share/fonts/truetype/macos") / names[weight]
    return ImageFont.truetype(str(path), size)


def draw_logo(draw: ImageDraw.ImageDraw, x: int, y: int, size: int = 88) -> None:
    r = max(12, round(size * 0.22))
    draw.rounded_rectangle((x, y, x + size, y + size), radius=r, fill=WHITE)
    inner = round(size * 0.06)
    draw.rounded_rectangle(
        (x + inner, y + inner, x + size - inner, y + size - inner),
        radius=max(8, r - 4),
        fill=(15, 39, 68),
    )
    s = size / 40
    ox, oy = x, y

    def p(px: float, py: float) -> tuple[float, float]:
        return ox + px * s, oy + py * s

    heart = [
        p(20, 29),
        p(12.5, 23.8),
        p(10.6, 20.8),
        p(10.2, 17.2),
        p(12.3, 13.5),
        p(16.2, 13.8),
        p(20, 18.4),
        p(23.8, 13.8),
        p(27.7, 13.5),
        p(29.8, 17.2),
        p(29.4, 20.8),
        p(27.5, 23.8),
        p(20, 29),
    ]
    draw.polygon(heart, fill=RED)
    ekg = [p(6, 21), p(11, 21), p(13.2, 16), p(16.3, 26), p(18.7, 21), p(34, 21)]
    draw.line(ekg, fill=WHITE, width=max(2, round(1.8 * s)), joint="curve")


def fit_uncropped(src: Image.Image, box_w: int, box_h: int) -> Image.Image:
    scale = min(box_w / src.width, box_h / src.height)
    size = (max(1, round(src.width * scale)), max(1, round(src.height * scale)))
    return src.resize(size, Image.Resampling.LANCZOS)


def main() -> None:
    canvas = Image.new("RGB", (W, H), NAVY_DEEP)
    draw = ImageDraw.Draw(canvas)

    draw.rectangle((0, 0, W, H), fill=NAVY)

    # Soft right-side panel for the uncropped portrait (inside Facebook safe margins)
    panel_left, panel_right = 700, W - SAFE
    panel_top, panel_bottom = SAFE, H - SAFE
    draw.rounded_rectangle((panel_left, panel_top, panel_right, panel_bottom), radius=28, fill=NAVY_CARD)

    photo = Image.open(PHOTO).convert("RGB")
    photo_box_w = panel_right - panel_left - 48
    photo_box_h = panel_bottom - panel_top - 78
    fitted = fit_uncropped(photo, photo_box_w, photo_box_h)
    px = panel_left + (panel_right - panel_left - fitted.width) // 2
    py = panel_top + 22
    shadow = Image.new("RGBA", (fitted.width + 24, fitted.height + 24), (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow)
    sd.rounded_rectangle((6, 10, fitted.width + 18, fitted.height + 18), radius=18, fill=(0, 0, 0, 90))
    shadow = shadow.filter(ImageFilter.GaussianBlur(8))
    canvas.paste(shadow, (px - 12, py - 8), shadow)
    mask = Image.new("L", fitted.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, fitted.width - 1, fitted.height - 1), radius=16, fill=255)
    canvas.paste(fitted, (px, py), mask)

    caption_font = font("semibold", 22)
    caption = "Christine Oldenburg, RN"
    cw = draw.textlength(caption, font=caption_font)
    cap_x = panel_left + (panel_right - panel_left - cw) // 2
    cap_y = py + fitted.height + 18
    draw.text((cap_x, cap_y), caption, font=caption_font, fill=WHITE)

    logo_x, logo_y = SAFE + 8, SAFE
    draw_logo(draw, logo_x, logo_y, 92)

    title_font = font("bold", 58)
    ok_font = font("bold", 26)
    tag_font = font("semibold", 28)
    train_font = font("medium", 24)
    small_font = font("medium", 18)

    text_x = logo_x + 92 + 22
    draw.text((text_x, logo_y + 8), "PULSE CPR", font=title_font, fill=WHITE)
    draw.text((text_x, logo_y + 72), "OKLAHOMA", font=ok_font, fill=RED_SOFT)
    line_y = logo_y + 108
    draw.rectangle((text_x, line_y, text_x + 132, line_y + 5), fill=RED)

    tag = "Learn It. Know It. Save A Life."
    draw.text((logo_x, SAFE + 168), tag, font=tag_font, fill=WHITE)

    training = "CPR, AED, First Aid, BLS Training"
    draw.text((logo_x, SAFE + 220), training, font=train_font, fill=MIST)

    draw.rounded_rectangle((logo_x, SAFE + 286, logo_x + 430, SAFE + 344), radius=12, fill=(214, 40, 40))
    draw.text((logo_x + 22, SAFE + 300), "Professional healthcare training", font=small_font, fill=WHITE)

    draw.text((logo_x, H - SAFE - 8), "pulsecprok.com", font=small_font, fill=PINK)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(
        OUT,
        format="JPEG",
        quality=90,
        optimize=True,
        progressive=False,
        subsampling=0,
    )
    print(f"wrote {OUT} {OUT.stat().st_size} bytes {canvas.size}")


if __name__ == "__main__":
    main()
