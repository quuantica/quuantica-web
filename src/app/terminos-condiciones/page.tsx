import LegalPage from '@/components/LegalPage';
import { QUUANTICA } from '@/lib/config';

export const metadata = {
  title: 'Términos y condiciones | QUUANTICA',
  description:
    'Términos y condiciones de uso de los servicios y la plataforma de QUUANTICA Servicios Tecnológicos.',
};

export default function TerminosCondicionesPage() {
  return (
    <LegalPage
      title="Términos y condiciones"
      subtitle="Condiciones generales de uso del sitio web y la plataforma de QUUANTICA Servicios Tecnológicos."
      updatedAt="10 de mayo de 2026"
    >
      <h2>1. Aceptación de los términos</h2>
      <p>
        El acceso y uso del sitio web{' '}
        <a href="https://www.quuantica.com" target="_blank" rel="noreferrer">
          www.quuantica.com
        </a>{' '}
        y de la plataforma operada por <strong>QUUANTICA Servicios Tecnológicos</strong>{' '}
        (en adelante «QUUANTICA») implica el conocimiento y aceptación expresa de los
        presentes términos y condiciones, así como de las políticas de privacidad y
        tratamiento de datos publicadas en el sitio.
      </p>

      <h2>2. Descripción del servicio</h2>
      <p>
        QUUANTICA es una plataforma tecnológica empresarial que centraliza la gestión
        del Sistema de Seguridad y Salud en el Trabajo (SG-SST), la gestión documental,
        las auditorías, las capacitaciones y otros procesos de cumplimiento normativo
        para empresas e instituciones colombianas. Los servicios pueden incluir
        funcionalidades asistidas por inteligencia artificial.
      </p>

      <h2>3. Cuenta de usuario</h2>
      <p>
        Para acceder a la plataforma, el cliente deberá registrarse y crear una cuenta
        proporcionando información veraz, exacta y actualizada. El usuario es
        responsable de mantener la confidencialidad de sus credenciales de acceso y de
        todas las actividades realizadas desde su cuenta. QUUANTICA podrá suspender o
        cancelar cuentas cuando se detecte uso indebido o suplantación.
      </p>

      <h2>4. Uso permitido y restricciones</h2>
      <p>El usuario se compromete a:</p>
      <ul>
        <li>Utilizar la plataforma exclusivamente para los fines lícitos y previstos en el contrato.</li>
        <li>No interferir con la operación normal del sistema ni intentar accesos no autorizados.</li>
        <li>No cargar contenidos ilegales, ofensivos, falsos o que vulneren derechos de terceros.</li>
        <li>No realizar ingeniería inversa, descompilación o desensamblado del software.</li>
        <li>
          Respetar los derechos de propiedad intelectual de QUUANTICA y de terceros.
        </li>
      </ul>

      <h2>5. Propiedad intelectual</h2>
      <p>
        Todos los derechos sobre el sitio web, la plataforma, el software, los diseños,
        textos, gráficos, logotipos, código fuente y demás elementos pertenecen a
        QUUANTICA Servicios Tecnológicos o a sus licenciantes. El uso de la plataforma
        no otorga al usuario ningún derecho de propiedad sobre los mismos. La marca
        «QUUANTICA» es propiedad exclusiva de QUUANTICA Servicios Tecnológicos.
      </p>
      <p>
        Los datos cargados por el cliente continúan siendo de su propiedad. QUUANTICA
        únicamente los procesa en su calidad de encargado del tratamiento, conforme a
        lo establecido en la Política de Tratamiento de Datos Personales.
      </p>

      <h2>6. Disponibilidad del servicio</h2>
      <p>
        QUUANTICA realiza esfuerzos razonables para mantener la plataforma disponible
        las 24 horas, los 7 días de la semana. No obstante, podrán presentarse
        interrupciones programadas para mantenimiento, actualizaciones o por causas
        ajenas a su control (fuerza mayor, fallas de proveedores de internet, ataques
        cibernéticos, entre otros). En lo posible, las interrupciones programadas se
        notificarán con anticipación.
      </p>

      <h2>7. Limitación de responsabilidad</h2>
      <p>
        QUUANTICA no será responsable por daños indirectos, incidentales, especiales o
        consecuenciales derivados del uso o imposibilidad de uso de la plataforma,
        incluyendo pérdida de datos, lucro cesante o interrupción del negocio, salvo
        en los casos en que la legislación aplicable disponga lo contrario.
      </p>
      <p>
        La información contenida en el sitio tiene carácter informativo y no constituye
        asesoría legal vinculante. Las recomendaciones generadas por la inteligencia
        artificial son sugerencias que deben ser validadas por el responsable
        designado por la organización cliente.
      </p>

      <h2>8. Pagos y facturación</h2>
      <p>
        Las condiciones económicas, planes de suscripción y modalidades de pago se
        establecerán en el contrato o propuesta comercial firmada entre las partes. El
        no pago oportuno facultará a QUUANTICA a suspender el servicio previa
        notificación al cliente.
      </p>

      <h2>9. Suspensión y terminación</h2>
      <p>
        QUUANTICA podrá suspender o terminar el acceso a la plataforma en caso de
        incumplimiento de estos términos, falta de pago o uso inadecuado del servicio.
        El cliente podrá terminar el servicio conforme a las condiciones pactadas en
        el contrato comercial. En caso de terminación, los datos del cliente se
        conservarán por un período razonable para permitir su descarga o migración,
        salvo solicitud expresa de eliminación.
      </p>

      <h2>10. Modificaciones</h2>
      <p>
        QUUANTICA se reserva el derecho de modificar estos términos y condiciones en
        cualquier momento. Las modificaciones serán publicadas en el sitio web y, si
        son sustanciales, se notificarán al usuario por correo electrónico. El uso
        continuado del servicio después de la publicación implica la aceptación de los
        nuevos términos.
      </p>

      <h2>11. Ley aplicable y jurisdicción</h2>
      <p>
        Estos términos se rigen por las leyes de la <strong>República de Colombia</strong>.
        Cualquier controversia será sometida a la jurisdicción de los jueces y
        tribunales competentes de la ciudad de <strong>Chía, Cundinamarca</strong>,
        renunciando las partes a cualquier otro fuero que pudiera corresponderles.
      </p>

      <h2>12. Contacto</h2>
      <p>
        Para preguntas, dudas o reclamos sobre estos términos puede comunicarse con
        nosotros a:
      </p>
      <ul>
        <li>
          <strong>Correo:</strong>{' '}
          <a href={`mailto:${QUUANTICA.contact.email}`}>{QUUANTICA.contact.email}</a>
        </li>
        <li>
          <strong>WhatsApp:</strong> {QUUANTICA.contact.whatsappDisplay}
        </li>
        <li>
          <strong>Domicilio:</strong> {QUUANTICA.contact.direccion}
        </li>
      </ul>

      <div className="legal-callout">
        <strong>Plantilla legal base:</strong> este documento es una plantilla
        profesional alineada con la legislación colombiana. Antes de su publicación
        definitiva se recomienda revisión por parte de un abogado de confianza para
        ajustar particularidades del modelo de negocio.
      </div>
    </LegalPage>
  );
}
