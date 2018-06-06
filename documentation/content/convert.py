#!/bin/env python3

import base64
import glob,os
from PIL import Image
from io import BytesIO

size = 128,128
for infile in glob.glob("*.jpg"):
    print(infile)
    file, ext = os.path.splitext(infile)
    im = Image.open(infile)
    im.thumbnail(size, Image.ANTIALIAS)
    final_buffer = BytesIO()
    im.save(final_buffer, format="JPEG")
    picture = base64.b64encode(final_buffer.getvalue())
    print(str(picture)[2:-1])

