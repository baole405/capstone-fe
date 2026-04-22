References:
+Mobile:
+Flutter
+Mục đích: Framework chính để build app iOS và Android.
+Dùng trong GlowScan: Xây user app, scan flow, history, clinic/spa finder, profile.
+Docs: +https://docs.flutter.dev/install +https://docs.flutter.dev/get-started/install?sid=lGiBz3

     +go_router
          +Mục đích: Routing và deep link cho Flutter.
          +Dùng trong GlowScan: Điều hướng giữa login, scan, history, recommendation, spa detail.
          +Docs:
               +https://pub.dev/packages/go_router
               +https://docs.flutter.dev/ui/navigation/deep-linking

     +flutter_appauth
          +Mục đích: Login OIDC/OAuth2 chuẩn cho mobile.
          +Dùng trong GlowScan: Đăng nhập với Keycloak bằng Authorization Code Flow + PKCE.
          +Docs:
               +https://pub.dev/packages/flutter_appauth
               +https://appauth.io/
               +https://www.rfc-editor.org/rfc/rfc8252.html

     +flutter_secure_storage
          +Mục đích: Lưu access token, refresh token an toàn trên thiết bị.
          +Dùng trong GlowScan: Giữ phiên đăng nhập sau khi user login qua Keycloak.
          +Docs:
               +https://pub.dev/packages/flutter_secure_storage

     +dio
          +Mục đích: HTTP client cho Flutter.
          +Dùng trong GlowScan: Gọi API NestJS, gắn Bearer token, refresh token, timeout, upload data.
          +Docs:
               +https://pub.dev/packages/dio

     +camera
          +Mục đích: Mở camera realtime trong Flutter.
          +Dùng trong GlowScan: Nếu làm live face scan.
          +Docs:
               +https://pub.dev/packages/camera

     +image_picker
          +Mục đích: Chọn ảnh từ camera/gallery.
          +Dùng trong GlowScan: MVP nên bắt đầu bằng chọn/chụp ảnh rồi phân tích, dễ làm hơn realtime.
          +Docs:
               +https://pub.dev/packages/image_picker

     +MediaPipe Face Landmarker
          +Mục đích: Xử lý landmarks khuôn mặt trên thiết bị.
          +Dùng trong GlowScan: Phân tích khuôn mặt trước khi suy ra tình trạng da.
          +Lưu ý: Nên gọi native Android/iOS rồi bridge sang Flutter bằng platform channels.
          +Docs:
               +https://ai.google.dev/edge/mediapipe/solutions/vision/face_landmarker/android
               +https://ai.google.dev/edge/mediapipe/solutions/vision/face_landmarker/ios
               +https://docs.flutter.dev/platform-integration/platform-channels

     +google_maps_flutter
          +Mục đích: Hiển thị bản đồ trong app.
          +Dùng trong GlowScan: Clinic/spa finder.
          +Docs:
               +https://pub.dev/packages/google_maps_flutter

     +geolocator
          +Mục đích: Lấy vị trí hiện tại của user.
          +Dùng trong GlowScan: Tìm clinic/spa gần user.
          +Docs:
               +https://pub.dev/packages/geolocator

     +OpenAPI Generator (dart-dio)
          +Mục đích: Generate API client từ Swagger/OpenAPI của NestJS.
          +Dùng trong GlowScan: Giúp mobile và BE dùng chung contract API.
          +Docs:
               +https://openapi-generator.tech/docs/generators/dart-dio/

+Web:
+Next.js App Router
+Mục đích: Framework chính cho web.
+Dùng trong GlowScan: Web portal cho Admin và Beauty Service Provider.
+Docs: +https://nextjs.org/docs/app +https://nextjs.org/docs/app/getting-started

     +TypeScript
          +Mục đích: Tăng type safety cho frontend.
          +Dùng trong GlowScan: Đồng bộ model/request/response với BE dễ hơn.
          +Docs:
               +https://www.typescriptlang.org/docs/

     +Tailwind CSS + Shadcn
          +Mục đích: Styling nhanh cho dashboard, form, table, admin pages.
          +Dùng trong GlowScan: Provider portal và admin portal.
          +Docs:
               +https://tailwindcss.com/docs/guides/nextjs

