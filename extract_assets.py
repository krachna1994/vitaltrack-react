"""Optional helper to re-extract the design photos from the supplied VitalTrack PDF.
Run: python extract_assets.py '/path/to/VitalTrack.pdf'
The packaged project already includes the extracted optimized images.
"""
from pathlib import Path
import sys, io
import fitz
from PIL import Image

SOURCE = Path(sys.argv[1]) if len(sys.argv)>1 else Path('/mnt/data/VitalTrack(1).pdf')
OUT = Path(__file__).parent/'public'/'images'
OUT.mkdir(parents=True, exist_ok=True)
assets = {
 'welcome':(2,14), 'gender-male':(4,431),'gender-female':(4,435),
 'goal-loss':(5,567),'goal-muscle':(5,571),'goal-fit':(5,575),
 'focus':(6,697),'height':(7,853), 'avatar':(11,1471),
 'marathon':(12,1777),'beach-challenge':(12,1771), 'friends':(12,1781),
 'workout-ball':(13,1963), 'basketball':(13,1959),
 'workout-cover':(14,2273),'exercise':(15,2451),
}
doc=fitz.open(SOURCE)
for name,(page_no,xref) in assets.items():
 page=doc[page_no-1]
 match=next((im for im in page.get_images(full=True) if im[0]==xref),None)
 mask_xref=match[1] if match else 0
 pix=fitz.Pixmap(doc,xref)
 if mask_xref:
  mask=fitz.Pixmap(doc,mask_xref)
  pix=fitz.Pixmap(pix,mask)
 image=Image.open(io.BytesIO(pix.tobytes('png')))
 image.thumbnail((1200,1700),Image.Resampling.LANCZOS)
 if image.mode=='RGBA':
  image.save(OUT/f'{name}.webp','WEBP',quality=83,method=5)
 else:
  image.convert('RGB').save(OUT/f'{name}.webp','WEBP',quality=83,method=5)
 print(name, image.size)
