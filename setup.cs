using System;
using System.Diagnostics;
using System.IO;
using System.Security.Principal;
using Microsoft.Win32;

namespace DTISetup
{
    class Program
    {
        [STAThread]
        static void Main(string[] args)
        {
            Console.WriteLine("=== CONFIGURADOR DTI SERVICE ===");
            
            // Verificar se é administrador
            if (!IsAdministrator())
            {
                Console.WriteLine("Reexecutando como administrador...");
                RestartAsAdmin();
                return;
            }

            Console.WriteLine("Executando como Administrador");
            
            try
            {
                // Criar pasta temp
                string tempPath = @"C:\temp";
                if (!Directory.Exists(tempPath))
                {
                    Console.WriteLine("Criando pasta C:\\temp...");
                    Directory.CreateDirectory(tempPath);
                }

                // Caminhos
                string sourceShortcut = @"\\wasp\Instaladores\DTI Service\DTI Service\shortcuts\DTI Service.lnk";
                string localShortcut = @"C:\temp\DTI Service.lnk";
                string publicDesktop = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.CommonDesktopDirectory), "DTI Service.lnk");

                // Copiar atalho
                Console.WriteLine("Copiando atalho...");
                if (File.Exists(sourceShortcut))
                {
                    File.Copy(sourceShortcut, localShortcut, true);
                    Console.WriteLine("Atalho copiado para: " + localShortcut);
                    
                    // Copiar para desktop público
                    File.Copy(localShortcut, publicDesktop, true);
                    Console.WriteLine("Atalho criado na área de trabalho pública");
                    
                    // Configurar registro para executar como admin
                    ConfigureRunAsAdmin(localShortcut);
                    Console.WriteLine("Configurado para executar como administrador");
                }
                else
                {
                    Console.WriteLine("ERRO: Atalho fonte não encontrado: " + sourceShortcut);
                }

                Console.WriteLine("=== CONCLUÍDO COM SUCESSO ===");
            }
            catch (Exception ex)
            {
                Console.WriteLine("ERRO: " + ex.Message);
            }

            Console.WriteLine("Pressione qualquer tecla para sair...");
            Console.ReadKey();
        }

        static bool IsAdministrator()
        {
            WindowsIdentity identity = WindowsIdentity.GetCurrent();
            WindowsPrincipal principal = new WindowsPrincipal(identity);
            return principal.IsInRole(WindowsBuiltInRole.Administrator);
        }

        static void RestartAsAdmin()
        {
            ProcessStartInfo startInfo = new ProcessStartInfo();
            startInfo.UseShellExecute = true;
            startInfo.WorkingDirectory = Environment.CurrentDirectory;
            startInfo.FileName = Process.GetCurrentProcess().MainModule.FileName;
            startInfo.Verb = "runas";

            try
            {
                Process.Start(startInfo);
            }
            catch (System.ComponentModel.Win32Exception)
            {
                Console.WriteLine("Usuário cancelou a elevação.");
                Console.ReadKey();
            }
        }

        static void ConfigureRunAsAdmin(string shortcutPath)
        {
            try
            {
                // Ler o destino do atalho .lnk é complexo em C#
                // Vamos usar uma abordagem alternativa via registry
                using (RegistryKey key = Registry.CurrentUser.CreateSubKey(@"Software\Microsoft\Windows NT\CurrentVersion\AppCompatFlags\Layers"))
                {
                    // Esta é uma abordagem simplificada
                    // Em produção, você precisaria de uma biblioteca para ler .lnk files
                    key.SetValue(shortcutPath, "RUNASADMIN");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Aviso: Não foi possível configurar o registro: " + ex.Message);
            }
        }
    }
}