from io import BytesIO
from pathlib import Path
import sys

from pypdf import PdfReader, PdfWriter
from pypdf.generic import RectangleObject
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas


source = Path(sys.argv[1])
destination = Path(sys.argv[2])
certificate_url = "https://platzi.com/p/gvidal0307/curso/13100-programacion-basica/diploma/detalle/"

reader = PdfReader(source)
page = reader.pages[1]
width = float(page.mediabox.width)
height = float(page.mediabox.height)

overlay_buffer = BytesIO()
pdf = canvas.Canvas(overlay_buffer, pagesize=(width, height))
pdf.setFillColor(HexColor("#222222"))
pdf.setFont("Helvetica", 10.5)
title_y = height - 240
issuer_y = height - 255
pdf.circle(66, title_y + 3, 1.8, stroke=0, fill=1)
pdf.drawString(76.5, title_y, "Curso Gratis de Programación Básica")
pdf.setFont("Helvetica-Bold", 10.5)
issuer = "PLATZI"
pdf.drawString(76.2, issuer_y, issuer)
issuer_width = pdf.stringWidth(issuer, "Helvetica-Bold", 10.5)
pdf.setLineWidth(0.6)
pdf.line(76.2, issuer_y - 1.3, 76.2 + issuer_width, issuer_y - 1.3)
pdf.save()
overlay_buffer.seek(0)

overlay = PdfReader(overlay_buffer).pages[0]
page.merge_page(overlay)
writer = PdfWriter(clone_from=source)
writer.pages[1].merge_page(overlay)
writer.add_uri(
    page_number=1,
    uri=certificate_url,
    rect=RectangleObject([75, issuer_y - 2, 76.2 + issuer_width + 2, issuer_y + 12]),
)

destination.parent.mkdir(parents=True, exist_ok=True)
with destination.open("wb") as output:
    writer.write(output)
