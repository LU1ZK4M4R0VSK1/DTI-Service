$SMTPServer = "smtp.seuservidor.com"
$SMTPPort = 587
$Username = "rafael.leal@cimentoitambe.com.br"
$Password = "Senhaantiga#2024"

$Creds = New-Object System.Management.Automation.PSCredential ($Username, (ConvertTo-SecureString $Password -AsPlainText -Force))

Send-MailMessage -From "rafael.leal@cimentoitambe.com.br" -To "emerson.duda@cimentoitambe.com.br" `
    -Subject "Assunto do E-mail" -Body "Corpo do e-mail" `
    -SmtpServer $SMTPServer -Port $SMTPPort -UseSsl -Credential $Creds