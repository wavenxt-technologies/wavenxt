import subprocess
import glob
pdfs = glob.glob('/home/aman/wavenxt/public/*.pdf')
for pdf in sorted(pdfs):
    text = subprocess.check_output(['pdftotext', '-layout', pdf, '-']).decode('utf-8')
    lines = text.split('\n')[:15]
    print(f"File: {pdf.split('/')[-1]}")
    for l in lines:
        if l.strip():
            print(l.strip())
    print("---")
