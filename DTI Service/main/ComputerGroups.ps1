$computerName = $env:COMPUTERNAME
$domain = "CIMENTOITAMBE.NET"
 
# Consulta o computador no AD
Write-Output $computerName
$computer = ([adsisearcher]"(&(objectCategory=computer)(cn=$computerName))").FindOne()
 
if ($computer) {
    # Consulta os grupos aos quais o computador pertence
    ([adsisearcher]"(member=$($computer.Properties.distinguishedname[0]))").FindAll() | ForEach-Object {
        $_.Properties.name[0]
    }
} else {
    Write-Host "Computador '$computerName' não encontrado no domínio '$domain'."
}