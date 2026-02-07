$htmlFile = Join-Path $PSScriptRoot "roadtrip.html"
$pdfFile  = Join-Path $PSScriptRoot "roadtrip.pdf"

$htmlUri = ([Uri](Resolve-Path $htmlFile).Path).AbsoluteUri

& "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" `
    --headless --disable-gpu --no-pdf-header-footer `
    --print-to-pdf="$pdfFile" "$htmlUri"

if (Test-Path $pdfFile) {
    Write-Host "Created: $pdfFile"
} else {
    Write-Host "PDF generation failed." -ForegroundColor Red
}
