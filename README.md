# Desarrollo de un Sistema Web para la compra de Boletos de Cine

Villafuerte Quispe Alexander, Isasi Vargas Angie Mariella
**Correos**: [avillafuerteq@unsa.edu.pe](mailto:avillafuerteq@unsa.edu.pe), [aisasi@unsa.edu.pe](mailto:aisasi@unsa.edu.pe)

## Resumen

Los sistemas web actuales han acelerado la adopción de soluciones tecnológicas en el sector cinematográfico, impulsando la compra de boletos en línea debido a las restricciones. La preferencia creciente de los usuarios por las compras en línea subraya la demanda de conveniencia, seguridad y accesibilidad. En este contexto, proteger la seguridad de los datos se convierte en una responsabilidad crítica. Asegurar que las páginas web estén libres de vulnerabilidades es esencial para prevenir el robo de datos y mantener la confianza de los usuarios en un entorno digital cada vez más complejo.

Este artículo presenta la implementación de un Sistema Web para la compra de boletos de cine, compuesto por dos componentes principales: el backend y el frontend. El backend, desarrollado con Django y Django REST Framework, maneja la lógica de negocio, la base de datos y proporciona una API para la interacción con el frontend. El frontend, construido en Angular, gestiona la interfaz de usuario y la presentación de datos.

Los resultados obtenidos demuestran la efectividad del sistema en mejorar la eficiencia y comodidad tanto para los usuarios como para los administradores de cines. La plataforma permite a los usuarios realizar compras de boletos de manera rápida y segura, seleccionar asientos y recibir confirmaciones de pago en tiempo real. Para los administradores, el sistema facilita la gestión de funciones y ventas, optimizando la actualización de información y la administración de pagos. Esta solución no solo responde a la creciente demanda de servicios en línea, sino que también contribuye a una mejor experiencia del cliente y una operatividad interna más eficiente.

## Introducción

En el presente panorama digital, el acceso a Internet y el uso de tecnologías web han alcanzado niveles sin precedentes. Con más de 1.13 mil millones de sitios web registrados, aunque solo 200 millones están activos, la web continúa expandiéndose a un ritmo acelerado [1]. Esta tendencia se debe a la creciente demanda de servicios en línea que faciliten la vida cotidiana, permitiendo realizar una amplia gama de actividades sin necesidad de presencia física.

En el contexto del entretenimiento y, más específicamente, de los cines, la pandemia de COVID-19 ha acelerado la adopción de soluciones tecnológicas que permiten a los usuarios acceder a servicios de manera remota. Las restricciones sanitarias y el distanciamiento social han obligado a las industrias a adaptarse rápidamente, adoptando nuevas formas de interactuar con sus clientes.

Se estima que el 65% de las entradas de cine se adquieren a través de plataformas en línea, reflejando la creciente preferencia por la conveniencia y accesibilidad que estas herramientas ofrecen [2]. Estas plataformas no solo permiten a los usuarios seleccionar sus asientos preferidos y acceder a promociones exclusivas, sino que también facilitan la compra evitando largas filas y proporcionando una experiencia de usuario intuitiva. De hecho, el 73% de los consumidores citan la capacidad de evitar filas y la facilidad de uso como las principales razones para optar por la compra en línea. La integración de métodos de pago seguros y variados también juega un papel crucial en esta tendencia, ya que el 80% de los usuarios se sienten confiados al realizar transacciones digitales para sus experiencias cinematográficas [3].

No obstante, el aumento en el uso de plataformas digitales también ha elevado el riesgo de robo de datos. Según el Informe de Brechas de Datos de 2023, el 42% de las violaciones de datos están relacionadas con la exposición de información financiera debido a la falta de seguridad en plataformas de comercio electrónico [4]. Además, el 60% de las empresas que sufrieron una violación de datos informaron que el ataque comprometió información sensible de los clientes, como datos de tarjetas de crédito [5]. Estos datos subrayan la importancia de implementar medidas de seguridad robustas para proteger la información del usuario y mantener la confianza en las transacciones en línea.

Este proyecto tiene como objetivo principal desarrollar un sistema web para la compra de boletos de cine, proporcionando una plataforma eficiente y segura que permita a los usuarios navegar por el catálogo de películas, seleccionar asientos y realizar pagos en línea. Además, el sistema ofrecerá herramientas para que los administradores de los cines gestionen películas, horarios y ventas de boletos de manera optimizada, mejorando así tanto la operatividad interna como la experiencia del cliente.

## Desarrollo

### Tecnologías y Herramientas Utilizadas

