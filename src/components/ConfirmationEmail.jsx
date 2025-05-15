import { CheckCircle } from "lucide-react";

export default function ConfirmationEmail() {
  return (
    <div className="max-w-md mx-auto mt-24 bg-white shadow-lg rounded-2xl p-8 text-center">
      <CheckCircle className="mx-auto text-green-500" size={64} />
      <h2 className="text-3xl font-extrabold text-gray-800 mt-4 mb-2">¡Cuenta confirmada!</h2>
      <p className="text-gray-600 mb-6">
        Tu cuenta ha sido activada correctamente. Ahora puedes iniciar sesión en la plataforma.
      </p>
      <a
        href="/login"
        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        Iniciar sesión
      </a>
    </div>
  );
}
