function Show-Tree {
    param(
        [string]$Path = ".",
        [string]$Indent = "",
        [bool]$IsLast = $true,
        [int]$MaxDepth = 10,
        [int]$CurrentDepth = 0
    )
    
    if ($CurrentDepth -ge $MaxDepth) { return }
    
    $items = Get-ChildItem -Path $Path | Where-Object { 
        $_.Name -notmatch '^(node_modules|\.next|\.git|dist|build|\.cache)$' 
    }
    
    $folderName = Split-Path $Path -Leaf
    if ($CurrentDepth -eq 0) {
        Write-Host "$folderName/" -ForegroundColor Cyan
    }
    
    for ($i = 0; $i -lt $items.Count; $i++) {
        $item = $items[$i]
        $isLast = ($i -eq $items.Count - 1)
        
        $prefix = if ($isLast) { "└── " } else { "├── " }
        $newIndent = if ($isLast) { "$Indent    " } else { "$Indent│   " }
        
        if ($item.PSIsContainer) {
            Write-Host "$Indent$prefix$($item.Name)/" -ForegroundColor Cyan
            Show-Tree -Path $item.FullName -Indent $newIndent -IsLast $isLast -MaxDepth $MaxDepth -CurrentDepth ($CurrentDepth + 1)
        } else {
            Write-Host "$Indent$prefix$($item.Name)" -ForegroundColor Gray
        }
    }
}

Show-Tree


# .\tree.ps1 > structure.txt