+https://ui.shadcn.com/

     +TanStack Query
          +Mục đích: Data fetching, caching, mutation, invalidation.
          +Dùng trong GlowScan: Users list, bookings list, reports, moderation, provider data.
          +Docs:
               +https://tanstack.com/query/latest/docs/framework/react/quick-start

     +keycloak-js
          +Mục đích: Tích hợp Keycloak trên web.
          +Dùng trong GlowScan: Login/logout/refresh session cho Next.js frontend.
          +Docs:
               +https://www.keycloak.org/securing-apps/javascript-adapter
               +https://www.keycloak.org/securing-apps/overview
               +https://www.keycloak.org/securing-apps/oidc-layers

     +Next.js data fetching
          +Mục đích: Quyết định khi nào dùng server-side fetch và khi nào dùng client-side fetch.
          +Dùng trong GlowScan: Server render cho page ổn định, client fetch cho dashboard realtime hơn.
          +Docs:
               +https://nextjs.org/docs/app/getting-started/fetching-data
               +https://nextjs.org/docs/app/getting-started/server-and-client-components

     +Next.js Route Handlers
          +Mục đích: Viết API nhẹ phía web nếu cần proxy, upload signing, webhook handling.
          +Dùng trong GlowScan: Chỉ dùng cho tác vụ phụ; business logic chính vẫn đặt ở NestJS.
          +Docs:
               +https://nextjs.org/docs/app/getting-started/route-handlers-and-middleware

     +Google Maps / Places API
          +Mục đích: Tìm kiếm và hiển thị clinic/spa trên web.
          +Dùng trong GlowScan: Search by location, autocomplete, place detail.
          +Docs:
               +https://developers.google.com/maps/documentation/places/web-service

     +OpenAPI Generator (typescript-fetch / typescript-axios)
          +Mục đích: Generate API client TS từ Swagger/OpenAPI của NestJS.
          +Dùng trong GlowScan: Giúp web không phải viết request model tay quá nhiều.
          +Docs:
               +https://openapi-generator.tech/docs/generators/typescript-fetch/
               +https://openapi-generator.tech/docs/generators/typescript-axios/
               +https://docs.nestjs.com/openapi/introduction

