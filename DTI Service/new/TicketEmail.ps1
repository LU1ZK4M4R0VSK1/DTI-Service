param (
    [string]$Comentario,
    [string]$Categoria,
    [string]$Status,
    [string]$Usuario
)

# Configurar TLS 1.2
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

# Configurações do servidor SMTP
$SmtpServer = "smtp.office365.com"
$SmtpPort = 587
$SmtpUser = "servicedti@cimentoitambe.com.br"
$SmtpPassword = "Itambe@!@#$%"
$From = "servicedti@cimentoitambe.com.br"
$To = "helpdesk@cimentoitambe.com.br"
$CC = "$Usuario@cimentoitambe.com.br"
$Subject = "Categoria: $Categoria"
$Body = @"
E-mail gerado automaticamente pelo Service DTI.

Solicito a abertura do chamado com as seguintes informacoes:

Categoria: $Categoria
Status: $Status
Comentarios: $Comentario

Usuario: $Usuario
"@

# Configurando credenciais
$SecurePassword = ConvertTo-SecureString $SmtpPassword -AsPlainText -Force
$Credential = New-Object System.Management.Automation.PSCredential($SmtpUser, $SecurePassword)

Write-Host "Tentando enviar e-mail..."

# Enviando o e-mail
Send-MailMessage -SmtpServer $SmtpServer `
                 -Port $SmtpPort `
                 -Credential $Credential `
                 -From $From `
                 -To $To `
                 -Cc $CC `
                 -Subject $Subject `
                 -Body $Body `
                 -UseSsl

Write-Host "E-mail enviado com sucesso."