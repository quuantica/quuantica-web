import LegalPage from '@/components/LegalPage';
import { QUUANTICA } from '@/lib/config';

export const metadata = {
  title: 'Política de tratamiento de datos personales (Ley 1581/2012) | QUUANTICA',
  description:
    'Política específica de tratamiento de datos personales de QUUANTICA Servicios Tecnológicos conforme a la Ley 1581 de 2012 y el Decreto 1377 de 2013.',
};

export default function TratamientoDatosPage() {
  return (
    <LegalPage
      title="Política de tratamiento de datos personales"
      subtitle="Documento formal en cumplimiento de la Ley 1581 de 2012 y el Decreto 1377 de 2013 — Régimen General de Protección de Datos Personales en Colombia."
      updatedAt="10 de mayo de 2026"
    >
      <h2>1. Objeto</h2>
      <p>
        La presente política tiene por objeto establecer los criterios para la
        recolección, almacenamiento, uso, circulación y supresión de los datos
        personales tratados por <strong>QUUANTICA Servicios Tecnológicos</strong> (en
        adelante «QUUANTICA»), en su calidad de responsable del tratamiento, en
        cumplimiento de la <strong>Ley 1581 de 2012</strong>, el{' '}
        <strong>Decreto 1377 de 2013</strong> y demás normas concordantes.
      </p>

      <h2>2. Identificación del responsable</h2>
      <p>
        <strong>Razón social:</strong> QUUANTICA Servicios Tecnológicos.
        <br />
        <strong>Domicilio:</strong> {QUUANTICA.contact.direccion}.
        <br />
        <strong>Correo de notificaciones:</strong>{' '}
        <a href={`mailto:${QUUANTICA.contact.email}`}>{QUUANTICA.contact.email}</a>.
        <br />
        <strong>Teléfono / WhatsApp:</strong> {QUUANTICA.contact.whatsappDisplay}.
      </p>

      <h2>3. Definiciones</h2>
      <ul>
        <li>
          <strong>Autorización:</strong> consentimiento previo, expreso e informado del
          titular para que se realice el tratamiento de sus datos.
        </li>
        <li>
          <strong>Base de datos:</strong> conjunto organizado de datos personales
          objeto de tratamiento.
        </li>
        <li>
          <strong>Dato personal:</strong> cualquier información vinculada o que pueda
          asociarse a una o varias personas naturales determinadas o determinables.
        </li>
        <li>
          <strong>Datos sensibles:</strong> aquellos que afectan la intimidad del
          titular o cuyo uso indebido puede generar discriminación (origen racial,
          orientación política, convicciones religiosas, datos de salud, datos
          biométricos, entre otros).
        </li>
        <li>
          <strong>Encargado del tratamiento:</strong> persona natural o jurídica que
          realiza el tratamiento de datos por cuenta del responsable.
        </li>
        <li>
          <strong>Responsable del tratamiento:</strong> persona natural o jurídica que
          decide sobre la base de datos y/o el tratamiento de los datos.
        </li>
        <li>
          <strong>Titular:</strong> persona natural cuyos datos personales son objeto
          de tratamiento.
        </li>
      </ul>

      <h2>4. Principios aplicables</h2>
      <p>El tratamiento de datos personales por QUUANTICA se rige por los principios de:</p>
      <ol>
        <li>Legalidad</li>
        <li>Finalidad legítima e informada al titular</li>
        <li>Libertad y consentimiento previo</li>
        <li>Veracidad o calidad de la información</li>
        <li>Transparencia</li>
        <li>Acceso y circulación restringida</li>
        <li>Seguridad técnica y administrativa</li>
        <li>Confidencialidad</li>
      </ol>

      <h2>5. Categorías de datos tratados</h2>
      <p>QUUANTICA trata las siguientes categorías de datos personales:</p>
      <ul>
        <li>Datos de identificación y contacto de clientes, prospectos y proveedores.</li>
        <li>
          Datos laborales y profesionales del personal de empresas que utilizan la
          plataforma (cargo, dependencia, sede, fecha de ingreso, EPS, ARL, AFP).
        </li>
        <li>
          Datos relacionados con seguridad y salud en el trabajo cuando son cargados
          por el cliente: exámenes médicos ocupacionales, accidentes laborales,
          ausentismos, capacitaciones, perfiles sociodemográficos.
        </li>
        <li>Datos de navegación y de uso de la plataforma.</li>
      </ul>

      <h2>6. Tratamiento de datos sensibles y de menores</h2>
      <p>
        Cuando el tratamiento involucre datos sensibles (datos de salud ocupacional,
        por ejemplo), QUUANTICA solicitará autorización expresa al titular o al
        responsable autorizado de la organización contratante. El tratamiento de datos
        de menores de edad se realiza únicamente cuando exista justificación legal y
        autorización del representante legal.
      </p>

      <h2>7. Finalidades específicas del tratamiento</h2>
      <p>Los datos personales serán tratados para:</p>
      <ol>
        <li>Ejecutar los contratos celebrados con los clientes y prestar los servicios contratados.</li>
        <li>
          Soportar la operación del Sistema de Gestión de Seguridad y Salud en el
          Trabajo (SG-SST) de las organizaciones cliente.
        </li>
        <li>Atender procesos de auditoría interna y externa.</li>
        <li>Generar reportes, estadísticas e indicadores de gestión.</li>
        <li>Cumplir con obligaciones tributarias y comerciales.</li>
        <li>
          Comunicar novedades, cambios contractuales y eventuales modificaciones a la
          plataforma.
        </li>
        <li>
          Atender requerimientos de autoridades administrativas, judiciales o de
          control.
        </li>
      </ol>

      <h2>8. Derechos del titular</h2>
      <p>De acuerdo con el artículo 8 de la Ley 1581 de 2012, el titular tiene derecho a:</p>
      <ul>
        <li>Conocer, actualizar y rectificar sus datos.</li>
        <li>Solicitar prueba de la autorización otorgada.</li>
        <li>
          Ser informado, previa solicitud, respecto del uso que se le ha dado a sus
          datos.
        </li>
        <li>
          Presentar quejas ante la Superintendencia de Industria y Comercio por
          infracciones a la Ley.
        </li>
        <li>
          Revocar la autorización y/o solicitar la supresión del dato cuando el
          tratamiento no respete los principios, derechos y garantías
          constitucionales y legales.
        </li>
        <li>Acceder en forma gratuita a sus datos personales que hayan sido tratados.</li>
      </ul>

      <h2>9. Procedimiento para consultas y reclamos</h2>
      <h3>9.1. Consultas</h3>
      <p>
        Las consultas serán atendidas en un término máximo de{' '}
        <strong>diez (10) días hábiles</strong> contados a partir de la fecha de
        recibo. Cuando no fuere posible atender la consulta dentro de dicho término,
        se informará al interesado, expresando los motivos de la demora y señalando la
        fecha en que se atenderá su consulta, la cual no podrá superar los{' '}
        <strong>cinco (5) días hábiles</strong> siguientes al vencimiento del primer
        término.
      </p>
      <h3>9.2. Reclamos</h3>
      <p>
        Los reclamos serán atendidos en un término máximo de{' '}
        <strong>quince (15) días hábiles</strong> contados a partir del día siguiente
        a la fecha de recibo. Si la cantidad de información lo amerita, este plazo
        podrá ampliarse hasta por <strong>ocho (8) días hábiles más</strong>,
        previa información al interesado.
      </p>
      <p>El reclamo deberá contener como mínimo:</p>
      <ul>
        <li>Identificación del titular.</li>
        <li>Descripción de los hechos que dan lugar al reclamo.</li>
        <li>Dirección física o electrónica para notificaciones.</li>
        <li>Documentos que se quieran hacer valer.</li>
      </ul>

      <h2>10. Mecanismos para autorizar y revocar autorización</h2>
      <p>
        El titular otorga su autorización mediante: (i) la aceptación expresa al momento
        del registro o contratación, (ii) el envío de información por correo, (iii) el
        uso de la plataforma o (iv) cualquier otro medio inequívoco de aceptación. La
        revocatoria podrá realizarse en cualquier momento, salvo que medie obligación
        legal o contractual que justifique la conservación del dato.
      </p>

      <h2>11. Vigencia de la base de datos y de la política</h2>
      <p>
        Los datos personales serán conservados durante el tiempo razonable y necesario
        para cumplir las finalidades descritas, así como las obligaciones legales
        aplicables. Esta política rige a partir de su publicación y se mantendrá vigente
        mientras QUUANTICA preste sus servicios.
      </p>

      <div className="legal-callout">
        <strong>Notificaciones, consultas y reclamos:</strong>{' '}
        <a href={`mailto:${QUUANTICA.contact.email}`}>{QUUANTICA.contact.email}</a> ·{' '}
        WhatsApp {QUUANTICA.contact.whatsappDisplay}.
      </div>
    </LegalPage>
  );
}