- +Cách kết hợp với BE:
  +Nguyên tắc chung
  +BE dùng: NestJS + TypeORM + PostgreSQL + Redis + Keycloak.
  +Web và Mobile không gọi trực tiếp DB.
  +Web và Mobile chỉ giao tiếp với NestJS API.
  +PostgreSQL là source of truth.
  +Redis chỉ dùng để cache hoặc hỗ trợ performance, không phải nơi lưu dữ liệu chính.
  +Docs: +https://docs.nestjs.com/ +https://docs.nestjs.com/techniques/sql +https://docs.nestjs.com/techniques/caching

       +Kết hợp Auth với BE
            +BE:
                 +NestJS validate JWT/access token do Keycloak cấp.
                 +Mỗi app nên có client riêng:
                      +glowscan-web
                      +glowscan-mobile
            +Web:
                 +Dùng keycloak-js để login.
                 +Sau khi login, lấy access token và gửi kèm request tới NestJS.
            +Mobile:
                 +Dùng flutter_appauth để login bằng PKCE.
                 +Lưu token bằng flutter_secure_storage.
                 +Dùng Dio interceptor để gắn token vào request.
            +Docs:
                 +https://www.keycloak.org/securing-apps/overview
                 +https://www.keycloak.org/securing-apps/javascript-adapter
                 +https://pub.dev/packages/flutter_appauth
                 +https://pub.dev/packages/flutter_secure_storage

       +Kết hợp API contract với BE
            +BE:
                 +Bật Swagger/OpenAPI từ NestJS.
                 +Xuất file OpenAPI spec.
            +Web:
                 +Generate TS client bằng typescript-fetch hoặc typescript-axios.
            +Mobile:
                 +Generate Dart client bằng dart-dio.
            +Ý nghĩa:
                 +Web, mobile, backend cùng dùng chung request/response schema.
                 +Giảm lệch API khi team làm song song.
            +Docs:
                 +https://docs.nestjs.com/openapi/introduction
                 +https://openapi-generator.tech/docs/generators/typescript-fetch/
                 +https://openapi-generator.tech/docs/generators/typescript-axios/
                 +https://openapi-generator.tech/docs/generators/dart-dio/

       +Kết hợp Web với BE
            +Web sẽ gọi API NestJS cho các module:
                 +provider profile management
                 +booking management
                 +customer information
                 +admin analytics
                 +content moderation
            +Next.js nên chia:
                 +Server Components cho layout, page shell, initial render
                 +Client Components cho form, map, search, dashboard actions
            +TanStack Query dùng để:
                 +fetch danh sách
                 +invalidate cache sau mutation
                 +quản lý loading/error state
            +Nếu cần route phụ trợ như upload signing hoặc callback xử lý nhẹ thì dùng Next.js Route Handlers.
            +Business logic chính như authz, validation, booking status, admin rules vẫn để ở NestJS.
            +Docs:
                 +https://nextjs.org/docs/app/getting-started/server-and-client-components
                 +https://nextjs.org/docs/app/getting-started/fetching-data
                 +https://tanstack.com/query/latest/docs/framework/react/quick-start

       +Kết hợp Mobile với BE
            +Mobile gọi API NestJS cho các module:
                 +user profile
                 +scan history
                 +product suggestion
                 +clinic/spa finder
                 +booking support
                 +review/rating
            +Flow scan nên là:
                 +User chụp/chọn ảnh
                 +MediaPipe/native xử lý trên thiết bị
                 +App chỉ gửi kết quả phân tích hoặc metadata cần thiết lên BE
                 +Không gửi ảnh gốc mặc định nếu muốn giữ đúng hướng privacy-aware
            +Dio interceptor xử lý:
                 +gắn token
                 +refresh token
                 +retry khi cần
            +Google Maps Flutter dùng dữ liệu clinic/spa do NestJS trả về.
            +Docs:
                 +https://pub.dev/packages/dio
                 +https://ai.google.dev/edge/mediapipe/solutions/vision/face_landmarker/android
                 +https://ai.google.dev/edge/mediapipe/solutions/vision/face_landmarker/ios
                 +https://pub.dev/packages/google_maps_flutter

       +Kết hợp dữ liệu scan/history với BE
            +BE nên có các entity/bảng chính:
                 +users
                 +skin_scans
                 +scan_reports
                 +product_recommendations
                 +service_providers
                 +bookings
                 +reviews
            +Mỗi lần scan nên lưu:
                 +user_id
                 +timestamp
                 +skin indicators
                 +summary/result
                 +model/version nếu có
            +Từ đó web và mobile đều có thể đọc cùng một lịch sử scan để so sánh improvement/stable/worsening.
            +Ý nghĩa:
                 +Đây là chỗ giúp feature tracking da giữa nhiều lần scan hoạt động nhất quán trên mọi nền tảng.

       +Kết hợp deployment/dev môi trường
            +BE stack chạy bằng Docker Compose:
                 +NestJS
                 +PostgreSQL
                 +Redis
                 +Keycloak
                 +Nginx
            +Web Next.js và Mobile Flutter dev sẽ gọi vào cùng base API URL của NestJS.
            +Khi production:
                 +Nginx reverse proxy cho API và auth endpoints
                 +Keycloak đặt sau reverse proxy cần cấu hình hostname/proxy đúng
            +Docs:
                 +https://docs.docker.com/compose/
                 +https://www.keycloak.org/server/reverseproxy

       +Thứ tự member nên tìm hiểu
            +Web member:
                 +Next.js App Router
                 +Tailwind CSS
                 +TanStack Query
                 +keycloak-js
                 +OpenAPI generated client
            +Mobile member:
                 +Flutter
                 +go_router
                 +flutter_appauth
                 +dio
                 +image_picker/camera
                 +MediaPipe native bridge
            +Cả team:
                 NestJS Swagger/OpenAPI
                 Keycloak flow
                 API contract giữa FE/BE
