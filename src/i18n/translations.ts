import type { SupportedLang } from '../types/studio';

export interface TranslationBundle {
  seo: {
    title: string;
    description: string;
    howToName: string;
    howToSteps: { name: string; text: string }[];
  };
  nav: {
    studio: string;
    preview: string;
    guide: string;
    faq: string;
    printSummary: string;
  };
  hero: {
    h1: string;
    subtitle: string;
    privacyNotice: string;
  };
  studio: {
    tabCarousel: string;
    tabGrid: string;
    uploadTitle: string;
    uploadHint: string;
    chooseFile: string;
    samplePanorama: string;
    sampleGrid: string;
    aspectRatioLabel: string;
    ratio45: string;
    ratio11: string;
    slidesLabel: string;
    slidesUnit: string;
    gridPresetLabel: string;
    piecesUnit: string;
    formatLabel: string;
    formatPng: string;
    formatJpeg: string;
    zoomLabel: string;
    panXLabel: string;
    panYLabel: string;
    showGuides: string;
    resetFraming: string;
    dragToPanHint: string;
    sourceResLabel: string;
    sliceResLabel: string;
    compositeResLabel: string;
    piecesCountLabel: string;
    invalidFileError: string;
  };
  preview: {
    title: string;
    carouselHint: string;
    gridHint: string;
    swipeHint: string;
    prev: string;
    next: string;
    slideOf: string;
    uploadFirstBadge: string;
    uploadLastBadge: string;
    downloadSingle: string;
    downloadZip: string;
    packagingZip: string;
    zipReady: string;
    zeroWatermarkTag: string;
    renderingSlices: string;
  };
  persistence: {
    title: string;
    savedLocally: string;
    notesLabel: string;
    notesPlaceholder: string;
    exportJson: string;
    importJson: string;
    printSheet: string;
    resetDefaults: string;
    importSuccess: string;
    importError: string;
  };
  editorial: {
    heading: string;
    intro: string;
    cards: {
      title: string;
      body: string;
    }[];
    postingOrderTitle: string;
    postingOrderCarousel: string;
    postingOrderGrid: string;
    faqHeading: string;
    faqs: { q: string; a: string }[];
  };
  affiliates: {
    heading: string;
    subheading: string;
    disclosure: string;
    items: {
      category: string;
      name: string;
      spec: string;
      cta: string;
      href: string;
    }[];
  };
  print: {
    sheetTitle: string;
    generatedOn: string;
    modeLabel: string;
    tileSizeLabel: string;
    totalSlicesLabel: string;
    formatLabel: string;
    notesHeading: string;
    checklistHeading: string;
    checklistStepPrefix: string;
  };
  footer: {
    copyright: string;
    canonicalNote: string;
  };
}

