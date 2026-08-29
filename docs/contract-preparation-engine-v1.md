# Contract Preparation Engine V1

## Estado

Esta entrega implementa una **superficie educativa estática** para preparar un contrato antes de redactarlo. No recibe casos, no almacena información personal, no genera documentos firmables y no activa servicios profesionales. El ejemplo visible utiliza únicamente marcadores sintéticos.

La fuente de verdad futura deberá ser un modelo estructurado, no el borrador textual. La primera pantalla debe reducir fricción y revelar complejidad progresivamente.

## Alcance ejecutado

| Elemento | Decisión V1 | Estado |
|---|---|---|
| Entrada | Ruta `/preparar/contrato` | Implementado |
| Datos | Ejemplo sintético, sin formulario ni persistencia | Implementado |
| Preparación | Partes, capacidad, objeto, obligaciones, tiempo, pagos y riesgos | Visible como flujo |
| Territorialidad | El territorio queda explícitamente pendiente | Fail-closed |
| Salidas | Brief, checklist, mapas, matriz de revisión y borrador estructural condicionado | Definidas |
| Antes de firmar | Enlace a la ruta educativa existente, si está disponible | Integración de navegación |
| PII | No captura nombres, domicilios, correo, identificadores ni documentos | Bloqueado |
| Servicios profesionales | No se publican ni se activan | Bloqueado |

## Modelo de datos de alto nivel

No se crea todavía un schema canónico paralelo. Cuando se implemente la capa de datos, deberá reconciliarse con los schemas existentes en el repositorio jurídico y reutilizar sus IDs y convenciones.

```text
contract_id
contract_type
territory
mode: BASIC | DETAILED
parties[]
representatives[]
object
obligations[]
consideration
amounts[]
currency
milestones[]
effective_date
start_date
end_date
term
renewal
notice_period
termination
penalties
confidentiality
intellectual_property
data_protection
risk_allocation
dispute_resolution
governing_context
annexes[]
signatures[]
source_refs[]
review_flags[]
status
```

## Gates obligatorios

El motor futuro solo podrá avanzar cuando existan, como mínimo, **fuente**, **jurisdicción**, **identificador o hash de versión**, **claim o regla aplicable**, **evidencia**, y **estado requerido**. La ausencia de un dato no equivale a aprobación.

La capacidad de recibir PII, documentos, pagos o casos reales permanece deshabilitada hasta cerrar privacidad, retención, borrado, términos, seguridad y autorización humana explícita. Una revisión territorial puede bloquear el resultado aunque la estructura general del contrato sea comprensible.

## Tipos candidatos para validación posterior

La priorización todavía requiere evidencia de demanda y validación jurídica por territorio. Los candidatos iniciales son prestación de servicios, confidencialidad, arrendamiento, compraventa y relación con proveedor. V1 no implementa ninguno como generador de contrato.

## No hacer ahora

No construir un generador universal, un clon de firma electrónica, un gestor de documentos, un CRM, un marketplace de abogados, un case-management ni una biblioteca masiva de machotes. La siguiente inversión debe demostrar reducción de trabajo humano, reducción de riesgo, aumento de aprendizaje o una ruta clara de valor.

## Próxima decisión humana

Antes de activar una experiencia interactiva, el fundador debe aprobar el territorio inicial, los tipos de contrato priorizados, el esquema de revisión profesional y la política de datos. Hasta entonces, la ruta permanece en modo demostración educativa con datos sintéticos.