**DJANGO Y DJANGO REST FRAMEWORK**
Django es un framework escrito en el lenguaje de programación Python que permite a los desarrolladores la creación de sitios web seguros y mantenibles [1]. Django promueve un desarrollo rápido y limpio. Provee una estructura de trabajo basado en el patrón MVC (Model Template View) [4][5].

Django REST Framework (DRF) es un potente y flexible conjunto de herramientas diseñado para construir interfaces de programación de aplicaciones (API) de manera fácil y rápida bajo la arquitectura REST [6].

**ANGULAR**
Angular es un framework de código abierto desarrollado por Google para crear aplicaciones web en el lado del cliente con JavaScript ejecutándose a través de Single Page Application (SPA). Angular es reconocido como un framework sólido, que implementa el patrón MVC, separando en su totalidad el modelo, la vista y el controlador [7].

**API THEMOVIEDB**
Una API es una herramienta que permite que los servicios se comuniquen mediante solicitudes y respuestas [8]. La API de la empresa TheMovieDB, proporciona acceso a una amplia variedad de datos relacionados con películas, programas de televisión, actores y productores [9].

**STRIPE**
Stripe es un procesador de pagos en línea diseñado para integrarlo directamente en la página web de una tienda online. Stripe ofrece un modo de prueba a los desarrolladores web que permite probar funciones básicas antes de pasar al modo activo en un entorno real [10].

### Arquitectura del Sistema

El sistema web está dividido en dos componentes principales: el backend y el frontend. El backend, desarrollado con Django y Django REST Framework, se encarga de la lógica del negocio, el manejo de la base de datos y la muestra de una API para que el frontend interactúe con él. El frontend, construido en Angular, maneja la interfaz del usuario, la presentación de los datos y la interacción del usuario.

**Componentes del sistema**
En el backend tenemos los siguientes:

-   **Modelo de datos**: Representan las entidades principales del sistema como usuario, películas, funciones y boletos.
-   **API**: La muestra de los endpoints (rutas) que permiten al frontend interactuar con el backend y realizar consultas.
-   **API TheMovieDB**: Uso de la API de TheMovieDB para obtener información de las películas y crear registros en la base de datos.
-   **Gestión de pagos con Stripe**: Una integración de la API de Stripe que permite procesar pagos.

En el frontend tenemos los siguientes:

-   **Vistas de películas**: Secciones que muestran la lista de películas, detalles de cada película con sus funciones y ranking de las películas más populares.
-   **Proceso de compra**: Serie de pasos que el usuario debe realizar donde selecciona butacas, cantidad de boletos y procesar el pago.
-   **Confirmación de pago**: Sección que muestra la confirmación de la compra con la opción de descargar el recibo.

### Implementación del Backend

**Modelos**
El backend tiene los modelos que representan las principales entidades del sistema:

1.  **Película**: Contiene información sobre las películas, incluyendo título, descripción, fecha de estreno, duración, director, URL del póster, número total de votos, promedio de votos, y el ID único de TheMovieDB (tmdb_id).
2.  **Función**: Representa una función específica de una película, con campos que incluyen la película, horario y sala.
3.  **Boleto**: Registra la compra de boletos para una función, asociando el boleto con un usuario, el tipo de boleto (adulto o niño), la cantidad, el monto total, la fecha de compra y un código único de compra.

**Vistas**
Las vistas en el backend se implementan utilizando Django REST Framework, que facilita la creación de la API:

1.  **PeliculaLista y PeliculaDetalle**: Proveen vistas para listar, crear, obtener, actualizar y eliminar registros de películas.
2.  **FuncionListaPorPelicula y FuncionDetallePorPelicula**: Proveen vistas para listar, crear, obtener, actualizar y eliminar funciones de una película específica.
3.  **BoletoListaRegistrar**: Permite la creación y listado de boletos. Esta vista incluye la lógica para crear usuarios si no existen y generar un código único de compra.
4.  **PeliculaListaRanking**: Devuelve una lista de películas ordenadas por su ranking, calculado en base al promedio de votos y el número total de votos.
5.  **create_checkout_session**: Crea una sesión de pago con Stripe, configurando los productos y precios, y especificando las URL de éxito y cancelación.
6.  **get_session_data**: Recupera los datos de una sesión de Stripe utilizando el ID de la sesión.
7.  **generate_pdf**: Genera un recibo de compra en formato PDF.

### Implementación del Frontend
El frontend se desarrolla en Angular, separando la lógica de la aplicación en servicios, componentes y módulos.

**Servicios**

