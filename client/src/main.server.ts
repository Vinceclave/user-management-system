import { bootstrapApplication } from '@angular/platform-browser';
import { AppServerModule } from './app/app.server.module';

// Bootstrap the AppServerModule for server-side rendering
export default function bootstrap() {
  return bootstrapApplication(AppServerModule);
}