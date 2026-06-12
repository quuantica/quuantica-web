import LegalPage from '@/components/LegalPage';
import { QUUANTICA } from '@/lib/config';

export const metadata = {
  title: 'Política de privacidad | QUUANTICA',
  description:
    'Política de privacidad de QUUANTICA Servicios Tecnológicos. Tratamiento de datos personales conforme a la Ley 1581 de 2012 de Colombia.',
};

export default function PoliticaPrivacidadPage() {
  return (
    <LegalPage
      title="Política de privacidad"
      subtitle="Cómo recolectamos, usamos y protegemos tu información cuando interactúas con QUUANTICA Servicios Tecnológicos."
      updatedAt="10 de mayo de 2026"
    >
      <div className="legal-callout">
        <strong>Resumen rápido:</strong> En QUUANTICA respetamos tu privacidad. Solo
        recolectamos los datos personales estrictamente necesarios para brindarte
        nuestros servicios, no los vendemos ni cedemos a terceros con fines
        comerciales, y siempre puedes solicitar acceso, corrección o eliminación de tu
        información.
      </div>

      <h2>1. Identificación del responsable del tratamiento</h2>
      <p>
        <strong>Razón social:</strong> QUUANTICA Servicios Tecnológicos.
        <br />
        <strong>Domicilio:</strong> {QUUANTICA.contact.direccion}.
        <br />
        <strong>Correo electrónico:</strong>{' '}
        <a href={`mailto:${QUUANTICA.contact.email}`}>{QUUANTICA.contact.email}</a>.
        <br />
        <strong>WhatsApp / Teléfono:</strong> {QUUANTICA.contact.whatsappDisplay}.
        <br />
        <strong>Sitio web:</strong>{' '}
        <a href="https://www.quuantica.com" target="_blank" rel="noreferrer">
          www.quuantica.com
        </a>
        .
      </p>

      <h2>2. Marco legal aplicable</h2>
      <p>
        Esta política se rige por la <strong>Ley 1581 de 2012</strong> (Régimen General
        de Protección de Datos Personales), el <strong>Decreto 1377 de 2013</strong>{' '}
        que la reglamenta, y demás normas concordantes vigentes en la República de
        Colombia.
      </p>

      <h2>3. Información que recolectamos</h2>
      <p>
        QUUANTICA puede recolectar las siguientes categorías de datos personales según
        el tipo de interacción:
      </p>
      <ul>
        <li>
          <strong>Datos de identificación:</strong> nombre, cargo, empresa, NIT y
          documento de identidad cuando aplique.
        </li>
        <li>
          <strong>Datos de contacto:</strong> correo electrónico corporativo, número
          de WhatsApp y dirección postal.
        </li>
        <li>
          <strong>Datos de navegación:</strong> dirección IP, tipo de dispositivo,
          navegador, páginas visitadas y tiempo de permanencia. Estos datos se obtienen
          mediante cookies y tecnologías similares.
        </li>
        <li>
          <strong>Datos de uso del servicio:</strong> registros de actividad dentro de
          la plataforma, configuraciones, preferencias y archivos cargados por el
          titular o por su organización.
        </li>
      </ul>

      <h2>4. Finalidades del tratamiento</h2>
      <p>Los datos recolectados se utilizan exclusivamente para las siguientes finalidades:</p>
      <ol>
        <li>Atender solicitudes de información, demos, cotizaciones y contacto comercial.</li>
        <li>Prestar los servicios contratados y brindar soporte técnico.</li>
        <li>Enviar comunicaciones operativas, alertas, recordatorios y notificaciones del sistema.</li>
        <li>Cumplir con obligaciones legales, contables y tributarias.</li>
        <li>Mejorar continuamente la plataforma y desarrollar nuevas funcionalidades.</li>
        <li>Mantener evidencia de cumplimiento normativo en materia de SG-SST y otros sistemas.</li>
        <li>Enviar comunicaciones comerciales relacionadas, siempre que el titular lo haya autorizado.</li>
      </ol>

      <h2>5. Derechos del titular</h2>
      <p>
        Como titular de los datos personales, conforme al artículo 8 de la Ley 1581 de
        2012, usted tiene derecho a:
      </p>
      <ul>
        <li>Conocer, actualizar y rectificar sus datos personales.</li>
        <li>Solicitar prueba de la autorización otorgada para el tratamiento.</li>
        <li>Ser informado sobre el uso que se ha dado a sus datos personales.</li>
        <li>
          Presentar quejas ante la Superintendencia de Industria y Comercio (SIC) por
          infracciones a la ley.
        </li>
        <li>Revocar la autorización y/o solicitar la supresión de sus datos.</li>
        <li>Acceder en forma gratuita a sus datos personales.</li>
      </ul>

      <h2>6. Procedimiento para ejercer sus derechos</h2>
      <p>
        Para ejercer cualquiera de los derechos antes mencionados, puede dirigirse a
        nosotros mediante:
      </p>
      <ul>
        <li>
          <strong>Correo electrónico:</strong>{' '}
          <a href={`mailto:${QUUANTICA.contact.email}`}>{QUUANTICA.contact.email}</a>{' '}
          con el asunto «Habeas Data – tipo de solicitud».
        </li>
        <li>
          <strong>WhatsApp:</strong> {QUUANTICA.contact.whatsappDisplay} en horario de
          lunes a viernes, 9:00 a.m. a 5:00 p.m.
        </li>
      </ul>
      <p>
        Las consultas serán atendidas en un máximo de <strong>diez (10) días hábiles</strong>;
        los reclamos en un máximo de <strong>quince (15) días hábiles</strong>, contados
        desde el día siguiente a la recepción.
      </p>

      <h2>7. Seguridad de la información</h2>
      <p>
        QUUANTICA implementa medidas técnicas, humanas y administrativas razonables
        para proteger la información personal contra adulteración, pérdida, consulta,
        uso o acceso no autorizado. Estas incluyen cifrado en tránsito (TLS), control
        de acceso por roles, copias de respaldo y monitoreo continuo de la
        infraestructura.
      </p>

      <h2>8. Transferencia y transmisión de datos</h2>
      <p>
        QUUANTICA no vende, alquila ni cede datos personales a terceros para fines
        comerciales. Únicamente se podrán transmitir datos a proveedores tecnológicos
        que actúen como encargados del tratamiento (servicios cloud, correo,
        analítica), los cuales se encuentran obligados contractualmente a respetar
        esta política y la legislación colombiana.
      </p>

      <h2>9. Cookies y tecnologías similares</h2>
      <p>
        Utilizamos cookies propias y de terceros con fines analíticos y de mejora de
        experiencia. Puedes configurar tu navegador para rechazarlas, aunque algunas
        funciones del sitio podrían no operar correctamente.
      </p>

      <h2>10. Vigencia y modificaciones</h2>
      <p>
        Esta política rige a partir de la fecha de su publicación. QUUANTICA podrá
        modificarla en cualquier momento; los cambios sustanciales serán comunicados
        oportunamente a los titulares mediante el sitio web o por correo electrónico.
      </p>

      <div className="legal-callout">
        Para consultas sobre esta política, escríbenos a{' '}
        <a href={`mailto:${QUUANTICA.contact.email}`}>{QUUANTICA.contact.email}</a>.
      </div>
    </LegalPage>
  );
}