1.  **PeliculaService**: Maneja las peticiones HTTP para la creación, actualización y eliminación de películas.
2.  **FuncionService**: Maneja las peticiones HTTP para la creación, actualización y eliminación de funciones.
3.  **BoletoService**: Maneja las peticiones HTTP para la creación y listado de boletos.
4.  **TheMovieDBService**: Maneja las peticiones HTTP a la API de TheMovieDB para obtener datos de las películas.

**Componentes**

1.  **ListaPeliculasComponent**: Muestra la lista de películas obtenida del backend.
2.  **DetallesPeliculaComponent**: Muestra los detalles de una película específica.
3.  **ListaFuncionesComponent**: Muestra las funciones de una película.
4.  **ProcesoCompraComponent**: Implementa el proceso de compra, gestionando la selección de butacas, cantidad de boletos y procesamiento de pagos con Stripe.
5.  **ConfirmacionPagoComponent**: Muestra la confirmación de la compra, permitiendo descargar el recibo.

**Integración con Stripe**
Se implementa la integración de Stripe para el procesamiento de pagos en línea. Los usuarios pueden realizar pagos utilizando diversas tarjetas de crédito y débito. La seguridad de las transacciones se garantiza mediante la encriptación de datos y la utilización de tokens seguros.

### Resultados y Conclusiones


El sistema web desarrollado para la compra de boletos de cine ha demostrado ser efectivo en mejorar la eficiencia y comodidad tanto para los usuarios como para los administradores de los cines. La plataforma permite realizar compras de boletos de manera rápida y segura, seleccionando asientos y recibiendo confirmaciones de pago en tiempo real. Para los administradores, el sistema facilita la gestión de funciones y ventas, optimizando la actualización de información y la administración de pagos.

La implementación de medidas de seguridad robustas ha sido crucial para proteger la información del usuario y mantener la confianza en las transacciones en línea. La integración con Stripe ha permitido garantizar un procesamiento de pagos seguro y confiable.

En conclusión, este proyecto responde a la creciente demanda de servicios en línea, contribuyendo a una mejor experiencia del cliente y una operatividad interna más eficiente. La arquitectura modular del sistema facilita su mantenimiento y escalabilidad, permitiendo futuras mejoras y adaptaciones a nuevas necesidades del mercado.


### Referencias

