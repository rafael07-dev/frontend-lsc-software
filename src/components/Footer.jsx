import { Facebook, Instagram, Mail, Phone } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-100 py-10 mt-10">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Logo y descripción */}
                <div className="flex items-center md:items-center">
                    <img src="src/assets/img/logo-lsc.png" alt="Logo LSC Software" width={200} height={200} />
                    <p className="text-sm text-gray-300 font-bold leading-relaxed text-center md:text-center">
                        LSC Software desarrolla soluciones tecnológicas para una comunicación inclusiva a través del lenguaje de señas.
                    </p>
                </div>

                {/* Navegación */}
                <div className="flex flex-col items-center space-y-5 md:items-center">
                    <h3 className="text-lg font-semibold mb-2">Navegación</h3>
                    <a href="/" className="hover:text-white transition">Inicio</a>
                    <a href="#como-funciona" className="hover:text-white transition">Cómo Funciona</a>
                    <a href="#nuestra-mision" className="hover:text-white transition">Nuestra Misión</a>
                    <a href="#contacto" className="hover:text-white transition">Contacto</a>
                </div>

                {/* Contacto y redes */}
                <div className="flex flex-col items-center md:items-center space-y-5">
                    <h3 className="text-lg font-semibold mb-2">Contáctanos</h3>
                    <div className="flex items-center space-x-2 text-sm">
                        <Mail className="w-4 h-4 text-blue-400" />
                        <span>contacto@lscsoftware.com</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                        <Phone className="w-4 h-4 text-blue-400" />
                        <span>+57 320 000 0000</span>
                    </div>
                    <div className="flex space-x-4 mt-4">
                        <a href="#" aria-label="Facebook" className="hover:text-blue-500">
                            <Facebook className="w-5 h-5" />
                        </a>
                        <a href="#" aria-label="Instagram" className="hover:text-pink-500">
                            <Instagram className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
                © {new Date().getFullYear()} LSC Software. Todos los derechos reservados.
            </div>
        </footer>
    );
};

export default Footer;
