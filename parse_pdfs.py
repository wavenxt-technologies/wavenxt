import subprocess
import glob
import re

pdfs = glob.glob('/home/aman/wavenxt/public/*.pdf')
for pdf in sorted(pdfs):
    text = subprocess.check_output(['pdftotext', '-layout', pdf, '-']).decode('utf-8')
    model_match = re.search(r'([A-Z0-9\-]+)\s+Power Splitter/Combiner', text)
    if model_match:
        print(f"Model: {model_match.group(1)}")
    else:
        print(f"File: {pdf} (No model found)")
        
    freq_match = re.search(r'Frequency Range\s+([\d\.]+)\s+([\d\.]+)\s+(MHz|GHz)', text)
    if freq_match:
        print(f"  Frequency Range: {freq_match.group(1)} - {freq_match.group(2)} {freq_match.group(3)}")
        
    il_match = re.search(r'Insertion Loss\s+.*?≤([\d\.]+)', text)
    if il_match:
        print(f"  Insertion Loss: <= {il_match.group(1)} dB")
        
    iso_match = re.search(r'Isolation\s+(\d+)\s+(\d+)', text)
    if iso_match:
        print(f"  Isolation: Min {iso_match.group(1)} Typ {iso_match.group(2)} dB")
        
    dim_match = re.search(r'Dimensions\s+([\d\.\s]+x[\d\.\s]+x[\d\.\s]+)\s*mm', text)
    if dim_match:
        print(f"  Dimensions: {dim_match.group(1).strip()} mm")
        
    conn_match = re.search(r'Port Connectors\s+(.*)', text)
    if conn_match:
         print(f"  Connectors: {conn_match.group(1).strip()}")
    print()
