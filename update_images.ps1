$url = "https://jqlaafffpitkhfhylfxn.supabase.co/rest/v1/productos"
$key = "sb_publishable_DrFa6s-VQaL5r9E4bTn0ig_SD5Zdnl0"
$headers = @{
    "apikey" = $key
    "Authorization" = "Bearer $key"
    "Content-Type" = "application/json"
}

$images = @(
    "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1526045612212-70cb35976638?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504270997636-07ddfbd48945?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1596526131083-e8c638c9c6c7?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1607252656733-fd7420b561c2?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1491336477066-31156b5e4f35?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1629851722880-9de73e04e908?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522125609014-59265880bc85?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop"
)

$response = Invoke-RestMethod -Uri "$url?select=id" -Headers $headers -Method Get
$i = 0
foreach ($product in $response) {
    if ($i -lt $images.Length) {
        $img = $images[$i]
        $body = @{ imagen = $img } | ConvertTo-Json
        $patchUrl = "$url?id=eq.$($product.id)"
        Invoke-RestMethod -Uri $patchUrl -Headers $headers -Method Patch -Body $body | Out-Null
        Write-Host "Updated id $($product.id)"
    }
    $i++
}
Write-Host "Done"