1.  Django Project. (n.d.). "What is Django?" Retrieved from [https://www.djangoproject.com/start/overview/](https://www.djangoproject.com/start/overview/)
2.  Angular. (n.d.). "Overview - Angular." Retrieved from https://angular.io/guide/what-is-angular
3.  Stripe. (n.d.). "Online Payment Processing for Internet Businesses - Stripe." Retrieved from [https://stripe.com/](https://stripe.com/)
4.  Python Software Foundation. (n.d.). "Python." Retrieved from [https://www.python.org/](https://www.python.org/)
5.  Django REST Framework. (n.d.). "Home - Django REST Framework." Retrieved from [https://www.django-rest-framework.org/](https://www.django-rest-framework.org/)
6.  The Movie Database (TMDb). (n.d.). "The Movie Database (TMDb) - API." Retrieved from https://www.themoviedb.org/documentation/api
7.  International Data Corporation. (2022). "Worldwide Web Services Market Forecast, 2022-2026." IDC.
8.  Data Breach Investigations Report. (2023). Verizon. "2023 Data Breach Investigations Report." Retrieved from https://www.verizon.com/business/resources/reports/dbir/
9.  Global Digital Overview. (2023). DataReportal. "Digital 2023: Global Overview Report." Retrieved from https://datareportal.com/reports/digital-2023-global-overview-report
10.  Cybersecurity and Infrastructure Security Agency. (2022). "Protecting Your Business Against Data Breaches." Retrieved from https://www.cisa.gov/publication/protecting-your-business-against-data-breaches

### Anexos
![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXftD6M4GVyxGe1n60pCRWr35DAs9dpNSFu0_qcBdmP17iNMS0dHjIxIT9C4GYBAzkZ21cQbkgWTOYR7XgKcD9Iocu38qdX1V0r5-rQR7Fm5VLoBoFn07t6J_zSIwG8q3dyONFqGmbfGrR-txcxOTJ3lu5E?key=X3l2eU0SJXhYBY96z6q8wQ)
Fig. 1. Página principal del proyecto


La vista de detalles de película proporciona información detallada sobre la película seleccionada, incluyendo sus funciones disponibles.
![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXekKHhYmlgunS7drUlYTae8K3w1yyrDVuc4YNoUF10pOBvIggYaMQmfh8MLvhZYg1grljTAQVZpT-DVc37Vy1Wk4a_SJzq5VChjcHncC-91f_2vcDMXV044kAkbBMa1bgoxglV2e6iUXUFrVadxLbyNSr4K?key=X3l2eU0SJXhYBY96z6q8wQ)
Fig. 2. Detalle de una película

  

El proceso de pago se realiza en varios pasos, culminando con el pago a través de Stripe.

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXfbDINRlVstNPdDp7HF79Fip4gqvpfC6bYwioT03VGk4k5wDRaB8AVIWAzgTdf-nC3glWOc5I92Zk5wH6mYw61hkqDs-ucmT7HS2FcWf4xr1aP8EH8_ZGrPYzGAZRUxyTjPz9pf4hsC8XIebYKH_6gT2k44?key=X3l2eU0SJXhYBY96z6q8wQ)
Fig. 3. Paso 1: Selección de butacas

  ![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXdTkLjen1M8uSQTnqUhB8r73kWKv1qRKIjfirTDJzkqmBYHt88S17ZtuzQS2W2UFyvitf4mvmkl01T_r6DSQ3Z-cppj4nhTKMpfMo4fklSjWvQHdgQtBywaE6_ytcaHFc74ZmU5gF2RswSyUiz2JDpts2vk?key=X3l2eU0SJXhYBY96z6q8wQ)
Fig. 4. Paso 2: Selección de boletos

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXd16ZOp6LpPB4rtH4X-q-khpki49h1_HAr61ir3WGCJ7hvgZ_lbaD1-pyqd3eFpt4GNGNkXyAhhxDXpq6AYsivtFS4V14jBOn5d3eVhobNh9HB73mds_iPzn87xjOX_YztsoJ0wuy18vGHLdcG_uqFtIq4r?key=X3l2eU0SJXhYBY96z6q8wQ)
Fig. 5. Paso 3: Pago de la compra

  

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXfRvDihz2SHg0Jt5lutJYpQR4HFkmBz1R0srTv9O0JQLi4jeqYRh_G0NucTRbcLMuKc8zdYxjGkNgcaDrQapAqus_uhDJ9XC2H1LyFJtPPV4mlWWMJG43QBGKFN_WQHj_kSFNTn7-RTLvupUnggK-1Qwc6M?key=X3l2eU0SJXhYBY96z6q8wQ)
Fig. 6. Interfaz del proceso de pago de Stripe

  

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXcCTVMYhnh6wBDlfrN51ZIqNkuKn2p16FIrpovH1Z-zwm6LR0cFN2zZxpXWZ2nqFk5SFIA_a1aFikBjP4KtJQZI_a1hq7thO75ZB-bQyyK6R4uMcbErU72Euqh-zPzUFmeD5jE5LgJCft8XzY4g77AAwuaJ?key=X3l2eU0SJXhYBY96z6q8wQ)
Fig. 7. Confirmación de la compra

  ![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXdFz0FvpbHNNQ5x-GXE7bdh9PQQiofnBZYOjxljmFu73Yvt9spxYt57hJf_6H-6dq8Fep9x5MaF_U2dTjW4aa-kn1UCxB6aWHt3_nf9GSNa9i6inlDyu98kObBnJiJSMs9UI8N2_VYtCLFrvN0riUO60H1i?key=X3l2eU0SJXhYBY96z6q8wQ)
Fig. 8. Recibo de la compra en pdf


![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXdzbEDf7nPZVvEktpOb_lu8FlbbAtRp2zAz33-RfoTB0L5Y7HCSe3fwjvYo2ggZhbU-QxGg2Oo983_SKXvFyUlzEn5iq8-7oJplwzuP_axaMESO1cfgyW9qqXeAB5tHvjQo0ERhO-zp25hyK5jEkO3jzErA?key=X3l2eU0SJXhYBY96z6q8wQ)
Fig. 9. Correo del recibo de la compra


La sección de ranking muestra las películas más populares basadas en los votos de los usuarios.
![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXfcEv9_bxP0iB5KbPZMhwuSYiIhi7KVUF1YkonVYz8_IQl3BHgyEk_JP79j1lR3CIgyse7w3YkEyiOcmqBSCLikki3K8hKnCUwVtVexrQk6qIfS94N-5-CmF5BGx1Y6vDncJaWpkKLrV5AJLpPsAljUuF_c?key=X3l2eU0SJXhYBY96z6q8wQ)
Fig. 10. Ranking de peliculas