export const TRANSLATIONS: Record<SupportedLang, TranslationBundle> = {
  en: {
    seo: {
      title: 'GridSplitCue — Seamless Carousel & Instagram Grid Splitter (.ZIP)',
      description:
        'Split images for Instagram seamless carousels (2–10 slides) and 3×1, 3×2, 3×3 profile grids in 4:5 (1080×1350) or 1:1 (1080×1080). Swipe preview & full-res .ZIP, 100% browser-local.',
      howToName: 'How to split an image for a seamless Instagram carousel or profile grid',
      howToSteps: [
        {
          name: 'Upload or drop your panorama',
          text: 'Drop a high-resolution PNG, JPG, or WEBP photo into the browser studio without uploading to any server.',
        },
        {
          name: 'Choose 4:5 (1080×1350) or 1:1 (1080×1080) and slice count',
          text: 'Select Seamless Carousel (2–10 slides) or Profile Grid (3×1, 3×2, 3×3) and adjust zoom and framing.',
        },
        {
          name: 'Test the swipeable preview and export .ZIP',
          text: 'Swipe through every seam in the interactive preview, then download all watermark-free slices in one ordered .ZIP archive.',
        },
      ],
    },
    nav: {
      studio: 'Splitter Studio',
      preview: 'Swipe Preview',
      guide: '4:5 & Grid Guide',
      faq: 'FAQ',
      printSummary: 'Print Spec',
    },
    hero: {
      h1: 'Seamless Instagram Carousel & Profile Grid Splitter',
      subtitle:
        'Split panoramas into 4:5 (1080×1350) or 1:1 (1080×1080) slides and 3-column profile grids with live swipe preview and full-resolution .ZIP export.',
      privacyNotice:
        '100% client-side seamless carousel and grid splitter. All image slicing and .ZIP packaging happen locally in your browser with zero watermarks and zero server uploads.',
    },
    studio: {
      tabCarousel: 'Seamless Carousel',
      tabGrid: 'Profile Grid',
      uploadTitle: 'Drop image here or click to browse',
      uploadHint: 'Supports PNG, JPG, WEBP at full resolution',
      chooseFile: 'Upload Image',
      samplePanorama: 'Sample Panorama',
      sampleGrid: 'Sample Grid',
      aspectRatioLabel: 'Slide Aspect Ratio',
      ratio45: '4:5 Portrait (1080×1350)',
      ratio11: '1:1 Square (1080×1080)',
      slidesLabel: 'Slides',
      slidesUnit: 'slides',
      gridPresetLabel: 'Grid Layout',
      piecesUnit: 'pieces',
      formatLabel: 'Export Format',
      formatPng: 'PNG (Lossless)',
      formatJpeg: 'JPEG (High Quality)',
      zoomLabel: 'Zoom',
      panXLabel: 'Horizontal Pan',
      panYLabel: 'Vertical Pan',
      showGuides: 'Cut Guides',
      resetFraming: 'Reset Framing',
      dragToPanHint: 'Drag directly on canvas to pan',
      sourceResLabel: 'Source',
      sliceResLabel: 'Per Slice',
      compositeResLabel: 'Composite',
      piecesCountLabel: 'Output',
      invalidFileError: 'Please choose a valid PNG, JPG, or WEBP image file.',
    },
    preview: {
      title: 'Interactive Swipeable Preview',
      carouselHint: 'Swipe or use arrows to verify seamless transitions before downloading.',
      gridHint: 'Profile layout mockup showing exact upload order (01 bottom-right → last top-left).',
      swipeHint: 'Drag or click arrows to swipe',
      prev: 'Previous',
      next: 'Next',
      slideOf: 'of',
      uploadFirstBadge: 'Upload 1st',
      uploadLastBadge: 'Upload Last',
      downloadSingle: 'Save Slice',
      downloadZip: 'Download Full-Res .ZIP',
      packagingZip: 'Packaging .ZIP…',
      zipReady: 'Zero watermarks · Ordered filenames',
      zeroWatermarkTag: 'Full resolution · No watermark',
      renderingSlices: 'Rendering full-resolution slices…',
    },
    persistence: {
      title: 'Workspace Preset & Notes',
      savedLocally: 'Auto-saved in browser storage',
      notesLabel: 'Caption & Posting Notes',
      notesPlaceholder: 'Write slide captions, hashtags, or posting schedule notes…',
      exportJson: 'Export JSON',
      importJson: 'Import JSON',
      printSheet: 'Print Summary',
      resetDefaults: 'Reset',
      importSuccess: 'Preset imported from JSON.',
      importError: 'Invalid JSON preset file.',
    },
    editorial: {
      heading: 'How to Build Clean Seamless Carousels & Instagram Grids',
      intro:
        'Precision aspect ratios, clean cut lines, and correct upload sequencing ensure your photography looks sharp in both the vertical feed and your 3-column profile grid.',
      cards: [
        {
          title: 'Why 4:5 (1080×1350) Outperforms 1:1 (1080×1080) in the Feed',
          body: 'A 4:5 portrait slide occupies 25% more vertical screen height on mobile devices than a 1:1 square post. More vertical presence pauses thumb scrolling longer, keeps attention on your panoramic story, and frames subjects with breathing room—while Instagram’s updated profile grid also accommodates taller 4:5 thumbnails.',
        },
        {
          title: 'Composing Panoramas & Grids Without Awkward Cuts',
          body: 'Use the live canvas cut lines to keep faces, eyes, and typography away from slice boundaries. When a subject bridges two slides intentionally—like a camera edge or architectural arch—the continuous 1080px seam pulls viewers into swiping to reveal the next frame.',
        },
        {
          title: '100% Browser-Local Privacy with Zero Compression Loss',
          body: 'Unlike cloud tools that upload your RAW exports or stamp logos onto corners, GridSplitCue draws and slices pixels exclusively inside your browser’s HTML5 Canvas memory and bundles them via JSZip.',
        },
      ],
      postingOrderTitle: 'Recommended Instagram Posting Order',
      postingOrderCarousel:
        'Seamless Carousel: Select files in numerical order (01-slide → 02-slide → …) inside Instagram’s multi-select post picker so the panorama flows continuously from left to right.',
      postingOrderGrid:
        'Profile Grid (3×1, 3×2, 3×3): Instagram places your newest upload in the top-left slot. Always publish 01-grid (bottom-right) first and finish with the highest number (top-left) so the full mosaic aligns.',
      faqHeading: 'Frequently Asked Questions',
      faqs: [
        {
          q: 'How do I split an image for an Instagram seamless carousel without watermarks?',
          a: 'Upload your panorama in Seamless Carousel mode, choose 2 to 10 slides in 4:5 (1080×1350) or 1:1 (1080×1080), test the seams in the swipeable preview, and click Download Full-Res .ZIP. Every slice exports clean with zero watermarks.',
        },
        {
          q: 'Are my photos uploaded to any server or AI service?',
          a: 'No. All image decoding, canvas slicing, preview generation, and .ZIP packaging run 100% locally in your browser. Your images never leave your device.',
        },
        {
          q: 'What resolution should my source photo be for 10 slides at 1080×1350?',
          a: 'For crisp 1:1 pixel fidelity across 4 slides at 1080×1350, aim for at least 4320×1350 px. High-resolution camera exports (6000px+ wide) preserve fine detail across 5 to 10 slides.',
        },
        {
          q: 'Should I export PNG or JPEG for Instagram?',
          a: 'Use lossless PNG when your carousel includes crisp typography, UI screenshots, or vector graphics. Use High-Quality JPEG for photography to keep file sizes fast for mobile uploading.',
        },
        {
          q: 'Why does Profile Grid number the bottom-right piece as 01?',
          a: 'Instagram adds each new post to the top-left of your 3-column grid, pushing earlier posts right and down. Uploading 01-grid (bottom-right) first and the final piece (top-left) last ensures your grid assembles properly.',
        },
      ],
    },
    affiliates: {
      heading: 'Creator Studio Essentials for Sharp Panoramic & Grid Shoots',
      subheading: 'Recommended hardware for capturing and backing up high-resolution multi-slide assets.',
      disclosure: 'Contextual hardware picks · Affiliate-ready links',
      items: [
        {
          category: 'Fast Storage',
          name: 'UHS-II SDXC / microSD V90 Cards',
          spec: '300 MB/s burst capture for wide panoramas & RAW brackets',
          cta: 'Check Spec',
          href: 'https://www.amazon.com/s?k=uhs-ii+v90+sd+card',
        },
        {
          category: 'Portable SSD',
          name: 'Rugged USB-C NVMe SSD (1TB–2TB)',
          spec: '1050+ MB/s transfer for editing 1080×1350 batches on the go',
          cta: 'View Options',
          href: 'https://www.amazon.com/s?k=portable+nvme+ssd+usb-c',
        },
        {
          category: 'Desk Lighting',
          name: 'Bi-Color CRI 97+ Desktop LED Key Light',
          spec: 'Consistent 3200K–5600K flatlay illumination without flicker',
          cta: 'Explore Gear',
          href: 'https://www.amazon.com/s?k=bi-color+desk+led+key+light',
        },
        {
          category: 'Rig & Mount',
          name: 'Overhead Boom & Travel Carbon Tripod',
          spec: 'Rock-solid framing for seamless 3×3 product flatlays',
          cta: 'Browse Mounts',
          href: 'https://www.amazon.com/s?k=overhead+camera+desk+mount+tripod',
        },
      ],
    },
    print: {
      sheetTitle: 'GridSplitCue — Production Cut & Posting Specification',
      generatedOn: 'Generated',
      modeLabel: 'Splitter Mode',
      tileSizeLabel: 'Slide / Tile Size',
      totalSlicesLabel: 'Total Pieces',
      formatLabel: 'Output Format',
      notesHeading: 'Project Notes & Captions',
      checklistHeading: 'Instagram Upload Order Checklist',
      checklistStepPrefix: 'Upload step',
    },
    footer: {
      copyright: '© GridSplitCue · bastelar.com',
      canonicalNote: '100% browser-local image processing · Zero uploads · Zero watermarks',
    },
  },

  es: {
    seo: {
      title: 'GridSplitCue — Cortar Foto para Carrusel Instagram y Cuadrícula (.ZIP)',
      description:
        'Divide fotos para carrusel sin cortes en Instagram (2 a 10 diapositivas) y cuadrícula 3×1, 3×2, 3×3 en 4:5 (1080×1350) o 1:1 (1080×1080). Vista previa deslizable y .ZIP gratis sin marcas de agua.',
      howToName: 'Cómo cortar una imagen para carrusel sin cortes o cuadrícula de Instagram',
      howToSteps: [
        {
          name: 'Sube o arrastra tu imagen panorámica',
          text: 'Arrastra una foto PNG, JPG o WEBP de alta resolución al estudio local del navegador sin subirla a ningún servidor.',
        },
        {
          name: 'Elige proporción 4:5 (1080×1350) o 1:1 (1080×1080)',
          text: 'Selecciona Carrusel Sin Cortes (2 a 10 diapositivas) o Cuadrícula de Perfil (3×1, 3×2, 3×3) y ajusta el zoom y encuadre.',
        },
        {
          name: 'Prueba la vista previa deslizable y descarga el .ZIP',
          text: 'Desliza para revisar cada unión antes de exportar y descarga todas las piezas numeradas en máxima resolución sin marcas de agua.',
        },
      ],
    },
    nav: {
      studio: 'Estudio de Corte',
      preview: 'Vista Previa',
      guide: 'Guía 4:5 y Grid',
      faq: 'Preguntas',
      printSummary: 'Imprimir Ficha',
    },
    hero: {
      h1: 'Divisor de Carrusel Sin Cortes y Cuadrícula para Instagram',
      subtitle:
        'Corta panorámicas en diapositivas 4:5 (1080×1350) o 1:1 (1080×1080) y cuadrículas de perfil 3×1, 3×2 y 3×3 con vista previa deslizable y descarga directa en .ZIP.',
      privacyNotice:
        '100% client-side seamless carousel and grid splitter. All image slicing and .ZIP packaging happen locally in your browser with zero watermarks and zero server uploads.',
    },
    studio: {
      tabCarousel: 'Carrusel Sin Cortes',
      tabGrid: 'Cuadrícula de Perfil',
      uploadTitle: 'Arrastra tu imagen aquí o haz clic para elegir',
      uploadHint: 'Compatible con PNG, JPG y WEBP en máxima resolución',
      chooseFile: 'Subir Imagen',
      samplePanorama: 'Panorámica Demo',
      sampleGrid: 'Cuadrícula Demo',
      aspectRatioLabel: 'Proporción de Diapositiva',
      ratio45: 'Vertical 4:5 (1080×1350)',
      ratio11: 'Cuadrado 1:1 (1080×1080)',
      slidesLabel: 'Diapositivas',
      slidesUnit: 'diapositivas',
      gridPresetLabel: 'Formato de Cuadrícula',
      piecesUnit: 'piezas',
      formatLabel: 'Formato de Salida',
      formatPng: 'PNG (Sin pérdida)',
      formatJpeg: 'JPEG (Alta calidad)',
      zoomLabel: 'Zoom',
      panXLabel: 'Desplazamiento Horizontal',
      panYLabel: 'Desplazamiento Vertical',
      showGuides: 'Guías de Corte',
      resetFraming: 'Restablecer Encuadre',
      dragToPanHint: 'Arrastra sobre el lienzo para encuadrar',
      sourceResLabel: 'Original',
      sliceResLabel: 'Por Pieza',
      compositeResLabel: 'Lienzo Total',
      piecesCountLabel: 'Salida',
      invalidFileError: 'Selecciona un archivo de imagen válido (PNG, JPG o WEBP).',
    },
    preview: {
      title: 'Vista Previa Interactiva Deslizable',
      carouselHint: 'Desliza o usa las flechas para revisar cada unión sin cortes antes de descargar.',
      gridHint: 'Simulación del perfil mostrando el orden exacto de subida (01 abajo-derecha → última arriba-izquierda).',
      swipeHint: 'Desliza o usa las flechas',
      prev: 'Anterior',
      next: 'Siguiente',
      slideOf: 'de',
      uploadFirstBadge: 'Subir 1.ª',
      uploadLastBadge: 'Subir Última',
      downloadSingle: 'Guardar Pieza',
      downloadZip: 'Descargar .ZIP Full-Res',
      packagingZip: 'Empaquetando .ZIP…',
      zipReady: 'Sin marcas de agua · Nombres ordenados',
      zeroWatermarkTag: 'Máxima resolución · Sin marca de agua',
      renderingSlices: 'Procesando cortes en alta resolución…',
    },
    persistence: {
      title: 'Ajustes Locales y Notas',
      savedLocally: 'Guardado automático en localStorage',
      notesLabel: 'Notas de Copy y Publicación',
      notesPlaceholder: 'Anota textos por diapositiva, hashtags o recordatorios de publicación…',
      exportJson: 'Exportar JSON',
      importJson: 'Importar JSON',
      printSheet: 'Imprimir Resumen',
      resetDefaults: 'Restablecer',
      importSuccess: 'Configuración importada desde JSON.',
      importError: 'Archivo JSON no válido.',
    },
    editorial: {
      heading: 'Guía Práctica para Carruseles Sin Cortes y Cuadrículas Limpias',
      intro:
        'Elegir la proporción correcta y respetar el orden de publicación evita recortes indeseados y maximiza la retención visual en el feed.',
      cards: [
        {
          title: 'Por qué 4:5 (1080×1350) domina frente a 1:1 (1080×1080)',
          body: 'El formato vertical 4:5 ocupa un 25 % más de altura en la pantalla del móvil que el cuadrado 1:1. Esa superficie adicional frena el scroll, da más aire a la composición y mejora el impacto visual tanto en el feed como en las miniaturas verticales de perfil.',
        },
        {
          title: 'Cómo preparar panorámicas sin cortar rostros ni textos',
          body: 'Observa las líneas divisorias sobre el lienzo en tiempo real para no partir ojos o titulares por la mitad. Cruzar deliberadamente un elemento visual entre dos diapositivas invita al usuario a deslizar para descubrir la continuación.',
        },
        {
          title: 'Privacidad 100 % local en tu navegador y cero marcas de agua',
          body: 'Todas las operaciones de recorte sobre <canvas> y el empaquetado con JSZip ocurren en la memoria de tu dispositivo. Tus fotos nunca se suben a servidores externos ni llevan logotipos añadidos.',
        },
      ],
      postingOrderTitle: 'Orden de Publicación Recomendado en Instagram',
      postingOrderCarousel:
        'Carrusel Sin Cortes: Selecciona las imágenes en orden numérico (01-slide → 02-slide → …) al crear la publicación múltiple para mantener la continuidad de izquierda a derecha.',
      postingOrderGrid:
        'Cuadrícula de Perfil (3×1, 3×2, 3×3): Cada publicación nueva aparece arriba a la izquierda. Sube primero 01-grid (abajo a la derecha) y termina con el último número (arriba a la izquierda).',
      faqHeading: 'Preguntas Frecuentes',
      faqs: [
        {
          q: '¿Cómo cortar una foto para carrusel de Instagram sin marcas de agua?',
          a: 'Carga tu foto en la pestaña Carrusel Sin Cortes, elige entre 2 y 10 diapositivas en 4:5 (1080×1350) o 1:1 (1080×1080), revisa las uniones en la vista previa deslizable y pulsa Descargar .ZIP Full-Res.',
        },
        {
          q: '¿Se suben mis imágenes a algún servidor?',
          a: 'No. Todo el procesamiento se ejecuta localmente en tu navegador mediante HTML5 Canvas y JSZip. No hay subidas ni registro.',
        },
        {
          q: '¿Qué resolución necesito para un carrusel de varias diapositivas?',
          a: 'Para 4 diapositivas en 1080×1350 sin reescalado, lo ideal es una imagen de al menos 4320×1350 px. Las fotos de cámara moderna (6000 px+) ofrecen nitidez excelente.',
        },
        {
          q: '¿Conviene exportar en PNG o JPEG?',
          a: 'Elige PNG sin pérdida si tu diseño contiene tipografía fina o gráficos planos; usa JPEG de alta calidad para fotografía con peso optimizado.',
        },
        {
          q: '¿Por qué la pieza 01 de la cuadrícula corresponde a la esquina inferior derecha?',
          a: 'Porque Instagram coloca la última foto publicada arriba a la izquierda. Publicar de 01 a 09 en orden numérico reconstruye el mosaico exacto en tu perfil.',
        },
      ],
    },
    affiliates: {
      heading: 'Equipamiento Recomendado para Creadores y Fotografía de Producto',
      subheading: 'Accesorios clave para capturar, iluminar y respaldar composiciones panorámicas en máxima calidad.',
      disclosure: 'Selección contextual de equipo · Enlaces preparados para afiliación',
      items: [
        {
          category: 'Almacenamiento',
          name: 'Tarjetas SDXC / microSD UHS-II V90',
          spec: 'Hasta 300 MB/s para ráfagas y panorámicas en RAW',
          cta: 'Ver Especificaciones',
          href: 'https://www.amazon.com/s?k=uhs-ii+v90+sd+card',
        },
        {
          category: 'SSD Portátil',
          name: 'SSD NVMe USB-C Resistente (1TB–2TB)',
          spec: 'Transferencia de 1050+ MB/s para flujos 1080×1350',
          cta: 'Ver Opciones',
          href: 'https://www.amazon.com/s?k=portable+nvme+ssd+usb-c',
        },
        {
          category: 'Iluminación LED',
          name: 'Foco LED de Escritorio Bicolor CRI 97+',
          spec: 'Luz continua 3200K–5600K sin parpadeos para flatlays',
          cta: 'Explorar Luz',
          href: 'https://www.amazon.com/s?k=bi-color+desk+led+key+light',
        },
        {
          category: 'Soportes',
          name: 'Brazo Cenital y Trípode de Carbono',
          spec: 'Encuadre estable para cuadrículas de producto 3×3',
          cta: 'Ver Soportes',
          href: 'https://www.amazon.com/s?k=overhead+camera+desk+mount+tripod',
        },
      ],
    },
    print: {
      sheetTitle: 'GridSplitCue — Ficha Técnica de Corte y Publicación',
      generatedOn: 'Generado',
      modeLabel: 'Modo de Corte',
      tileSizeLabel: 'Resolución por Pieza',
      totalSlicesLabel: 'Total de Piezas',
      formatLabel: 'Formato',
      notesHeading: 'Notas del Proyecto',
      checklistHeading: 'Lista de Orden de Subida en Instagram',
      checklistStepPrefix: 'Paso de subida',
    },
    footer: {
      copyright: '© GridSplitCue · bastelar.com',
      canonicalNote: 'Procesamiento 100 % local en tu navegador · Sin subidas · Sin marcas de agua',
    },
  },

  fr: {
    seo: {
      title: 'GridSplitCue — Découper Photo Carrousel Instagram & Grille (.ZIP)',
      description:
        'Découpez vos photos pour carrousels Instagram fluides (2 à 10 vues) et grilles 3×1, 3×2, 3×3 en 4:5 (1080×1350) ou 1:1 (1080×1080). Aperçu balayable & .ZIP sans filigrane.',
      howToName: 'Comment découper une image pour un carrousel fluide ou une grille Instagram',
      howToSteps: [
        {
          name: 'Importez votre panorama',
          text: 'Déposez une image PNG, JPG ou WEBP haute résolution directement dans votre navigateur sans envoi serveur.',
        },
        {
          name: 'Choisissez 4:5 (1080×1350) ou 1:1 (1080×1080)',
          text: 'Sélectionnez Carrousel Fluide (2–10 vues) ou Grille Profil (3×1, 3×2, 3×3) et ajustez le zoom.',
        },
        {
          name: 'Testez l’aperçu et téléchargez le .ZIP',
          text: 'Vérifiez chaque raccord dans l’aperçu interactif puis exportez toutes les vues ordonnées en .ZIP sans filigrane.',
        },
      ],
    },
    nav: {
      studio: 'Studio',
      preview: 'Aperçu',
      guide: 'Guide 4:5',
      faq: 'FAQ',
      printSummary: 'Imprimer',
    },
    hero: {
      h1: 'Découpeur de Carrousel Fluide & Grille Instagram',
      subtitle:
        'Découpez vos panoramas en vues 4:5 (1080×1350) ou 1:1 (1080×1080) et grilles de profil 3 colonnes avec aperçu balayable et export .ZIP haute résolution.',
      privacyNotice:
        '100% client-side seamless carousel and grid splitter. All image slicing and .ZIP packaging happen locally in your browser with zero watermarks and zero server uploads.',
    },
    studio: {
      tabCarousel: 'Carrousel Fluide',
      tabGrid: 'Grille de Profil',
      uploadTitle: 'Glissez votre image ici ou cliquez pour parcourir',
      uploadHint: 'PNG, JPG, WEBP en pleine résolution',
      chooseFile: 'Importer Image',
      samplePanorama: 'Panorama Démo',
      sampleGrid: 'Grille Démo',
      aspectRatioLabel: 'Format de Vue',
      ratio45: 'Portrait 4:5 (1080×1350)',
      ratio11: 'Carré 1:1 (1080×1080)',
      slidesLabel: 'Vues',
      slidesUnit: 'vues',
      gridPresetLabel: 'Disposition Grille',
      piecesUnit: 'tuiles',
      formatLabel: 'Format Export',
      formatPng: 'PNG (Sans perte)',
      formatJpeg: 'JPEG (Haute qualité)',
      zoomLabel: 'Zoom',
      panXLabel: 'Décalage Horizontal',
      panYLabel: 'Décalage Vertical',
      showGuides: 'Repères de Coupe',
      resetFraming: 'Réinitialiser',
      dragToPanHint: 'Glissez sur le canevas pour recadrer',
      sourceResLabel: 'Source',
      sliceResLabel: 'Par Vue',
      compositeResLabel: 'Total',
      piecesCountLabel: 'Sortie',
      invalidFileError: 'Veuillez choisir une image PNG, JPG ou WEBP valide.',
    },
    preview: {
      title: 'Aperçu Interactif Balayable',
      carouselHint: 'Balayez ou utilisez les flèches pour vérifier les raccords avant téléchargement.',
      gridHint: 'Aperçu du profil avec ordre de publication exact (01 en bas à droite → dernier en haut à gauche).',
      swipeHint: 'Glissez ou cliquez pour feuilleter',
      prev: 'Précédent',
      next: 'Suivant',
      slideOf: 'sur',
      uploadFirstBadge: 'Publier 1er',
      uploadLastBadge: 'Publier Dernier',
      downloadSingle: 'Enregistrer',
      downloadZip: 'Télécharger .ZIP Full-Res',
      packagingZip: 'Création du .ZIP…',
      zipReady: 'Sans filigrane · Noms ordonnés',
      zeroWatermarkTag: 'Pleine résolution · Zéro filigrane',
      renderingSlices: 'Génération des tuiles haute résolution…',
    },
    persistence: {
      title: 'Préréglages & Notes Locales',
      savedLocally: 'Enregistré automatiquement dans le navigateur',
      notesLabel: 'Notes & Légendes',
      notesPlaceholder: 'Rédigez vos légendes, hashtags ou rappels de publication…',
      exportJson: 'Exporter JSON',
      importJson: 'Importer JSON',
      printSheet: 'Imprimer Fiche',
      resetDefaults: 'Réinitialiser',
      importSuccess: 'Préréglage JSON importé.',
      importError: 'Fichier JSON invalide.',
    },
    editorial: {
      heading: 'Maîtriser les Carrousels Fluides et Grilles Instagram',
      intro:
        'Un bon ratio vertical et un ordre de publication rigoureux garantissent des transitions invisibles sur mobile.',
      cards: [
        {
          title: 'Pourquoi le 4:5 (1080×1350) surpasse le 1:1 (1080×1080)',
          body: 'Le format portrait 4:5 occupe 25 % de hauteur d’écran en plus sur mobile qu’un carré 1:1, augmentant le temps d’attention dans le fil tout en offrant plus d’espace aux compositions panoramiques.',
        },
        {
          title: 'Éviter les coupes maladroites sur les visages et titres',
          body: 'Appuyez-vous sur les repères de coupe en temps réel pour placer vos sujets importants à l’intérieur des zones sûres et utilisez les jonctions pour inciter au balayage.',
        },
        {
          title: 'Traitement 100 % local sans envoi ni filigrane',
          body: 'HTML5 Canvas et JSZip travaillent uniquement dans la mémoire de votre navigateur : aucune image ne quitte votre appareil.',
        },
      ],
      postingOrderTitle: 'Ordre de Publication Recommandé',
      postingOrderCarousel:
        'Carrousel Fluide : Sélectionnez les fichiers dans l’ordre (01-slide → 02-slide → …) lors de la création du post multi-photos.',
      postingOrderGrid:
        'Grille de Profil : Instagram place la publication la plus récente en haut à gauche. Publiez 01-grid (bas-droite) en premier et le dernier numéro en dernier.',
      faqHeading: 'Questions Fréquentes',
      faqs: [
        {
          q: 'Comment découper une photo pour un carrousel Instagram sans filigrane ?',
          a: 'Importez votre image, choisissez 2 à 10 vues en 4:5 ou 1:1, vérifiez le raccord dans l’aperçu balayable puis cliquez sur Télécharger .ZIP Full-Res.',
        },
        {
          q: 'Mes photos sont-elles envoyées sur un serveur ?',
          a: 'Non, tout s’exécute localement dans votre navigateur.',
        },
        {
          q: 'Quelle résolution source recommandez-vous ?',
          a: 'Pour 4 vues de 1080×1350 px, visez une largeur d’au moins 4320 px afin d’éviter tout flou.',
        },
        {
          q: 'PNG ou JPEG pour Instagram ?',
          a: 'PNG pour les textes et graphismes nets ; JPEG haute qualité pour la photographie.',
        },
        {
          q: 'Pourquoi la tuile 01 de la grille est-elle en bas à droite ?',
          a: 'Car chaque nouveau post pousse les précédents vers la droite et le bas. Publier de 01 à 09 reconstruit l’image complète.',
        },
      ],
    },
    affiliates: {
      heading: 'Équipement Studio Recommandé pour Créateurs',
      subheading: 'Matériel fiable pour capturer et sauvegarder vos panoramas haute définition.',
      disclosure: 'Sélection contextuelle · Liens affiliés prêts',
      items: [
        {
          category: 'Cartes Mémoire',
          name: 'Cartes SDXC / microSD UHS-II V90',
          spec: 'Jusqu’à 300 Mo/s pour rafales et panoramas RAW',
          cta: 'Voir Détails',
          href: 'https://www.amazon.com/s?k=uhs-ii+v90+sd+card',
        },
        {
          category: 'SSD Portable',
          name: 'SSD NVMe USB-C Robuste (1To–2To)',
          spec: '1050+ Mo/s pour vos séries 1080×1350',
          cta: 'Voir Options',
          href: 'https://www.amazon.com/s?k=portable+nvme+ssd+usb-c',
        },
        {
          category: 'Éclairage',
          name: 'Panneau LED Bureau Bicolore CRI 97+',
          spec: 'Éclairage continu sans scintillement 3200K–5600K',
          cta: 'Découvrir',
          href: 'https://www.amazon.com/s?k=bi-color+desk+led+key+light',
        },
        {
          category: 'Trépieds',
          name: 'Bras Plongeant & Trépied Carbone',
          spec: 'Cadrage stable pour grilles produit 3×3',
          cta: 'Voir Supports',
          href: 'https://www.amazon.com/s?k=overhead+camera+desk+mount+tripod',
        },
      ],
    },
    print: {
      sheetTitle: 'GridSplitCue — Fiche Technique de Découpe',
      generatedOn: 'Généré le',
      modeLabel: 'Mode',
      tileSizeLabel: 'Format par vue',
      totalSlicesLabel: 'Nombre de vues',
      formatLabel: 'Format fichier',
      notesHeading: 'Notes du projet',
      checklistHeading: 'Ordre de publication Instagram',
      checklistStepPrefix: 'Étape',
    },
    footer: {
      copyright: '© GridSplitCue · bastelar.com',
      canonicalNote: 'Traitement 100 % local dans le navigateur · Zéro envoi · Zéro filigrane',
    },
  },

  de: {
    seo: {
      title: 'GridSplitCue — Instagram Karussell & Grid Splitter (.ZIP)',
      description:
        'Bilder für nahtlose Instagram-Karussells (2–10 Slides) und 3×1, 3×2, 3×3 Profil-Grids in 4:5 (1080×1350) oder 1:1 (1080×1080) zuschneiden. Mit Wisch-Vorschau & .ZIP ohne Wasserzeichen.',
      howToName: 'So schneidest du ein Bild für ein nahtloses Instagram-Karussell oder Profil-Grid',
      howToSteps: [
        {
          name: 'Panorama hochladen oder ablegen',
          text: 'Ziehe ein hochauflösendes PNG-, JPG- oder WEBP-Bild direkt in das lokale Browser-Studio.',
        },
        {
          name: '4:5 (1080×1350) oder 1:1 (1080×1080) wählen',
          text: 'Wähle Nahtloses Karussell (2–10 Slides) oder Profil-Grid (3×1, 3×2, 3×3) und passe Zoom sowie Ausschnitt an.',
        },
        {
          name: 'Wisch-Vorschau prüfen & .ZIP laden',
          text: 'Prüfe alle Übergänge in der interaktiven Vorschau und lade alle Kacheln nummeriert als .ZIP herunter.',
        },
      ],
    },
    nav: {
      studio: 'Schnitt-Studio',
      preview: 'Vorschau',
      guide: '4:5 Guide',
      faq: 'FAQ',
      printSummary: 'Drucken',
    },
    hero: {
      h1: 'Nahtloser Instagram Karussell- & Grid-Splitter',
      subtitle:
        'Teile Panoramen in 4:5 (1080×1350) oder 1:1 (1080×1080) Karussell-Slides und 3-spaltige Profil-Grids mit interaktiver Wisch-Vorschau und .ZIP-Export.',
      privacyNotice:
        '100% client-side seamless carousel and grid splitter. All image slicing and .ZIP packaging happen locally in your browser with zero watermarks and zero server uploads.',
    },
    studio: {
      tabCarousel: 'Nahtloses Karussell',
      tabGrid: 'Profil-Grid',
      uploadTitle: 'Bild hier ablegen oder Datei auswählen',
      uploadHint: 'Unterstützt PNG, JPG und WEBP in voller Auflösung',
      chooseFile: 'Bild wählen',
      samplePanorama: 'Demo Panorama',
      sampleGrid: 'Demo Grid',
      aspectRatioLabel: 'Seitenverhältnis',
      ratio45: '4:5 Hochformat (1080×1350)',
      ratio11: '1:1 Quadrat (1080×1080)',
      slidesLabel: 'Slides',
      slidesUnit: 'Slides',
      gridPresetLabel: 'Grid-Raster',
      piecesUnit: 'Teile',
      formatLabel: 'Ausgabeformat',
      formatPng: 'PNG (Verlustfrei)',
      formatJpeg: 'JPEG (Hohe Qualität)',
      zoomLabel: 'Zoom',
      panXLabel: 'Horizontal verschieben',
      panYLabel: 'Vertikal verschieben',
      showGuides: 'Schnittlinien',
      resetFraming: 'Zurücksetzen',
      dragToPanHint: 'Zum Verschieben direkt auf dem Bild ziehen',
      sourceResLabel: 'Original',
      sliceResLabel: 'Pro Teil',
      compositeResLabel: 'Gesamt',
      piecesCountLabel: 'Ausgabe',
      invalidFileError: 'Bitte wähle eine gültige PNG-, JPG- oder WEBP-Datei.',
    },
    preview: {
      title: 'Interaktive Wisch-Vorschau',
      carouselHint: 'Wische oder nutze die Pfeile, um nahtlose Übergänge vor dem Download zu prüfen.',
      gridHint: 'Profil-Vorschau mit exakter Upload-Reihenfolge (01 unten rechts → letzte Kachel oben links).',
      swipeHint: 'Wischen oder Pfeile klicken',
      prev: 'Zurück',
      next: 'Weiter',
      slideOf: 'von',
      uploadFirstBadge: 'Zuerst posten',
      uploadLastBadge: 'Zuletzt posten',
      downloadSingle: 'Einzeln laden',
      downloadZip: 'Full-Res .ZIP laden',
      packagingZip: '.ZIP wird erstellt…',
      zipReady: 'Kein Wasserzeichen · Sortierte Dateinamen',
      zeroWatermarkTag: 'Volle Auflösung · Ohne Wasserzeichen',
      renderingSlices: 'Rendere volle Auflösung…',
    },
    persistence: {
      title: 'Lokale Vorgaben & Notizen',
      savedLocally: 'Automatisch im Browser gespeichert',
      notesLabel: 'Caption- & Posting-Notizen',
      notesPlaceholder: 'Captions, Hashtags oder Hinweise zur Posting-Reihenfolge…',
      exportJson: 'JSON exportieren',
      importJson: 'JSON importieren',
      printSheet: 'Übersicht drucken',
      resetDefaults: 'Zurücksetzen',
      importSuccess: 'JSON-Vorgabe geladen.',
      importError: 'Ungültige JSON-Datei.',
    },
    editorial: {
      heading: 'Leitfaden für nahtlose Karussells & saubere Profil-Grids',
      intro:
        'Das passende Hochformat und die richtige Upload-Reihenfolge sorgen für maximale Schärfe im Feed.',
      cards: [
        {
          title: 'Warum 4:5 (1080×1350) mehr Reichweite als 1:1 (1080×1080) erzielt',
          body: 'Hochformatige 4:5-Slides beanspruchen auf Smartphones 25 % mehr Bildschirmhöhe als 1:1-Quadrate und halten Betrachter länger im Fluss des Karussells.',
        },
        {
          title: 'Saubere Schnittkanten ohne zerschnittene Gesichter',
          body: 'Nutze die Echtzeit-Schnittlinien, um Text und Augen innerhalb der sicheren Bereiche zu halten und Übergänge gezielt als Wisch-Anreiz einzusetzen.',
        },
        {
          title: '100 % lokale Verarbeitung ohne Server-Upload',
          body: 'Alle Schnitte erfolgen deterministisch über HTML5 Canvas und JSZip direkt im Arbeitsspeicher deines Browsers.',
        },
      ],
      postingOrderTitle: 'Empfohlene Upload-Reihenfolge',
      postingOrderCarousel:
        'Karussell: Wähle die Dateien beim Erstellen des Karussell-Posts in numerischer Reihenfolge (01-slide → 02-slide → …).',
      postingOrderGrid:
        'Profil-Grid: Da Instagram neue Posts oben links einfügt, lade zuerst 01-grid (unten rechts) und zuletzt die höchste Nummer (oben links) hoch.',
      faqHeading: 'Häufig gestellte Fragen',
      faqs: [
        {
          q: 'Wie teile ich ein Bild ohne Wasserzeichen für ein Instagram-Karussell?',
          a: 'Bild im Karussell-Modus laden, 2–10 Slides in 4:5 oder 1:1 wählen, in der Wisch-Vorschau prüfen und Full-Res .ZIP herunterladen.',
        },
        {
          q: 'Werden meine Fotos auf einen Server hochgeladen?',
          a: 'Nein. Die gesamte Bildverarbeitung läuft lokal in deinem Browser.',
        },
        {
          q: 'Welche Auflösung sollte das Ausgangsbild haben?',
          a: 'Für 4 Slides in 1080×1350 px empfiehlt sich mindestens 4320×1350 px Breite.',
        },
        {
          q: 'PNG oder JPEG verwenden?',
          a: 'PNG für scharfe Typografie und Grafiken; JPEG für Fotos mit kompakter Dateigröße.',
        },
        {
          q: 'Warum ist Kachel 01 beim Grid unten rechts?',
          a: 'Weil neue Instagram-Beiträge immer oben links erscheinen. Durch das Hochladen von 01 bis 09 entsteht das Gesamtbild exakt.',
        },
      ],
    },
    affiliates: {
      heading: 'Empfohlenes Studio-Zubehör für Content Creator',
      subheading: 'Zuverlässige Hardware für scharfe Panoramen und schnelle Workflows.',
      disclosure: 'Kontextuelle Empfehlungen · Affiliate-Links',
      items: [
        {
          category: 'Speicher',
          name: 'UHS-II SDXC / microSD V90 Karten',
          spec: 'Bis 300 MB/s für Serienbilder und RAW-Panoramen',
          cta: 'Details ansehen',
          href: 'https://www.amazon.com/s?k=uhs-ii+v90+sd+card',
        },
        {
          category: 'Mobile SSD',
          name: 'Robuste USB-C NVMe SSD (1TB–2TB)',
          spec: '1050+ MB/s für 1080×1350 Export-Serien',
          cta: 'Optionen prüfen',
          href: 'https://www.amazon.com/s?k=portable+nvme+ssd+usb-c',
        },
        {
          category: 'Licht',
          name: 'Bi-Color Desk LED Key Light CRI 97+',
          spec: 'Flimmerfreie 3200K–5600K Beleuchtung für Flatlays',
          cta: 'Ansehen',
          href: 'https://www.amazon.com/s?k=bi-color+desk+led+key+light',
        },
        {
          category: 'Stative',
          name: 'Overhead-Galgen & Carbon-Stativ',
          spec: 'Präzise Ausrichtung für 3×3 Produkt-Grids',
          cta: 'Mehr erfahren',
          href: 'https://www.amazon.com/s?k=overhead+camera+desk+mount+tripod',
        },
      ],
    },
    print: {
      sheetTitle: 'GridSplitCue — Schnitt- & Upload-Spezifikation',
      generatedOn: 'Erstellt am',
      modeLabel: 'Modus',
      tileSizeLabel: 'Kachelgröße',
      totalSlicesLabel: 'Anzahl Teile',
      formatLabel: 'Dateiformat',
      notesHeading: 'Projektnotizen',
      checklistHeading: 'Instagram Upload-Checkliste',
      checklistStepPrefix: 'Upload-Schritt',
    },
    footer: {
      copyright: '© GridSplitCue · bastelar.com',
      canonicalNote: '100 % lokale Verarbeitung im Browser · Keine Uploads · Keine Wasserzeichen',
    },
  },

  pt: {
    seo: {
      title: 'GridSplitCue — Cortar Foto Carrossel Instagram e Grade (.ZIP)',
      description:
        'Divida imagens para carrossel contínuo no Instagram (2 a 10 slides) e grade 3×1, 3×2, 3×3 em 4:5 (1080×1350) ou 1:1 (1080×1080). Prévia deslizável e .ZIP sem marca d’água.',
      howToName: 'Como dividir uma imagem para carrossel contínuo ou grade no Instagram',
      howToSteps: [
        {
          name: 'Envie ou arraste sua imagem',
          text: 'Solte uma foto PNG, JPG ou WEBP no estúdio local do navegador sem enviar arquivos a servidores.',
        },
        {
          name: 'Defina 4:5 (1080×1350) ou 1:1 (1080×1080)',
          text: 'Escolha Carrossel Contínuo (2–10 slides) ou Grade de Perfil (3×1, 3×2, 3×3) e ajuste o zoom.',
        },
        {
          name: 'Teste a prévia deslizável e baixe o .ZIP',
          text: 'Deslize para conferir cada emenda e baixe todas as partes numeradas em .ZIP na resolução máxima.',
        },
      ],
    },
    nav: {
      studio: 'Estúdio',
      preview: 'Prévia',
      guide: 'Guia 4:5',
      faq: 'FAQ',
      printSummary: 'Imprimir',
    },
    hero: {
      h1: 'Divisor de Carrossel Contínuo e Grade para Instagram',
      subtitle:
        'Corte panoramas em slides 4:5 (1080×1350) ou 1:1 (1080×1080) e grades de perfil de 3 colunas com prévia interativa deslizável e download direto em .ZIP.',
      privacyNotice:
        '100% client-side seamless carousel and grid splitter. All image slicing and .ZIP packaging happen locally in your browser with zero watermarks and zero server uploads.',
    },
    studio: {
      tabCarousel: 'Carrossel Contínuo',
      tabGrid: 'Grade de Perfil',
      uploadTitle: 'Arraste uma imagem aqui ou clique para escolher',
      uploadHint: 'Suporta PNG, JPG e WEBP em resolução máxima',
      chooseFile: 'Escolher Imagem',
      samplePanorama: 'Panorama Exemplo',
      sampleGrid: 'Grade Exemplo',
      aspectRatioLabel: 'Proporção do Slide',
      ratio45: 'Retrato 4:5 (1080×1350)',
      ratio11: 'Quadrado 1:1 (1080×1080)',
      slidesLabel: 'Slides',
      slidesUnit: 'slides',
      gridPresetLabel: 'Layout da Grade',
      piecesUnit: 'peças',
      formatLabel: 'Formato de Saída',
      formatPng: 'PNG (Sem perdas)',
      formatJpeg: 'JPEG (Alta qualidade)',
      zoomLabel: 'Zoom',
      panXLabel: 'Ajuste Horizontal',
      panYLabel: 'Ajuste Vertical',
      showGuides: 'Linhas de Corte',
      resetFraming: 'Redefinir',
      dragToPanHint: 'Arraste na tela para reposicionar',
      sourceResLabel: 'Original',
      sliceResLabel: 'Por Peça',
      compositeResLabel: 'Total',
      piecesCountLabel: 'Saída',
      invalidFileError: 'Escolha um arquivo de imagem PNG, JPG ou WEBP válido.',
    },
    preview: {
      title: 'Prévia Interativa Deslizável',
      carouselHint: 'Deslize ou use as setas para conferir as emendas contínuas antes de baixar.',
      gridHint: 'Prévia do perfil com a ordem exata de postagem (01 inferior direito → última superior esquerdo).',
      swipeHint: 'Deslize ou clique nas setas',
      prev: 'Anterior',
      next: 'Próximo',
      slideOf: 'de',
      uploadFirstBadge: 'Postar 1.º',
      uploadLastBadge: 'Postar Último',
      downloadSingle: 'Baixar Peça',
      downloadZip: 'Baixar .ZIP Full-Res',
      packagingZip: 'Gerando .ZIP…',
      zipReady: 'Sem marca d’água · Nomes ordenados',
      zeroWatermarkTag: 'Resolução máxima · Sem marca d’água',
      renderingSlices: 'Renderizando fatias em alta resolução…',
    },
    persistence: {
      title: 'Preferências Locais e Notas',
      savedLocally: 'Salvo automaticamente no navegador',
      notesLabel: 'Notas e Legendas',
      notesPlaceholder: 'Escreva legendas, hashtags ou lembretes de publicação…',
      exportJson: 'Exportar JSON',
      importJson: 'Importar JSON',
      printSheet: 'Imprimir Resumo',
      resetDefaults: 'Restaurar',
      importSuccess: 'Configuração JSON importada.',
      importError: 'Arquivo JSON inválido.',
    },
    editorial: {
      heading: 'Como Criar Carrosséis Contínuos e Grades Perfeitas',
      intro:
        'Combinar a proporção vertical certa com linhas de corte precisas mantém seu feed profissional e envolvente.',
      cards: [
        {
          title: 'Por que 4:5 (1080×1350) supera 1:1 (1080×1080) no Feed',
          body: 'O formato retrato 4:5 ocupa 25% mais altura vertical no celular que o formato 1:1, retendo a atenção por mais tempo durante a rolagem.',
        },
        {
          title: 'Composição limpa sem cortar rostos ou títulos',
          body: 'Use as guias em tempo real para manter detalhes críticos longe da linha de corte e posicione elementos de transição para estimular o deslize.',
        },
        {
          title: 'Privacidade 100% local no navegador',
          body: 'Todo o processamento ocorre na memória do navegador com HTML5 Canvas e JSZip, sem envio de fotos nem marcas d’água.',
        },
      ],
      postingOrderTitle: 'Ordem Recomendada de Postagem',
      postingOrderCarousel:
        'Carrossel Contínuo: Selecione as imagens em ordem crescente (01-slide → 02-slide → …) ao publicar o carrossel.',
      postingOrderGrid:
        'Grade de Perfil: Como cada novo post entra no topo esquerdo, publique 01-grid (inferior direito) primeiro e termine com o maior número (topo esquerdo).',
      faqHeading: 'Perguntas Frequentes',
      faqs: [
        {
          q: 'Como dividir foto para carrossel do Instagram sem marca d’água?',
          a: 'Envie sua imagem no modo Carrossel Contínuo, escolha 2 a 10 slides em 4:5 ou 1:1, confira na prévia deslizável e baixe o .ZIP completo.',
        },
        {
          q: 'Minhas fotos são enviadas para algum servidor?',
          a: 'Não. Todo o corte e compactação .ZIP acontecem localmente no seu navegador.',
        },
        {
          q: 'Qual resolução ideal para a imagem original?',
          a: 'Para 4 slides em 1080×1350, recomenda-se largura mínima de 4320 px.',
        },
        {
          q: 'Devo escolher PNG ou JPEG?',
          a: 'PNG para textos nítidos e design gráfico; JPEG de alta qualidade para fotografias.',
        },
        {
          q: 'Por que a peça 01 da grade fica no canto inferior direito?',
          a: 'Porque o Instagram empurra as postagens antigas para a direita e para baixo conforme novas fotos são publicadas.',
        },
      ],
    },
    affiliates: {
      heading: 'Equipamentos Recomendados para Criadores',
      subheading: 'Acessórios essenciais para capturar e salvar arquivos em alta resolução.',
      disclosure: 'Seleção contextual · Links prontos para afiliados',
      items: [
        {
          category: 'Armazenamento',
          name: 'Cartões SDXC / microSD UHS-II V90',
          spec: 'Até 300 MB/s para panoramas e disparos RAW',
          cta: 'Ver Detalhes',
          href: 'https://www.amazon.com/s?k=uhs-ii+v90+sd+card',
        },
        {
          category: 'SSD Portátil',
          name: 'SSD NVMe USB-C Resistente (1TB–2TB)',
          spec: '1050+ MB/s para lotes em 1080×1350',
          cta: 'Ver Opções',
          href: 'https://www.amazon.com/s?k=portable+nvme+ssd+usb-c',
        },
        {
          category: 'Iluminação',
          name: 'Luz LED de Mesa Bicolor CRI 97+',
          spec: '3200K–5600K sem cintilação para flatlays',
          cta: 'Ver Luzes',
          href: 'https://www.amazon.com/s?k=bi-color+desk+led+key+light',
        },
        {
          category: 'Suportes',
          name: 'Braço Articulado e Tripé de Carbono',
          spec: 'Estabilidade total para grades 3×3 de produto',
          cta: 'Explorar',
          href: 'https://www.amazon.com/s?k=overhead+camera+desk+mount+tripod',
        },
      ],
    },
    print: {
      sheetTitle: 'GridSplitCue — Ficha de Corte e Publicação',
      generatedOn: 'Gerado em',
      modeLabel: 'Modo',
      tileSizeLabel: 'Tamanho da Peça',
      totalSlicesLabel: 'Total de Peças',
      formatLabel: 'Formato',
      notesHeading: 'Notas do Projeto',
      checklistHeading: 'Ordem de Postagem no Instagram',
      checklistStepPrefix: 'Passo',
    },
    footer: {
      copyright: '© GridSplitCue · bastelar.com',
      canonicalNote: 'Processamento 100% local no navegador · Zero uploads · Zero marca d’água',
    },
  },

  ar: {
    seo: {
      title: 'GridSplitCue — تقسيم الصور لكاروسيل انستقرام وشبكة البروفايل (.ZIP)',
      description:
        'قسّم الصور إلى شرائح كاروسيل متصلة (2 إلى 10 شرائح) وشبكة بروفايل 3×1، 3×2، 3×3 بمقاس 4:5 (1080×1350) أو 1:1 (1080×1080) مع معاينة سحب وتنزيل .ZIP بدون علامة مائية.',
      howToName: 'كيفية تقسيم الصورة لكاروسيل انستقرام متصل أو شبكة بروفايل',
      howToSteps: [
        {
          name: 'ارفع الصورة محلياً في المتصفح',
          text: 'اسحب صورة PNG أو JPG أو WEBP عالية الدقة إلى الاستوديو دون رفعها إلى أي خادم.',
        },
        {
          name: 'اختر مقاس 4:5 (1080×1350) أو 1:1 (1080×1080)',
          text: 'حدد وضع الكاروسيل المتصل (2–10 شرائح) أو شبكة البروفايل واضبط التكبير والمحاذاة.',
        },
        {
          name: 'راجع المعاينة التفاعلية وحمّل ملف .ZIP',
          text: 'اسحب للتحقق من تناسق الحواف ثم نزّل جميع الشرائح مرقمة بأعلى دقة بدون علامة مائية.',
        },
      ],
    },
    nav: {
      studio: 'استوديو القص',
      preview: 'معاينة السحب',
      guide: 'دليل 4:5',
      faq: 'الأسئلة',
      printSummary: 'طباعة',
    },
    hero: {
      h1: 'أداة تقسيم صور كاروسيل انستقرام المتصل وشبكة البروفايل',
      subtitle:
        'قسّم الصور البانورامية إلى شرائح 4:5 (1080×1350) أو 1:1 (1080×1080) وشبكات ثلاثية الأعمدة مع معاينة سحب تفاعلية وتنزيل مباشر بصيغة .ZIP.',
      privacyNotice:
        '100% client-side seamless carousel and grid splitter. All image slicing and .ZIP packaging happen locally in your browser with zero watermarks and zero server uploads.',
    },
    studio: {
      tabCarousel: 'كاروسيل متصل',
      tabGrid: 'شبكة البروفايل',
      uploadTitle: 'اسحب الصورة هنا أو انقر للاختيار',
      uploadHint: 'يدعم PNG و JPG و WEBP بأعلى دقة',
      chooseFile: 'اختر صورة',
      samplePanorama: 'نموذج بانوراما',
      sampleGrid: 'نموذج شبكة',
      aspectRatioLabel: 'نسبة الشريحة',
      ratio45: 'عمودي 4:5 (1080×1350)',
      ratio11: 'مربع 1:1 (1080×1080)',
      slidesLabel: 'الشرائح',
      slidesUnit: 'شرائح',
      gridPresetLabel: 'تخطيط الشبكة',
      piecesUnit: 'قطع',
      formatLabel: 'صيغة التصدير',
      formatPng: 'PNG (بدون فقدان)',
      formatJpeg: 'JPEG (جودة عالية)',
      zoomLabel: 'التكبير',
      panXLabel: 'إزاحة أفقية',
      panYLabel: 'إزاحة رأسية',
      showGuides: 'خطوط القص',
      resetFraming: 'إعادة ضبط',
      dragToPanHint: 'اسحب مباشرة على الصورة للتحريك',
      sourceResLabel: 'الأصل',
      sliceResLabel: 'لكل شريحة',
      compositeResLabel: 'الإجمالي',
      piecesCountLabel: 'المخرجات',
      invalidFileError: 'يرجى اختيار ملف صورة صالح بصيغة PNG أو JPG أو WEBP.',
    },
    preview: {
      title: 'معاينة تفاعلية بالسحب قبل التنزيل',
      carouselHint: 'اسحب أو استخدم الأسهم للتأكد من اتصال الحواف بسلاسة.',
      gridHint: 'محاكاة البروفايل مع ترتيب النشر الصحيح (01 أسفل اليمين ← الأخيرة أعلى اليسار).',
      swipeHint: 'اسحب أو استخدم الأسهم',
      prev: 'السابق',
      next: 'التالي',
      slideOf: 'من',
      uploadFirstBadge: 'يُنشر أولاً',
      uploadLastBadge: 'يُنشر أخيراً',
      downloadSingle: 'حفظ القطعة',
      downloadZip: 'تنزيل .ZIP بأعلى دقة',
      packagingZip: 'جاري تجهيز .ZIP…',
      zipReady: 'بدون علامة مائية · أسماء مرتبة',
      zeroWatermarkTag: 'دقة كاملة · بدون علامة مائية',
      renderingSlices: 'جاري تجهيز الشرائح عالية الدقة…',
    },
    persistence: {
      title: 'الإعدادات المحلية والملاحظات',
      savedLocally: 'محفوظ تلقائياً في المتصفح',
      notesLabel: 'ملاحظات النشر والوصف',
      notesPlaceholder: 'اكتب نصوص الشرائح أو الوسوم أو ملاحظات التوقيت…',
      exportJson: 'تصدير JSON',
      importJson: 'استيراد JSON',
      printSheet: 'طباعة الملخص',
      resetDefaults: 'إعادة تعيين',
      importSuccess: 'تم استيراد الإعدادات بنجاح.',
      importError: 'ملف JSON غير صالح.',
    },
    editorial: {
      heading: 'دليل تصميم كاروسيل متصل وشبكة انستقرام احترافية',
      intro:
        'اختيار الأبعاد العمودية الدقيقة والالتزام بترتيب الرفع يضمنان ظهوراً متناسقاً وجذاباً في الخلاصة.',
      cards: [
        {
          title: 'لماذا يتفوق مقاس 4:5 (1080×1350) على 1:1 (1080×1080)',
          body: 'يشغل المقاس العمودي 4:5 مساحة أكبر بنسبة 25% على شاشات الهواتف، مما يبطئ التمرير ويزيد تفاعل المتابعين مع التفاصيل البانورامية.',
        },
        {
          title: 'تنسيق الصورة بدون قطع الوجوه أو النصوص',
          body: 'راقب خطوط القص الفورية لإبقاء النصوص والعناصر المهمة بعيدة عن الفواصل مع ترك عناصر ممتدة تحفز التمرير.',
        },
        {
          title: 'خصوصية 100% محلياً في المتصفح',
          body: 'تتم كل عمليات المعالجة عبر HTML5 Canvas وتجميع .ZIP عبر JSZip داخل جهازك فقط دون رفع أي ملف.',
        },
      ],
      postingOrderTitle: 'ترتيب النشر الموصى به في انستقرام',
      postingOrderCarousel:
        'الكاروسيل المتصل: اختر الصور بالترتيب الرقمي (01-slide ثم 02-slide…) عند إنشاء منشور متعدد الصور.',
      postingOrderGrid:
        'شبكة البروفايل: يضع انستقرام أحدث منشور في أعلى اليسار، لذا ارفع 01-grid (أسفل اليمين) أولاً وانتهِ بالرقم الأخير (أعلى اليسار).',
      faqHeading: 'الأسئلة الشائعة',
      faqs: [
        {
          q: 'كيف أقسم صورة لكاروسيل انستقرام بدون علامة مائية؟',
          a: 'ارفع صورتك في تبويب الكاروسيل المتصل، حدد من 2 إلى 10 شرائح بمقاس 4:5 أو 1:1، راجع المعاينة ثم حمّل ملف .ZIP.',
        },
        {
          q: 'هل يتم رفع صوري إلى أي خادم؟',
          a: 'لا، جميع العمليات تتم محلياً بالكامل داخل متصفحك.',
        },
        {
          q: 'ما الدقة المناسبة للصورة الأصلية؟',
          a: 'للحصول على 4 شرائح بمقاس 1080×1350، يُفضل عرض لا يقل عن 4320 بكسل.',
        },
        {
          q: 'هل أختار PNG أم JPEG؟',
          a: 'PNG للنصوص والتصاميم الدقيقة، وJPEG عالية الجودة للصور الفوتوغرافية.',
        },
        {
          q: 'لماذا تحمل القطعة السفلية اليمنى الرقم 01 في الشبكة؟',
          a: 'لأن كل منشور جديد يدفع المنشورات السابقة نحو اليمين والأسفل، فيكتمل الشكل عند النشر بالترتيب.',
        },
      ],
    },
    affiliates: {
      heading: 'معدات مقترحة لصناع المحتوى والتصوير',
      subheading: 'أدوات عملية لالتقاط وتخزين الصور البانورامية عالية الدقة.',
      disclosure: 'ترشيحات سياقية · روابط جاهزة للتسويق بالعمولة',
      items: [
        {
          category: 'تخزين سريع',
          name: 'بطاقات UHS-II SDXC / microSD V90',
          spec: 'سرعة تصل إلى 300 ميجابايت/ث للتصوير البانورامي',
          cta: 'عرض المواصفات',
          href: 'https://www.amazon.com/s?k=uhs-ii+v90+sd+card',
        },
        {
          category: 'قرص SSD محمول',
          name: 'قرص NVMe USB-C متين (1–2 تيرابايت)',
          spec: 'نقل 1050+ ميجابايت/ث لملفات 1080×1350',
          cta: 'عرض الخيارات',
          href: 'https://www.amazon.com/s?k=portable+nvme+ssd+usb-c',
        },
        {
          category: 'إضاءة مكتبية',
          name: 'إضاءة LED ثنائية اللون CRI 97+',
          spec: 'إضاءة ثابتة بدون وميض لتصوير المنتجات',
          cta: 'استكشاف',
          href: 'https://www.amazon.com/s?k=bi-color+desk+led+key+light',
        },
        {
          category: 'حوامل وتثبيت',
          name: 'ذراع علوي وحامل كربون ثلاثي',
          spec: 'تثبيت دقيق لتصوير شبكات 3×3',
          cta: 'تصفح الحوامل',
          href: 'https://www.amazon.com/s?k=overhead+camera+desk+mount+tripod',
        },
      ],
    },
    print: {
      sheetTitle: 'GridSplitCue — ورقة مواصفات القص والنشر',
      generatedOn: 'تاريخ الإنشاء',
      modeLabel: 'الوضع',
      tileSizeLabel: 'مقاس الشريحة',
      totalSlicesLabel: 'عدد القطع',
      formatLabel: 'الصيغة',
      notesHeading: 'ملاحظات المشروع',
      checklistHeading: 'قائمة ترتيب الرفع على انستقرام',
      checklistStepPrefix: 'خطوة الرفع',
    },
    footer: {
      copyright: '© GridSplitCue · bastelar.com',
      canonicalNote: 'معالجة محلية 100% في المتصفح · بدون رفع · بدون علامة مائية',
    },
  },

  hi: {
    seo: {
      title: 'GridSplitCue — इंस्टाग्राम कैरोसेल और ग्रिड स्प्लिटर (.ZIP)',
      description:
        'बिना वॉटरमार्क 4:5 (1080×1350) या 1:1 (1080×1080) में सीमलेस इंस्टाग्राम कैरोसेल (2–10 स्लाइड) और 3×1, 3×2, 3×3 प्रोफ़ाइल ग्रिड बनाएं। स्वाइप प्रीव्यू और तुरंत .ZIP डाउनलोड।',
      howToName: 'इंस्टाग्राम सीमलेस कैरोसेल या ग्रिड के लिए इमेज कैसे काटें',
      howToSteps: [
        {
          name: 'अपनी पैनोरमा इमेज चुनें',
          text: 'हाई-रेज़ॉल्यूशन PNG, JPG या WEBP इमेज सीधे ब्राउज़र स्टूडियो में ड्रॉप करें।',
        },
        {
          name: '4:5 (1080×1350) या 1:1 (1080×1080) चुनें',
          text: 'कैरोसेल स्लाइड (2–10) या प्रोफ़ाइल ग्रिड (3×1, 3×2, 3×3) चुनें और ज़ूम एडजस्ट करें।',
        },
        {
          name: 'स्वाइप प्रीव्यू देखें और .ZIP डाउनलोड करें',
          text: 'कट लाइनों की जांच करें और बिना वॉटरमार्क सभी फाइलें एक .ZIP में सेव करें।',
        },
      ],
    },
    nav: {
      studio: 'स्प्लिटर स्टूडियो',
      preview: 'स्वाइप प्रीव्यू',
      guide: '4:5 गाइड',
      faq: 'FAQ',
      printSummary: 'प्रिंट',
    },
    hero: {
      h1: 'सीमलेस इंस्टाग्राम कैरोसेल और प्रोफ़ाइल ग्रिड स्प्लिटर',
      subtitle:
        'पैनोरमा फ़ोटो को 4:5 (1080×1350) या 1:1 (1080×1080) स्लाइड और 3-कॉलम ग्रिड में विभाजित करें — स्वाइप प्रीव्यू और फुल-रेज़ॉल्यूशन .ZIP के साथ।',
      privacyNotice:
        '100% client-side seamless carousel and grid splitter. All image slicing and .ZIP packaging happen locally in your browser with zero watermarks and zero server uploads.',
    },
    studio: {
      tabCarousel: 'सीमलेस कैरोसेल',
      tabGrid: 'प्रोफ़ाइल ग्रिड',
      uploadTitle: 'इमेज यहाँ ड्रॉप करें या चुनने के लिए क्लिक करें',
      uploadHint: 'PNG, JPG और WEBP फुल रेज़ॉल्यूशन सपोर्ट',
      chooseFile: 'इमेज अपलोड करें',
      samplePanorama: 'सैंपल पैनोरमा',
      sampleGrid: 'सैंपल ग्रिड',
      aspectRatioLabel: 'स्लाइड अनुपात',
      ratio45: '4:5 पोर्ट्रेट (1080×1350)',
      ratio11: '1:1 स्क्वायर (1080×1080)',
      slidesLabel: 'स्लाइड्स',
      slidesUnit: 'स्लाइड्स',
      gridPresetLabel: 'ग्रिड लेआउट',
      piecesUnit: 'टुकड़े',
      formatLabel: 'आउटपुट फ़ॉर्मेट',
      formatPng: 'PNG (लॉसलेस)',
      formatJpeg: 'JPEG (हाई क्वालिटी)',
      zoomLabel: 'ज़ूम',
      panXLabel: 'हॉरिज़ॉन्टल पैन',
      panYLabel: 'वर्टिकल पैन',
      showGuides: 'कट गाइड्स',
      resetFraming: 'रीसेट फ्रेम',
      dragToPanHint: 'पैन करने के लिए कैनवास पर ड्रैग करें',
      sourceResLabel: 'मूल आकार',
      sliceResLabel: 'प्रति स्लाइड',
      compositeResLabel: 'कुल आकार',
      piecesCountLabel: 'आउटपुट',
      invalidFileError: 'कृपया एक मान्य PNG, JPG या WEBP इमेज चुनें।',
    },
    preview: {
      title: 'इंटरैक्टिव स्वाइप प्रीव्यू',
      carouselHint: 'डाउनलोड से पहले हर जोड़ की जांच करने के लिए स्वाइप करें।',
      gridHint: 'सही पोस्टिंग क्रम दिखाने वाला प्रोफ़ाइल प्रीव्यू (01 नीचे-दाएं → अंतिम ऊपर-बाएं)।',
      swipeHint: 'स्वाइप करें या तीर दबाएं',
      prev: 'पिछला',
      next: 'अगला',
      slideOf: '/',
      uploadFirstBadge: 'पहले पोस्ट करें',
      uploadLastBadge: 'अंत में पोस्ट करें',
      downloadSingle: 'स्लाइड सेव करें',
      downloadZip: 'फुल-रेज़ .ZIP डाउनलोड करें',
      packagingZip: '.ZIP तैयार हो रहा है…',
      zipReady: 'जीरो वॉटरमार्क · क्रमबद्ध नाम',
      zeroWatermarkTag: 'फुल रेज़ॉल्यूशन · बिना वॉटरमार्क',
      renderingSlices: 'हाई-रेज़ॉल्यूशन स्लाइस बन रहे हैं…',
    },
    persistence: {
      title: 'लोकल सेटिंग्स और नोट्स',
      savedLocally: 'ब्राउज़र में स्वतः सहेजा गया',
      notesLabel: 'कैप्शन और पोस्टिंग नोट्स',
      notesPlaceholder: 'स्लाइड कैप्शन, हैशटैग या शेड्यूल नोट्स लिखें…',
      exportJson: 'JSON एक्सपोर्ट',
      importJson: 'JSON इम्पोर्ट',
      printSheet: 'प्रिंट सारांश',
      resetDefaults: 'रीसेट',
      importSuccess: 'JSON प्रीसेट लोड हो गया।',
      importError: 'अमान्य JSON फ़ाइल।',
    },
    editorial: {
      heading: 'साफ़ सीमलेस कैरोसेल और ग्रिड बनाने की गाइड',
      intro:
        'सही वर्टिकल अनुपात और पोस्टिंग क्रम आपकी फ़ोटोग्राफ़ी को फ़ीड में सबसे अलग दिखाते हैं।',
      cards: [
        {
          title: '4:5 (1080×1350) क्यों 1:1 (1080×1080) से बेहतर प्रदर्शन करता है',
          body: '4:5 पोर्ट्रेट मोबाइल स्क्रीन पर 25% अधिक ऊंचाई घेरता है, जिससे व्यूअर्स स्क्रॉल रोककर अगली स्लाइड स्वाइप करते हैं।',
        },
        {
          title: 'चेहरों और टेक्स्ट को कटने से कैसे बचाएं',
          body: 'लाइव कट गाइड लाइनों से महत्वपूर्ण टेक्स्ट को सुरक्षित क्षेत्र में रखें और सीमाओं पर निरंतर डिज़ाइन जोड़ें।',
        },
        {
          title: '100% ब्राउज़र-लोकल प्राइवेसी',
          body: 'HTML5 Canvas और JSZip पूरी तरह आपके डिवाइस में चलते हैं—कोई सर्वर अपलोड या वॉटरमार्क नहीं।',
        },
      ],
      postingOrderTitle: 'अनुशंसित इंस्टाग्राम पोस्टिंग क्रम',
      postingOrderCarousel:
        'कैरोसेल: मल्टी-पोस्ट में 01-slide से शुरू करते हुए क्रमशः सभी स्लाइड चुनें।',
      postingOrderGrid:
        'प्रोफ़ाइल ग्रिड: सबसे पहले 01-grid (नीचे-दाएं) पोस्ट करें और अंत में सबसे बड़ा नंबर (ऊपर-बाएं) अपलोड करें।',
      faqHeading: 'अक्सर पूछे जाने वाले प्रश्न',
      faqs: [
        {
          q: 'बिना वॉटरमार्क इंस्टाग्राम कैरोसेल के लिए फोटो कैसे काटें?',
          a: 'इमेज अपलोड करें, 2–10 स्लाइड्स और 4:5 या 1:1 चुनें, प्रीव्यू जांचें और .ZIP डाउनलोड करें।',
        },
        {
          q: 'क्या मेरी फ़ोटो किसी सर्वर पर अपलोड होती है?',
          a: 'नहीं, सब कुछ 100% आपके ब्राउज़र के भीतर प्रोसेस होता है।',
        },
        {
          q: '4 स्लाइड के लिए कितनी रेज़ॉल्यूशन चाहिए?',
          a: '1080×1350 की 4 स्लाइड्स के लिए कम से कम 4320×1350 px इमेज सर्वोत्तम है।',
        },
        {
          q: 'PNG या JPEG में से क्या चुनें?',
          a: 'शार्प टेक्स्ट के लिए PNG और फ़ोटोग्राफ़ी के लिए उच्च गुणवत्ता वाला JPEG चुनें।',
        },
        {
          q: 'ग्रिड में 01 नंबर नीचे-दाएं क्यों होता है?',
          a: 'क्योंकि इंस्टाग्राम हर नई पोस्ट को ऊपर-बाएं जोड़ता है और पुरानी पोस्ट को आगे खिसकाता है।',
        },
      ],
    },
    affiliates: {
      heading: 'कंटेंट क्रिएटर्स के लिए ज़रूरी स्टूडियो गियर',
      subheading: 'हाई-रेज़ॉल्यूशन शूट और बैकअप के लिए उपयोगी उपकरण।',
      disclosure: 'संदर्भित सुझाव · एफिलिएट-रेडी लिंक',
      items: [
        {
          category: 'तेज़ स्टोरेज',
          name: 'UHS-II SDXC / microSD V90 कार्ड',
          spec: 'RAW पैनोरमा के लिए 300 MB/s तक स्पीड',
          cta: 'विवरण देखें',
          href: 'https://www.amazon.com/s?k=uhs-ii+v90+sd+card',
        },
        {
          category: 'पोर्टेबल SSD',
          name: 'USB-C NVMe SSD (1TB–2TB)',
          spec: '1080×1350 बैच के लिए 1050+ MB/s ट्रांसफ़र',
          cta: 'विकल्प देखें',
          href: 'https://www.amazon.com/s?k=portable+nvme+ssd+usb-c',
        },
        {
          category: 'लाइटिंग',
          name: 'बाय-कलर डेस्क LED की लाइट CRI 97+',
          spec: 'फ्लिकर-फ्री 3200K–5600K फ्लैटले लाइटिंग',
          cta: 'गियर देखें',
          href: 'https://www.amazon.com/s?k=bi-color+desk+led+key+light',
        },
        {
          category: 'माउंट्स',
          name: 'ओवरहेड बूम और कार्बन ट्राइपॉड',
          spec: '3×3 प्रोडक्ट ग्रिड के लिए स्थिर फ्रेमिंग',
          cta: 'माउंट देखें',
          href: 'https://www.amazon.com/s?k=overhead+camera+desk+mount+tripod',
        },
      ],
    },
    print: {
      sheetTitle: 'GridSplitCue — कट और पोस्टिंग स्पेसिफिकेशन',
      generatedOn: 'तैयार तिथि',
      modeLabel: 'मोड',
      tileSizeLabel: 'स्लाइड आकार',
      totalSlicesLabel: 'कुल टुकड़े',
      formatLabel: 'फ़ॉर्मेट',
      notesHeading: 'प्रोजेक्ट नोट्स',
      checklistHeading: 'इंस्टाग्राम अपलोड क्रम सूची',
      checklistStepPrefix: 'अपलोड चरण',
    },
    footer: {
      copyright: '© GridSplitCue · bastelar.com',
      canonicalNote: '100% ब्राउज़र-लोकल प्रोसेसिंग · कोई अपलोड नहीं · कोई वॉटरमार्क नहीं',
    },
  },

  ru: {
    seo: {
      title: 'GridSplitCue — Нарезка Карусели и Сетки Instagram (.ZIP)',
      description:
        'Разрезайте фото для бесшовных каруселей Instagram (2–10 слайдов) и сеток 3×1, 3×2, 3×3 в формате 4:5 (1080×1350) или 1:1 (1080×1080). Предпросмотр свайпом и .ZIP без водяных знаков.',
      howToName: 'Как разрезать фото для бесшовной карусели или сетки профиля Instagram',
      howToSteps: [
        {
          name: 'Загрузите панораму в браузер',
          text: 'Перетащите PNG, JPG или WEBP высокого разрешения в студию — файлы не отправляются на сервер.',
        },
        {
          name: 'Выберите 4:5 (1080×1350) или 1:1 (1080×1080)',
          text: 'Укажите режим карусели (2–10 слайдов) или сетки (3×1, 3×2, 3×3) и настройте зум.',
        },
        {
          name: 'Проверьте свайпом и скачайте .ZIP',
          text: 'Пролистайте стыки в интерактивном предпросмотре и скачайте готовый .ZIP без водяных знаков.',
        },
      ],
    },
    nav: {
      studio: 'Студия',
      preview: 'Предпросмотр',
      guide: 'Гайд 4:5',
      faq: 'Вопросы',
      printSummary: 'Печать',
    },
    hero: {
      h1: 'Нарезка Бесшовных Каруселей и Сеток для Instagram',
      subtitle:
        'Делите панорамы на слайды 4:5 (1080×1350) или 1:1 (1080×1080) и 3-колоночные сетки профиля с интерактивным свайп-превью и выгрузкой в .ZIP.',
      privacyNotice:
        '100% client-side seamless carousel and grid splitter. All image slicing and .ZIP packaging happen locally in your browser with zero watermarks and zero server uploads.',
    },
    studio: {
      tabCarousel: 'Бесшовная карусель',
      tabGrid: 'Сетка профиля',
      uploadTitle: 'Перетащите изображение или нажмите для выбора',
      uploadHint: 'Поддержка PNG, JPG и WEBP в полном разрешении',
      chooseFile: 'Выбрать фото',
      samplePanorama: 'Пример панорамы',
      sampleGrid: 'Пример сетки',
      aspectRatioLabel: 'Формат слайда',
      ratio45: 'Портрет 4:5 (1080×1350)',
      ratio11: 'Квадрат 1:1 (1080×1080)',
      slidesLabel: 'Слайды',
      slidesUnit: 'сл.',
      gridPresetLabel: 'Сетка',
      piecesUnit: 'частей',
      formatLabel: 'Формат файла',
      formatPng: 'PNG (Без потерь)',
      formatJpeg: 'JPEG (Высокое качество)',
      zoomLabel: 'Масштаб',
      panXLabel: 'Сдвиг по горизонтали',
      panYLabel: 'Сдвиг по вертикали',
      showGuides: 'Линии реза',
      resetFraming: 'Сбросить кадр',
      dragToPanHint: 'Перетаскивайте прямо по холсту',
      sourceResLabel: 'Исходник',
      sliceResLabel: 'Слайд',
      compositeResLabel: 'Общий холст',
      piecesCountLabel: 'Файлов',
      invalidFileError: 'Выберите корректное изображение PNG, JPG или WEBP.',
    },
    preview: {
      title: 'Интерактивный Свайп-Предпросмотр',
      carouselHint: 'Листайте свайпом или стрелками, чтобы проверить бесшовные стыки перед скачиванием.',
      gridHint: 'Макет профиля с точным порядком публикации (01 правый нижний → последний левый верхний).',
      swipeHint: 'Свайп или стрелки для просмотра',
      prev: 'Назад',
      next: 'Вперёд',
      slideOf: 'из',
      uploadFirstBadge: 'Первым',
      uploadLastBadge: 'Последним',
      downloadSingle: 'Скачать часть',
      downloadZip: 'Скачать Full-Res .ZIP',
      packagingZip: 'Сборка .ZIP…',
      zipReady: 'Без водяных знаков · Нумерация',
      zeroWatermarkTag: 'Полное разрешение · Без знаков',
      renderingSlices: 'Рендеринг фрагментов…',
    },
    persistence: {
      title: 'Локальные настройки и заметки',
      savedLocally: 'Автосохранение в localStorage',
      notesLabel: 'Заметки и подписи к постам',
      notesPlaceholder: 'Добавьте тексты слайдов, хэштеги или план публикаций…',
      exportJson: 'Экспорт JSON',
      importJson: 'Импорт JSON',
      printSheet: 'Печать плана',
      resetDefaults: 'Сброс',
      importSuccess: 'Настройки JSON загружены.',
      importError: 'Некорректный JSON-файл.',
    },
    editorial: {
      heading: 'Как делать идеальные бесшовные карусели и сетки',
      intro:
        'Правильные пропорции кадра и точный порядок загрузки сохраняют целостность композиции в ленте и профиле.',
      cards: [
        {
          title: 'Почему 4:5 (1080×1350) эффективнее 1:1 (1080×1080)',
          body: 'Вертикальный формат 4:5 занимает на 25% больше высоты экрана смартфона, сильнее удерживая внимание при пролистывании ленты.',
        },
        {
          title: 'Чистые границы без обрезанных лиц и текста',
          body: 'Следите за линиями реза в реальном времени, оставляя заголовки и глаза в безопасной зоне, а переходные детали — на стыке слайдов.',
        },
        {
          title: '100% локально в браузере без водяных знаков',
          body: 'Нарезка через HTML5 Canvas и упаковка в JSZip выполняются исключительно на вашем устройстве.',
        },
      ],
      postingOrderTitle: 'Порядок публикации в Instagram',
      postingOrderCarousel:
        'Карусель: Выберите файлы по порядку (01-slide → 02-slide → …) при создании публикации с несколькими фото.',
      postingOrderGrid:
        'Сетка профиля: Новые посты появляются в левом верхнем углу. Всегда загружайте 01-grid (правый нижний) первым, а последний номер — последним.',
      faqHeading: 'Частые вопросы',
      faqs: [
        {
          q: 'Как разрезать фото для карусели Instagram без водяных знаков?',
          a: 'Загрузите снимок, выберите 2–10 слайдов в 4:5 или 1:1, проверьте стыки свайпом и нажмите «Скачать Full-Res .ZIP».',
        },
        {
          q: 'Отправляются ли фото на сервер?',
          a: 'Нет, всё происходит локально в памяти вашего браузера.',
        },
        {
          q: 'Какое разрешение нужно для 4 слайдов 1080×1350?',
          a: 'Оптимально от 4320×1350 пикселей и выше для максимальной чёткости.',
        },
        {
          q: 'Что лучше: PNG или JPEG?',
          a: 'PNG для графики и шрифтов, JPEG высокого качества — для фотографий.',
        },
        {
          q: 'Почему 01 в сетке — это нижний правый фрагмент?',
          a: 'Потому что каждый следующий пост сдвигает предыдущие вправо и вниз.',
        },
      ],
    },
    affiliates: {
      heading: 'Оборудование для съёмки и хранения панорам',
      subheading: 'Проверенные аксессуары для студийной и мобильной съёмки.',
      disclosure: 'Контекстные рекомендации · Партнёрские ссылки',
      items: [
        {
          category: 'Карты памяти',
          name: 'UHS-II SDXC / microSD V90',
          spec: 'До 300 МБ/с для серийной съёмки в RAW',
          cta: 'Подробнее',
          href: 'https://www.amazon.com/s?k=uhs-ii+v90+sd+card',
        },
        {
          category: 'Портативный SSD',
          name: 'Надёжный USB-C NVMe SSD (1–2 ТБ)',
          spec: '1050+ МБ/с для работы с сериями 1080×1350',
          cta: 'Смотреть',
          href: 'https://www.amazon.com/s?k=portable+nvme+ssd+usb-c',
        },
        {
          category: 'Свет',
          name: 'Настольный LED свет CRI 97+',
          spec: '3200K–5600K без мерцания для предметной съёмки',
          cta: 'Выбрать',
          href: 'https://www.amazon.com/s?k=bi-color+desk+led+key+light',
        },
        {
          category: 'Штативы',
          name: 'Журавль и карбоновый штатив',
          spec: 'Ровная фиксация сверху для сеток 3×3',
          cta: 'Перейти',
          href: 'https://www.amazon.com/s?k=overhead+camera+desk+mount+tripod',
        },
      ],
    },
    print: {
      sheetTitle: 'GridSplitCue — Карта нарезки и публикации',
      generatedOn: 'Создано',
      modeLabel: 'Режим',
      tileSizeLabel: 'Размер фрагмента',
      totalSlicesLabel: 'Всего частей',
      formatLabel: 'Формат',
      notesHeading: 'Заметки проекта',
      checklistHeading: 'Порядок загрузки в Instagram',
      checklistStepPrefix: 'Шаг загрузки',
    },
    footer: {
      copyright: '© GridSplitCue · bastelar.com',
      canonicalNote: '100% локальная обработка в браузере · Без загрузок · Без водяных знаков',
    },
  },

  zh: {
    seo: {
      title: 'GridSplitCue — Instagram 无缝轮播图与九宫格切图工具 (.ZIP)',
      description:
        '纯浏览器本地免费切分 Instagram 无缝轮播长图（2–10 页）与 3×1、3×2、3×3 主页九宫格，支持 4:5 (1080×1350) 与 1:1 (1080×1080)，滑动预览与无水印高清 .ZIP 下载。',
      howToName: '如何将照片切分为 Instagram 无缝轮播图或主页九宫格',
      howToSteps: [
        {
          name: '上传或拖入全景图',
          text: '将高分辨率 PNG、JPG 或 WEBP 图片直接拖入浏览器画布，全程不上传服务器。',
        },
        {
          name: '选择 4:5 (1080×1350) 或 1:1 (1080×1080)',
          text: '选择无缝轮播模式（2–10 页）或主页九宫格（3×1、3×2、3×3），并调整缩放与构图。',
        },
        {
          name: '滑动预览并导出 .ZIP',
          text: '在交互式滑动预览中检查每一处接缝，一键下载有序命名的无水印高清 .ZIP 压缩包。',
        },
      ],
    },
    nav: {
      studio: '切图工作台',
      preview: '滑动预览',
      guide: '4:5 指南',
      faq: '常见问题',
      printSummary: '打印清单',
    },
    hero: {
      h1: 'Instagram 无缝轮播长图 & 主页九宫格切图器',
      subtitle:
        '将全景图精准切分为 4:5 (1080×1350) 或 1:1 (1080×1080) 轮播分页及 3 列主页网格，支持交互式滑动预览与高清 .ZIP 本地打包下载。',
      privacyNotice:
        '100% client-side seamless carousel and grid splitter. All image slicing and .ZIP packaging happen locally in your browser with zero watermarks and zero server uploads.',
    },
    studio: {
      tabCarousel: '无缝轮播图',
      tabGrid: '主页网格',
      uploadTitle: '拖放图片到此处或点击选择文件',
      uploadHint: '支持原图分辨率 PNG、JPG、WEBP',
      chooseFile: '选择图片',
      samplePanorama: '示例全景图',
      sampleGrid: '示例网格图',
      aspectRatioLabel: '单页比例',
      ratio45: '竖版 4:5 (1080×1350)',
      ratio11: '方形 1:1 (1080×1080)',
      slidesLabel: '分页数量',
      slidesUnit: '页',
      gridPresetLabel: '网格布局',
      piecesUnit: '格',
      formatLabel: '导出格式',
      formatPng: 'PNG（无损）',
      formatJpeg: 'JPEG（高清）',
      zoomLabel: '缩放',
      panXLabel: '水平平移',
      panYLabel: '垂直平移',
      showGuides: '显示裁切线',
      resetFraming: '重置构图',
      dragToPanHint: '直接在画布上拖动即可调整构图',
      sourceResLabel: '原图尺寸',
      sliceResLabel: '单页输出',
      compositeResLabel: '合成总尺寸',
      piecesCountLabel: '输出数量',
      invalidFileError: '请选择有效的 PNG、JPG 或 WEBP 图片文件。',
    },
    preview: {
      title: '交互式滑动预览',
      carouselHint: '下载前可左右滑动或点击箭头，逐一检查每页接缝是否自然对齐。',
      gridHint: '主页效果预览，标注准确发布顺序（01 为右下角第一张 → 末张为左上角）。',
      swipeHint: '拖动或点击箭头滑动预览',
      prev: '上一页',
      next: '下一页',
      slideOf: '/',
      uploadFirstBadge: '最先发布',
      uploadLastBadge: '最后发布',
      downloadSingle: '单独保存',
      downloadZip: '下载高清 .ZIP',
      packagingZip: '正在打包 .ZIP…',
      zipReady: '零水印 · 按序编号命名',
      zeroWatermarkTag: '全分辨率 · 无任何水印',
      renderingSlices: '正在生成高清切片…',
    },
    persistence: {
      title: '本地预设与发布笔记',
      savedLocally: '已自动保存至浏览器本地存储',
      notesLabel: '文案与发布备注',
      notesPlaceholder: '记录每页文案、话题标签或发布时间安排…',
      exportJson: '导出 JSON',
      importJson: '导入 JSON',
      printSheet: '打印切图清单',
      resetDefaults: '恢复默认',
      importSuccess: '已从 JSON 导入配置。',
      importError: 'JSON 配置文件无效。',
    },
    editorial: {
      heading: '打造高质感 Instagram 无缝轮播与网格主页',
      intro:
        '选用更大的竖版画面比例、避开裁切线上的文字，并按正确顺序发布，能让你的作品在信息流中脱颖而出。',
      cards: [
        {
          title: '为什么 4:5 (1080×1350) 在信息流中比 1:1 (1080×1080) 更具优势',
          body: '4:5 竖版比例在手机屏幕上比 1:1 正方形多占据 25% 的垂直视野，更容易让用户停下滑动并左右翻阅整组故事。',
        },
        {
          title: '如何排版全景图避免裁切人脸或关键文字',
          body: '利用实时裁切辅助线，将人物五官和标题放在安全区内；同时有意让局部物件跨越边界，吸引读者滑动查看下一张。',
        },
        {
          title: '100% 浏览器本地处理，零水印与零隐私泄露',
          body: '所有图片裁切均通过 HTML5 Canvas 与 JSZip 在本地内存完成，原图不会上传至任何远程服务器。',
        },
      ],
      postingOrderTitle: 'Instagram 推荐发布顺序',
      postingOrderCarousel:
        '无缝轮播：发布多图帖子时，按文件序号（01-slide → 02-slide → …）依次勾选即可从左到右无缝衔接。',
      postingOrderGrid:
        '主页网格：Instagram 会将最新发布的图片放在左上角。请务必先发 01-grid（右下角），最后发最大编号（左上角）。',
      faqHeading: '常见问题',
      faqs: [
        {
          q: '如何无水印切分 Instagram 无缝轮播图？',
          a: '上传图片后选择 2 至 10 页以及 4:5 或 1:1 比例，在滑动预览确认无缝效果后，点击下载高清 .ZIP 即可获得零水印成图。',
        },
        {
          q: '我的照片会被上传到服务器吗？',
          a: '完全不会。所有裁切与 .ZIP 打包都在您的浏览器本地完成。',
        },
        {
          q: '4 页 1080×1350 轮播需要多高分辨率的原图？',
          a: '建议原图宽度不低于 4320 像素，以确保每一页都能输出清晰的 1080×1350 像素。',
        },
        {
          q: '导出选 PNG 还是 JPEG 更好？',
          a: '包含清晰文字和图形设计建议选无损 PNG；摄影作品可选高质量 JPEG 以加快手机上传速度。',
        },
        {
          q: '为什么九宫格的 01 号在右下角？',
          a: '因为每次发布新帖都会把旧帖向右下方顺延，按 01 到 09 顺序上传才能最终拼出完整画面。',
        },
      ],
    },
    affiliates: {
      heading: '创作者高画质拍摄与存储推荐装备',
      subheading: '适用于高分辨率全景拍摄、桌面布光与高速备份的实用工具。',
      disclosure: '场景化硬件推荐 · 已配置联盟链接属性',
      items: [
        {
          category: '高速存储卡',
          name: 'UHS-II SDXC / microSD V90 存储卡',
          spec: '300 MB/s 高速读写，满足 RAW 连拍与全景合成',
          cta: '查看规格',
          href: 'https://www.amazon.com/s?k=uhs-ii+v90+sd+card',
        },
        {
          category: '移动固态硬盘',
          name: '三防 USB-C NVMe SSD (1TB–2TB)',
          spec: '1050+ MB/s 传输，轻松管理 1080×1350 批量素材',
          cta: '查看选项',
          href: 'https://www.amazon.com/s?k=portable+nvme+ssd+usb-c',
        },
        {
          category: '桌面补光灯',
          name: '双色温桌面 LED 主灯 CRI 97+',
          spec: '3200K–5600K 无频闪，还原静物平拍质感',
          cta: '浏览灯光',
          href: 'https://www.amazon.com/s?k=bi-color+desk+led+key+light',
        },
        {
          category: '俯拍支架',
          name: '俯拍悬臂与碳纤维三脚架',
          spec: '稳固锁定俯拍视角，轻松创作 3×3 产品矩阵',
          cta: '查看支架',
          href: 'https://www.amazon.com/s?k=overhead+camera+desk+mount+tripod',
        },
      ],
    },
    print: {
      sheetTitle: 'GridSplitCue — 切图规格与发布清单',
      generatedOn: '生成时间',
      modeLabel: '切分模式',
      tileSizeLabel: '单张分辨率',
      totalSlicesLabel: '总张数',
      formatLabel: '文件格式',
      notesHeading: '项目备注',
      checklistHeading: 'Instagram 上传顺序核对表',
      checklistStepPrefix: '上传顺序',
    },
    footer: {
      copyright: '© GridSplitCue · bastelar.com',
      canonicalNote: '100% 浏览器本地处理 · 零服务器上传 · 零水印',
    },
  },

  ja: {
    seo: {
      title: 'GridSplitCue — Instagram シームレスカルーセル・グリッド分割 (.ZIP)',
      description:
        'Instagramのシームレスなカルーセル（2〜10枚）と3×1・3×2・3×3グリッドを4:5 (1080×1350) または 1:1 (1080×1080) にブラウザ上で高速分割。スワイププレビュー＆透かしなし .ZIP ダウンロード。',
      howToName: 'Instagramシームレスカルーセル・プロフィールグリッド用に画像を分割する方法',
      howToSteps: [
        {
          name: 'パノラマ画像を読み込む',
          text: '高解像度の PNG / JPG / WEBP 画像をブラウザに直接ドロップします（サーバー送信なし）。',
        },
        {
          name: '4:5 (1080×1350) または 1:1 (1080×1080) を選択',
          text: 'カルーセル（2〜10枚）またはグリッド（3×1・3×2・3×3）を選び、ズームと位置を調整します。',
        },
        {
          name: 'スワイププレビューで確認して .ZIP 保存',
          text: 'つなぎ目をスワイプで確認し、透かしなしのフル解像度 .ZIP を一括ダウンロードします。',
        },
      ],
    },
    nav: {
      studio: '分割スタジオ',
      preview: 'スワイプ確認',
      guide: '4:5 ガイド',
      faq: 'FAQ',
      printSummary: '印刷',
    },
    hero: {
      h1: 'Instagram シームレスカルーセル & グリッド分割ツール',
      subtitle:
        'パノラマ写真を 4:5 (1080×1350) や 1:1 (1080×1080) の連続スライドおよび3列プロフィールグリッドへ高精度に分割。スワイプ確認と .ZIP 一括保存に対応。',
      privacyNotice:
        '100% client-side seamless carousel and grid splitter. All image slicing and .ZIP packaging happen locally in your browser with zero watermarks and zero server uploads.',
    },
    studio: {
      tabCarousel: 'シームレスカルーセル',
      tabGrid: 'プロフィールグリッド',
      uploadTitle: '画像をドラッグ＆ドロップ、またはクリックして選択',
      uploadHint: 'PNG・JPG・WEBP のフル解像度に対応',
      chooseFile: '画像を選択',
      samplePanorama: 'サンプルパノラマ',
      sampleGrid: 'サンプルグリッド',
      aspectRatioLabel: 'スライド比率',
      ratio45: '縦長 4:5 (1080×1350)',
      ratio11: '正方形 1:1 (1080×1080)',
      slidesLabel: '枚数',
      slidesUnit: '枚',
      gridPresetLabel: 'グリッド構成',
      piecesUnit: '分割',
      formatLabel: '出力形式',
      formatPng: 'PNG（可逆圧縮）',
      formatJpeg: 'JPEG（高画質）',
      zoomLabel: 'ズーム',
      panXLabel: '水平位置',
      panYLabel: '垂直位置',
      showGuides: 'ガイド線',
      resetFraming: '位置をリセット',
      dragToPanHint: 'キャンバス上をドラッグして位置調整',
      sourceResLabel: '元画像',
      sliceResLabel: '1枚あたり',
      compositeResLabel: '全体',
      piecesCountLabel: '出力',
      invalidFileError: '有効な PNG・JPG・WEBP 画像ファイルを選択してください。',
    },
    preview: {
      title: 'インタラクティブ・スワイププレビュー',
      carouselHint: 'ダウンロード前にスワイプや矢印でつなぎ目の連続性を確認できます。',
      gridHint: '投稿順序付きプロフィールプレビュー（01 右下 → 最後が左上）。',
      swipeHint: 'スワイプまたは矢印で切り替え',
      prev: '前へ',
      next: '次へ',
      slideOf: '/',
      uploadFirstBadge: '最初に投稿',
      uploadLastBadge: '最後に投稿',
      downloadSingle: '単体保存',
      downloadZip: 'フル解像度 .ZIP を保存',
      packagingZip: '.ZIP を作成中…',
      zipReady: '透かしなし · 連番ファイル名',
      zeroWatermarkTag: 'フル解像度 · ウォーターマークなし',
      renderingSlices: '高解像度スライスを生成中…',
    },
    persistence: {
      title: 'ローカル設定 & メモ',
      savedLocally: 'ブラウザに自動保存されます',
      notesLabel: 'キャプション・投稿メモ',
      notesPlaceholder: 'スライドごとの文章やハッシュタグ、投稿予定メモ…',
      exportJson: 'JSON 書き出し',
      importJson: 'JSON 読み込み',
      printSheet: '仕様を印刷',
      resetDefaults: '初期化',
      importSuccess: 'JSON プリセットを読み込みました。',
      importError: '無効な JSON ファイルです。',
    },
    editorial: {
      heading: '美しいシームレスカルーセルとグリッド制作のコツ',
      intro:
        '最適な縦横比と正確な投稿順を押さえることで、フィードとプロフィールの両方で洗練された見栄えを実現できます。',
      cards: [
        {
          title: 'なぜ 4:5 (1080×1350) が 1:1 (1080×1080) より効果的なのか',
          body: '4:5 の縦長フォーマットはモバイル画面で 1:1 より縦方向に 25% 広く表示され、スクロールを止めてスワイプを促す力が高まります。',
        },
        {
          title: '顔や文字を切断しない構図づくり',
          body: 'リアルタイムのカットガイドを見ながら文字や人物を安全な位置に保ち、境界線をまたぐ要素で次のスライドへの期待感を演出できます。',
        },
        {
          title: '100% ブラウザ完結・透かしゼロの安心設計',
          body: 'HTML5 Canvas と JSZip により端末内だけで分割・圧縮を完結。画像が外部サーバーに送信されることはありません。',
        },
      ],
      postingOrderTitle: '推奨される Instagram 投稿手順',
      postingOrderCarousel:
        'カルーセル：複数選択画面で 01-slide → 02-slide → … の順に選ぶだけで左から右へ自然につながります。',
      postingOrderGrid:
        'プロフィールグリッド：新しい投稿ほど左上に配置されるため、必ず 01-grid（右下）から順に投稿し、最後に最大番号（左上）を投稿してください。',
      faqHeading: 'よくある質問',
      faqs: [
        {
          q: '透かしなしで Instagram カルーセル用に画像を分割できますか？',
          a: 'はい。画像を読み込み、2〜10枚の4:5または1:1を指定してプレビュー確認後、「フル解像度 .ZIP を保存」から透かしなしで出力できます。',
        },
        {
          q: '画像はサーバーにアップロードされますか？',
          a: 'いいえ。すべての処理はお使いのブラウザ内で完結します。',
        },
        {
          q: '4枚カルーセルに必要な元画像の解像度は？',
          a: '1080×1350 を4枚並べる場合、横幅 4320px 以上の高解像度画像が最適です。',
        },
        {
          q: 'PNG と JPEG はどちらを選ぶべきですか？',
          a: '文字や図形が中心なら劣化のない PNG、写真メインならファイル容量が軽い高画質 JPEG が適しています。',
        },
        {
          q: 'グリッドで 01 が右下になっているのはなぜですか？',
          a: 'Instagram では新しい投稿が左上に入り、過去の投稿が右下へ押し出される仕様のためです。',
        },
      ],
    },
    affiliates: {
      heading: 'クリエイター向け撮影・ストレージ推奨機材',
      subheading: '高解像度パノラマ撮影とスムーズな制作を支える実用アイテム。',
      disclosure: 'コンテキスト機材紹介 · アフィリエイト対応リンク',
      items: [
        {
          category: '高速メディア',
          name: 'UHS-II SDXC / microSD V90 カード',
          spec: 'RAW 連写やパノラマ撮影に最適な最大 300 MB/s',
          cta: '仕様を見る',
          href: 'https://www.amazon.com/s?k=uhs-ii+v90+sd+card',
        },
        {
          category: 'ポータブル SSD',
          name: '耐衝撃 USB-C NVMe SSD (1TB–2TB)',
          spec: '1080×1350 バッチ処理も快適な 1050+ MB/s 転送',
          cta: '製品を見る',
          href: 'https://www.amazon.com/s?k=portable+nvme+ssd+usb-c',
        },
        {
          category: 'デスク照明',
          name: 'バイカラー LED キーライト CRI 97+',
          spec: 'フリッカーレス 3200K–5600K で物撮りを鮮明に',
          cta: '詳細を見る',
          href: 'https://www.amazon.com/s?k=bi-color+desk+led+key+light',
        },
        {
          category: '俯瞰スタンド',
          name: '俯瞰ブームアーム & カーボン三脚',
          spec: '3×3 商品グリッド撮影に欠かせない安定固定',
          cta: 'マウントを見る',
          href: 'https://www.amazon.com/s?k=overhead+camera+desk+mount+tripod',
        },
      ],
    },
    print: {
      sheetTitle: 'GridSplitCue — 分割仕様・投稿チェックシート',
      generatedOn: '作成日時',
      modeLabel: '分割モード',
      tileSizeLabel: '出力サイズ',
      totalSlicesLabel: '合計枚数',
      formatLabel: 'ファイル形式',
      notesHeading: 'プロジェクトメモ',
      checklistHeading: 'Instagram 投稿順チェックリスト',
      checklistStepPrefix: '投稿ステップ',
    },
    footer: {
      copyright: '© GridSplitCue · bastelar.com',
      canonicalNote: '100% ブラウザローカル処理 · サーバー送信なし · 透かしなし',
    },
  },
};
