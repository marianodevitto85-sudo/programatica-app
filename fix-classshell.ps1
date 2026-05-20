$filePath = "components/ClassShell.tsx"
$content = Get-Content -Path $filePath -Raw

# Buscar y reemplazar el patrón problemático
$pattern = '(</aside>)\s+\)\s+(<article)'
$replacement = "`$1`r`n        )}`r`n`r`n        `$2"

$newContent = $content -replace $pattern, $replacement

Set-Content -Path $filePath -Value $newContent -NoNewline

Write-Host "Arreglado ClassShell.tsx"
