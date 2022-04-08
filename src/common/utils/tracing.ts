import * as opentelemetry from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { ZipkinExporter } from '@opentelemetry/exporter-zipkin';
import { PinoInstrumentation } from '@opentelemetry/instrumentation-pino';

import { config } from '../config';

const sdk = new opentelemetry.NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]:
      'transaction-commission-calculator',
  }),
  // traceExporter: new opentelemetry.tracing.ConsoleSpanExporter(),
  traceExporter: new ZipkinExporter({
    url: config.ZIPKIN_URL,
  }),
  instrumentations: [getNodeAutoInstrumentations(), new PinoInstrumentation()],
});

sdk.start();
