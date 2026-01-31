---
trigger: always_on
---

# ============================================
# REGLA CRÍTICA: Consultar Backend Primero
# ============================================
# ANTES de implementar cualquier funcionalidad en este frontend,
# DEBES leer y analizar el backend en:
# C:\NodeCurso\Nest\teslo-shop
#
# Esta regla aplica para:
# - Nuevos servicios/API calls
# - WebSocket handlers
# - Modelos/Interfaces de datos
# - Autenticación
# - Cualquier integración con backend
# ============================================

# Backend Reference
backend:
  path: "C:\\NodeCurso\\Nest\\teslo-shop"
  
# Estructura de Módulos Backend conocida:
modules:
  auth:
    entity: "User (id, email, password, fullName, isActive, roles[], products[])"
    endpoints:
      - "POST /auth/login - LoginUserDto {email, password}"
      - "POST /auth/register - CreateUserDto {email, password, fullName}"
      - "GET /auth/check-status - Verifica token y retorna nuevo token"
    jwt_payload: "{ id: string }"
    
  products:
    entity: "Product (id, title, price, description, slug, stock, sizes[], gender, tags[], images[], user)"
    features:
      - "Relación ManyToOne con User"
      - "Relación OneToMany con ProductImage (eager: true)"
      - "Transformación automática de images a array de URLs"
      - "Slug auto-generado desde title"
      
  messages-ws:
    gateway: "MessagesWsGateway"
    cors: true
    events:
      - "handleConnection(client: Socket) - Cliente conectado"
      - "handleDisconnect(client: Socket) - Cliente desconectado"
    note: "WebSocket básico en desarrollo - verificar mensajes/events disponibles"

# Acciones Obligatorias
actions_before_implementation:
  1: "Leer DTOs relevantes en backend/src/**/dto/"
  2: "Verificar entities en backend/src/**/entities/"
  3: "Confirmar endpoints en controllers"
  4: "Para WebSockets: revisar gateway y service actualizados"
  5: "Sincronizar interfaces de TypeScript con DTOs del backend"

# Checklist de Implementación
checklist:
  - "¿Leíste los DTOs del backend correspondientes?"
  - "¿Las interfaces de TypeScript coinciden con las entidades del backend?"
  - "¿Los nombres de campos son idénticos (case-sensitive)?"
  - "¿Para WebSockets: revisaste los eventos disponibles en el gateway?"
  - "¿Confirmaste la estructura de respuesta de los endpoints?"

# Ejemplo de Sincronización WebSocket
websocket_example: |
  // ANTES de crear handlers en el frontend:
  // 1. Ir a C:\NodeCurso\Nest\teslo-shop\src\messages-ws\
  // 2. Leer messages-ws.gateway.ts para ver @SubscribeMessage() decorators
  // 3. Leer messages-ws.service.ts para la lógica de negocio
  // 4. Crear interfaces que coincidan con los payloads del backend
  
  // Ejemplo de estructura esperada:
  interface WsEvent<T> {
    event: string;
    data: T;
  }
  
  // Cliente Socket.io debe conectar a:
  // io('http://localhost:3000') // o el puerto del backend NestJS

# Notas de Desarrollo
dev_notes:
  - "Backend usa TypeORM con PostgreSQL"
  - "Autenticación JWT con Passport"
  - "Socket.io habilitado con CORS"
  - "Entidades tienen relaciones: User <-> Products, Product <-> ProductImage"
  - "Slugs normalizados automáticamente (lowercase, spaces -> underscores)"

