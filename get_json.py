import subprocess
import glob
import re
import json

data = {}
pdfs = glob.glob('/home/aman/wavenxt/public/*.pdf')
for pdf in sorted(pdfs):
    fname = pdf.split('/')[-1]
    text = subprocess.check_output(['pdftotext', '-layout', pdf, '-']).decode('utf-8')
    
    freq_match = re.search(r'Frequency Range\s+([\d\.]+)\s+([\d\.]+)\s+(MHz|GHz)', text)
    il_match = re.search(r'Insertion Loss\s+.*?≤([\d\.]+)', text)
    iso_match = re.search(r'Isolation\s+(\d+)\s+(\d+)', text)
    dim_match = re.search(r'Dimensions\s+([\d\.\s]+x[\d\.\s]+x[\d\.\s]+)\s*mm', text)
    conn_match = re.search(r'Port Connectors\s+(.*)', text)
    way_match = re.search(r'(\d+)-Way', text)
    
    data[fname] = {
        "model": fname.replace('.pdf', ''),
        "ways": way_match.group(1) if way_match else "N/A",
        "freq": f"{freq_match.group(1)} - {freq_match.group(2)} {freq_match.group(3)}" if freq_match else "N/A",
        "insertion_loss": il_match.group(1) if il_match else "N/A",
        "isolation_min": iso_match.group(1) if iso_match else "N/A",
        "isolation_typ": iso_match.group(2) if iso_match else "N/A",
        "dimensions": dim_match.group(1).strip() if dim_match else "N/A",
        "connector": conn_match.group(1).strip() if conn_match else "SMA-Female"
    }

print(json.dumps(data, indent=2))
