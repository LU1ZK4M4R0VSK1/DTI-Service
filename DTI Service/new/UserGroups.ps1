# usuário logado na máquina
$loggedInUser = (Get-WmiObject -Class Win32_ComputerSystem).UserName
 
# Extrai apenas o nome do usuário (sem o domínio)
$userName = $loggedInUser.Split('\')[1]
 
# Consulta o usuário no AD
Write-Output $userName
$user = ([adsisearcher]"(&(objectCategory=user)(samaccountname=$userName))").FindOne()
 
if ($user) {
    # Consulta os grupos aos quais o usuário pertence
    ([adsisearcher]"(member=$($user.Properties.distinguishedname[0]))").FindAll() | ForEach-Object {
        $_.Properties.name[0]
    }
} else {
    Write-Host "Usuário '$userName' não encontrado no domínio."
}