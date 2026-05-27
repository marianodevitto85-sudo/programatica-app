# Changes · Quizzes + barra de progreso

## Resumen

Tres mejoras solicitadas, aplicadas a Programática y diseñadas para reutilizarse en todos los próximos cursos:

1. **Mini-cuestionarios al final de cada clase** (V/F + multiple choice con feedback inmediato).
2. **Bug fix de la barra de progreso**: ahora se actualiza automáticamente al leer cada sección.
3. **Barra de progreso compacta**: de `h-1` y `h-1.5` a `h-[3px]`.

## Archivos nuevos

- `components/Quiz.tsx` — componente reutilizable. Soporta V/F y multiple choice, feedback inmediato, mini-barra de progreso interna, persiste el score por clase.
- `data/quiz-questions.ts` — banco de 48 preguntas (6 por cada una de las 8 clases) con explicaciones que refuerzan el aprendizaje.

## Archivos modificados

### `lib/progress.ts`
- Agregada sección `"quiz"` al `SectionKey` y `SECTION_ORDER` (ahora son 7 secciones por clase, no 6).
- Nuevo helper `markSectionViewed(num, key)` — auto-marca una sección como vista sin sobreescribir.
- Nuevos helpers `readQuizScore`, `writeQuizScore`, `readAllQuizScores` — persistencia de scores del quiz en localStorage (clave `programatica:quizScores:v1`).

### `components/ClassShell.tsx`
- **Auto-tracking de secciones con IntersectionObserver**: cuando una sección está >45% en viewport por 1.5 segundos, se marca como vista automáticamente. Esto arregla el bug de "la barra no avanza" sin necesidad de que el usuario tilde checkboxes.
- **Barra del header de clase**: bajada a `h-[3px]`, ancho máximo a `200px`, label "completado" en color dim.
- **Quiz al final**: nueva sección `#section-quiz` que renderiza el `<Quiz />` con las preguntas de la clase. Al completarlo:
  - Guarda el score en `localStorage`.
  - Marca la sección quiz como vista.
  - Muestra botón "Continuar a Clase N →" que navega a la siguiente clase.
- El checkbox manual del sidebar sigue funcionando como antes (puede co-existir con el auto-tracking — si el usuario destilda, no se vuelve a marcar solo).

### `components/HomeProgress.tsx`
- Barra global del Home: de `h-1.5` a `h-[3px]`.

## Cómo probar localmente

```bash
cd programatica-app
npm install            # (si todavía no lo hiciste en esta copia)
npm run dev
# → http://localhost:3000/cursos/programatica/
```

Flujo de prueba sugerido:
1. Entrar a la Home — ver la barra global más fina.
2. Entrar a Clase 1 — confirmar que la barra del header es más fina y muestra 0%.
3. Scrollear lentamente por las secciones — ver cómo la barra sube sola (sin tildar nada manualmente).
4. Llegar al final → ver la nueva sección **Quiz** con 6 preguntas.
5. Responder algunas mal y otras bien — verificar feedback inmediato.
6. Completar el quiz → ver pantalla de score final + botón "Continuar a Clase 2".

## Comportamiento esperado del progreso

- Cada clase tiene ahora 7 secciones: Objetivos, Estructura, Contenido, Datos clave, Recap, Recursos, **Quiz**.
- Las primeras 6 se marcan solas al scrollear (1.5s en viewport).
- El Quiz solo se marca al completarlo (cualquier puntaje sirve para marcar la sección como vista, pero el score real se guarda y se muestra en el siguiente intento).
- 100% de la clase ahora requiere haber visto las 6 secciones de contenido + haber completado el quiz.

## Backwards compatibility

- Los datos previos en localStorage (`programatica:progress:v1`) siguen siendo válidos. Las clases que ya estaban al 100% ahora figurarán al ~86% hasta completar el quiz — es intencional (refuerza el aprendizaje).
- Si querés resetear a todos los usuarios, podés bumpear la clave a `:v2` en `lib/progress.ts`.

## Para los próximos cursos

El componente `Quiz.tsx` y el patrón de `quiz-questions.ts` son framework-agnósticos a nivel del banco de datos:

- Para curso nuevo, copiá `data/quiz-questions-X.ts` con la misma estructura (`Record<number, QuizQuestion[]>`).
- En `lib/progress.ts` cambiá las claves de localStorage para no pisar las de Programática.
- `Quiz.tsx` se reusa tal cual.
