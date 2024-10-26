import "./globals.css";
import { AuthProvider } from './context/AuthContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
};

export default Layout;
