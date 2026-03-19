import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        <div className="footer-section">
          <h3>Tienda Paraguay</h3>
          <p>Productos importados desde Ciudad del Este.</p>
        </div>

        <div className="footer-section">
          <h4>Contacto</h4>
          <p>Email: contacto@tienda.com</p>
          <p>WhatsApp: +54 9 11 0000-0000</p>
        </div>

        <div className="footer-section">
          <h4>Seguinos</h4>
          <p>Instagram</p>
          <p>Facebook</p>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 Tienda Paraguay - Todos los derechos reservados
      </div>
    </footer>
  );
};

export default Footer;
