$url = "https://jqlaafffpitkhfhylfxn.supabase.co/rest/v1/productos"
$key = "sb_publishable_DrFa6s-VQaL5r9E4bTn0ig_SD5Zdnl0"
$headers = @{
    "apikey" = $key
    "Authorization" = "Bearer $key"
    "Content-Type" = "application/json"
}
$response = Invoke-RestMethod -Uri "$url?select=id,nombre,categoria" -Headers $headers -Method Get
$response | ConvertTo-Json -Depth 5
